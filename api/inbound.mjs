/*
 * Guest post to info@cecilieesben.com lands here and is forwarded to us both.
 *
 * Resend delivers an `email.received` webhook when a message arrives. That
 * webhook carries only metadata — no body, no headers, no attachments — so the
 * body has to be fetched separately before anything can be forwarded:
 *
 *   1. Resend POSTs `email.received` here, signed.
 *   2. We GET /emails/receiving/{id} for the html and text.
 *   3. We send one new message to both of us, with reply-to set to the guest.
 *
 * Set these in the Vercel project:
 *   RESEND_API_KEY          — the same key the RSVP form uses
 *   RESEND_WEBHOOK_SECRET   — the `whsec_…` signing secret from the webhook
 *                             page in Resend. Without it every request is
 *                             rejected, because this endpoint sends mail and an
 *                             unsigned one is anybody's to fire.
 */

import crypto from 'node:crypto';
import { FORWARD_TO, FROM, RESEND_API, escapeHtml, json, send } from './_resend.mjs';

// How far out of step with Resend's clock a request may be before it is
// treated as a replay.
const TOLERANCE_SECONDS = 5 * 60;

/* --- Signature ---------------------------------------------------------- */

/*
 * Resend signs webhooks the Svix way: HMAC-SHA256 over `id.timestamp.body`,
 * keyed on the base64 body of the `whsec_` secret, base64 encoded. The header
 * may carry several space-separated `v1,<signature>` pairs — during a secret
 * rotation, for instance — and any one of them matching is enough.
 *
 * The raw body text is what gets signed, which is why this endpoint reads
 * request.text() and parses afterwards: re-serialising the parsed JSON would
 * shift a byte somewhere and every signature would fail.
 */
function verify(rawBody, headers, secret) {
  const id = headers.get('svix-id');
  const timestamp = headers.get('svix-timestamp');
  const signature = headers.get('svix-signature');
  if (!id || !timestamp || !signature) return 'missing signature headers';

  const sentAt = Number(timestamp);
  if (!Number.isFinite(sentAt)) return 'unreadable timestamp';
  if (Math.abs(Date.now() / 1000 - sentAt) > TOLERANCE_SECONDS) {
    return 'timestamp outside tolerance';
  }

  const key = Buffer.from(secret.replace(/^whsec_/, ''), 'base64');
  const expected = crypto
    .createHmac('sha256', key)
    .update(id + '.' + timestamp + '.' + rawBody)
    .digest();

  const offered = signature
    .split(' ')
    .filter((part) => part.startsWith('v1,'))
    .map((part) => Buffer.from(part.slice(3), 'base64'));

  const matched = offered.some(
    (candidate) =>
      candidate.length === expected.length && crypto.timingSafeEqual(candidate, expected)
  );

  return matched ? null : 'signature did not match';
}

/* --- Handler ------------------------------------------------------------ */

/* Same health check as the RSVP endpoint, for the same reason. */
export async function GET() {
  return json({
    endpoint: 'inbound',
    deployed: true,
    resendApiKey: Boolean(process.env.RESEND_API_KEY),
    webhookSecret: Boolean(process.env.RESEND_WEBHOOK_SECRET),
  });
}

export async function POST(request) {
  if (!process.env.RESEND_API_KEY || !process.env.RESEND_WEBHOOK_SECRET) {
    console.error('Inbound webhook hit but RESEND_API_KEY / RESEND_WEBHOOK_SECRET is not set');
    return json({ error: 'Not configured' }, 500);
  }

  const raw = await request.text();
  const problem = verify(raw, request.headers, process.env.RESEND_WEBHOOK_SECRET);
  if (problem) {
    console.warn('Rejected an inbound webhook:', problem);
    return json({ error: 'Invalid signature' }, 401);
  }

  let event;
  try {
    event = JSON.parse(raw);
  } catch (err) {
    return json({ error: 'Bad request' }, 400);
  }

  // Resend sends other event types down the same webhook if they are ticked;
  // acknowledge them so it does not retry, but do nothing.
  if (!event || event.type !== 'email.received' || !event.data || !event.data.email_id) {
    return json({ ok: true, ignored: true });
  }

  const incoming = event.data;

  // Our own forward coming back at us would go round for ever.
  const sender = String(incoming.from || '').toLowerCase();
  const ourAddress = (FROM.match(/<([^>]+)>/) || [null, FROM])[1].toLowerCase();
  if (sender === ourAddress) {
    console.warn('Ignored a message from our own forwarding address');
    return json({ ok: true, ignored: true });
  }

  try {
    // The webhook has no body on it, so fetch the message itself. Inline
    // images come back as data: URIs by default, which keeps the forward
    // self-contained without chasing the attachments API.
    const response = await fetch(RESEND_API + '/emails/receiving/' + incoming.email_id, {
      headers: { Authorization: 'Bearer ' + process.env.RESEND_API_KEY },
    });

    if (!response.ok) {
      console.error('Could not read the received email', response.status, await response.text());
      return json({ error: 'Could not read the message' }, 502);
    }

    const email = await response.json();
    const subject = email.subject || incoming.subject || '(uden emne)';
    const from = (email.headers && email.headers.from) || email.from || incoming.from || 'ukendt';
    const to = [].concat(incoming.received_for || email.to || []).join(', ');

    // Attachments are not carried over — they live behind a separate API and
    // would have to be downloaded and re-uploaded one by one. Naming them means
    // nothing goes missing quietly.
    const files = (email.attachments || []).map((a) => a.filename || a.id).filter(Boolean);
    const note =
      'Videresendt fra ' + (to || 'info@cecilieesben.com') + ' · afsender: ' + from +
      (files.length ? ' · vedhæftet (ikke med her): ' + files.join(', ') : '');

    await send({
      from: FROM,
      to: FORWARD_TO,
      // Answering in the inbox writes back to whoever sent it.
      reply_to: email.from || incoming.from,
      subject,
      text: note + '\n\n' + (email.text || '(ingen tekstudgave)'),
      html:
        '<p style="margin:0 0 1rem;color:#77796f;font:13px system-ui,sans-serif">' +
        escapeHtml(note) +
        '</p><hr style="border:0;border-top:1px solid #efe6d6;margin:0 0 1rem" />' +
        (email.html || '<pre style="white-space:pre-wrap">' + escapeHtml(email.text || '') + '</pre>'),
    });

    return json({ ok: true });
  } catch (err) {
    console.error(err);
    return json({ error: 'Could not forward the message' }, 502);
  }
}
