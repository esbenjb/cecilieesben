/*
 * The RSVP endpoint. The form posts JSON here and this passes it on as an
 * e-mail through Resend.
 *
 * RESEND_API_KEY has to be set in the Vercel project — without it the reply is
 * refused rather than quietly dropped, so a missing key shows up as a failed
 * submission instead of a silent hole.
 */

import { FORWARD_TO, FROM, clean, escapeHtml, json, send } from './_resend.mjs';

function cleanList(value) {
  if (!Array.isArray(value)) return [];
  return value.map((v) => clean(v, 60)).filter(Boolean).slice(0, 10);
}

/*
 * A health check, so "the form does not work" can be answered by opening
 * /api/rsvp in a browser. It reports whether the function is deployed at all
 * and whether it can see its environment variables — never their values.
 */
export async function GET() {
  return json({
    endpoint: 'rsvp',
    deployed: true,
    resendApiKey: Boolean(process.env.RESEND_API_KEY),
    from: FROM,
    recipients: FORWARD_TO.length,
  });
}

export async function POST(request) {
  if (!process.env.RESEND_API_KEY) {
    console.error('RSVP received but RESEND_API_KEY is not set');
    return json({ error: 'Mail is not configured' }, 500);
  }

  let body;
  try {
    body = await request.json();
  } catch (err) {
    body = null;
  }
  if (!body || typeof body !== 'object') {
    return json({ error: 'Bad request' }, 400);
  }

  // A field no visitor can see and no visitor will fill in. Anything that does
  // is a robot, and is told everything went fine.
  if (clean(body.website, 200)) return json({ ok: true });

  const data = {
    name: clean(body.name, 120),
    email: clean(body.email, 160),
    phone: clean(body.phone, 60),
    attending: body.attending === 'no' ? 'no' : 'yes',
    days: cleanList(body.days),
    guests: clean(body.guests, 10),
    overnight: cleanList(body.overnight),
    diet: clean(body.diet, 500),
    song: clean(body.song, 200),
    message: clean(body.message, 2000),
  };

  if (!data.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return json({ error: 'A name and a valid e-mail are required' }, 400);
  }

  const coming = data.attending === 'yes';
  const rows = [
    ['Navn', data.name],
    ['E-mail', data.email],
    ['Telefon', data.phone],
    ['Deltager', coming ? 'Ja' : 'Nej'],
  ];
  if (coming) {
    rows.push(
      ['Dage', data.days.join(', ')],
      ['Antal gæster', data.guests],
      ['Overnatning', data.overnight.join(', ')],
      ['Mad/allergi', data.diet],
      ['Sangønske', data.song]
    );
  }
  rows.push(['Hilsen', data.message]);

  const text = rows.map((row) => row[0] + ': ' + (row[1] || '-')).join('\n');
  const html =
    '<table cellpadding="6" style="border-collapse:collapse;font-family:system-ui,sans-serif;font-size:14px">' +
    rows
      .map(
        (row) =>
          '<tr><td style="color:#77796f;vertical-align:top">' +
          escapeHtml(row[0]) +
          '</td><td style="white-space:pre-wrap">' +
          escapeHtml(row[1] || '-') +
          '</td></tr>'
      )
      .join('') +
    '</table>';

  try {
    await send({
      from: FROM,
      to: FORWARD_TO,
      // So a reply from the inbox goes straight back to the guest.
      reply_to: data.email,
      subject: (coming ? 'Svar: ja tak' : 'Svar: nej tak') + ' fra ' + data.name,
      text,
      html,
    });
    return json({ ok: true });
  } catch (err) {
    console.error(err);
    return json({ error: 'Could not send the reply' }, 502);
  }
}
