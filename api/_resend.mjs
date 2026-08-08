/*
 * Shared bits for the two functions in this directory.
 */

export const RESEND_API = 'https://api.resend.com';

// Where guest post lands, and who it is sent as. The sender has to be on a
// domain verified with Resend or the message is refused outright.
export const FORWARD_TO = (process.env.RSVP_TO || 'bageresben@gmail.com,ceciliegyldenvang@gmail.com')
  .split(',')
  .map((address) => address.trim())
  .filter(Boolean);

export const FROM = process.env.RSVP_FROM || 'Cecilie & Esben <info@cecilieesben.com>';

export function json(body, status) {
  return new Response(JSON.stringify(body), {
    status: status || 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export function clean(value, max) {
  return String(value == null ? '' : value).trim().slice(0, max);
}

export function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Send through Resend. Throws with the API's own words, which is what ends up
// in the Vercel log when something is misconfigured.
export async function send(payload) {
  const response = await fetch(RESEND_API + '/emails', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + process.env.RESEND_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Resend refused the message: ' + response.status + ' ' + (await response.text()));
  }

  return response.json();
}
