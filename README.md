# Bryllupshjemmeside — Cecilie & Esben

Cecilie Gyldenvang Møller & Esben Jørgensen Bager
**12. juni 2027** · bryllupsweekend 11.–13. juni · Gl. Skovridergaard, Silkeborg

A static site — no build step, no dependencies.

```sh
python3 -m http.server 8000
# then http://localhost:8000
```

**Use the local server, not `file://`.** Chrome refuses to load CSS mask images
over `file://`, so the monogram disappears if you just double-click the HTML.

Deploy by dropping the folder on Netlify, Vercel or GitHub Pages.

## Pages

| File | What it is |
| --- | --- |
| `index.html` | Front page — hero, welcome, photos of the two of us, countdown, programme, venue teaser, the three illustrations, practical info, gifts, RSVP |
| `plan.html` | The weekend plan as an A6 flyer. Prints 1:1 on A6; on a laptop the card sits beside a photo, on a phone it scales down to fit |
| `invitation.html` | The printed invitation: A4 landscape gatefold, double-sided. The weekend plan sits on the inside of the right flap |
| `Gl-Skovridergaard.html` | Gl. Skovridergaard — gallery, facts, map links |
| `DESIGN.md` | The design system: illustration style, palette, photography rules, flyer spec, and Silkeborg reference material for new assets |

```
assets/
  css/style.css              All styling; design tokens at the top
  css/print-a6.css           Paper size for plan.html
  css/print-a4.css           Paper size for invitation.html
  js/translations.js         Every visitor-facing string, da + en
  js/i18n.js                 Language switching
  js/main.js                 Schedule, countdown, nav, RSVP, gallery lightbox
  img/monogram.svg           Line-sketch monogram
  img/illustrations/         The watercolour asset set
  img/par/                   Photos of the two of us, web-ready
  img/venue/                 Photos of Gl. Skovridergaard (add your own)
Design inspiration/          Reference images the design was built from
Parbilleder/                 Original photos (HEIC). Not tracked in git — see below
```

## Language

Danish is the default. The DA/EN toggle sits top right on every page and every
viewport, and the choice is remembered in `localStorage`.

All visitor-facing text lives in `assets/js/translations.js` — nothing is
hard-coded in the HTML except the two names. Every key must exist in both `da`
and `en`. Markup uses:

```html
<p data-i18n="rsvp.title"></p>                               <!-- text content -->
<input data-i18n-attr="placeholder:rsvp.name.placeholder" /> <!-- attributes -->
```

A missing key renders as the key itself, so gaps are obvious rather than silent.

## The programme

Defined once, in the `program.*` keys plus the `SCHEDULE` list at the top of
`assets/js/main.js`. Both the day cards on the front page and the A6 flyer are
rendered from it, so they cannot drift apart. To add an item, add
`program.<day>.<n>.time|title|text` in both languages and bump the day's `items`
count — then check the flyer still fits A6 and the invitation's right flap
still fits (see `DESIGN.md` §4).

## Printing

`@page` is document-level, so each printable page links its own one-rule
stylesheet: `print-a6.css` for the flyer, `print-a4.css` for the invitation.
Check the paper size in the print dialog before running a batch.

The invitation is an **A4 landscape gatefold**, 297 × 210 mm, printed
double-sided and flipped on the **long edge**, then folded along the two marks
so the flaps meet in the middle. Panels are 74.25 | 148.5 | 74.25 mm. Sheet
side 2 is deliberately mirrored — after the flip the right flap lands on the
left of the sheet, which is what puts "Cecilie" and "Esben" side by side on the
closed card.

## Photos

Originals live in `Parbilleder/` as HEIC, which browsers cannot display. The
web-ready copies in `assets/img/par/` were made with:

```sh
sips -s format jpeg -s formatOptions 80 --resampleHeightWidthMax 2000 in.HEIC --out out.jpg
```

Every photo in "Vejen hertil" also needs a thumbnail in `assets/img/par/grid/`
under the same name — same command with `--resampleHeightWidthMax 900`. The
grid loads the small one; the lightbox swaps `/par/grid/` for `/par/` to reach
the large one, so the two names must match.

For venue photos, drop files into `assets/img/venue/` using the names already
referenced in `Gl-Skovridergaard.html` (`gaarden.jpg`, `parken.jpg`, `orangeriet.jpg`,
`salen.jpg`, `vaerelse.jpg`, `almindsoe.jpg`). Until then each slot shows a soft
green placeholder.

One gotcha: image paths written inside a `--photo` custom property are resolved
against **`assets/css/style.css`**, not the HTML file — so they start `../img/…`.
Paths in `src` and `data-full` attributes are normal and start `assets/…`.

## RSVP

The form validates in the browser and then posts JSON to `/api/rsvp`, a Vercel
serverless function that passes the reply on by e-mail through Resend. It needs
one environment variable in the Vercel project:

| Variable | Required | Default |
| --- | --- | --- |
| `RESEND_API_KEY` | yes | — |
| `RESEND_WEBHOOK_SECRET` | for `/api/inbound` | — |
| `RSVP_TO` | no | `bageresben@gmail.com,ceciliegyldenvang@gmail.com` |
| `RSVP_FROM` | no | `Cecilie & Esben <info@cecilieesben.com>` |

`RSVP_TO` is a comma-separated list, and both functions send to all of it — so
setting it to a single address in Vercel would quietly cut the other person out
of every reply.

The sender is on **cecilieesben.com**, which has to be verified with Resend —
add the domain there and put the DNS records it gives you on the domain. Until
that is done Resend refuses the message outright and the guest sees the error
state, so check one reply gets through before the invitations go out.

The e-mail's reply-to is the guest's own address, so answering in the inbox
writes back to them. The form also carries a hidden `website` field that no
guest can see; anything that fills it in is treated as a robot and dropped.

Posting to `/api/rsvp` is the only way a reply leaves the page. There is no
mailto fallback: a guest fills the form in, presses send, and is done. If the
endpoint is unreachable the form says so rather than handing the visitor their
own mail client to finish the job, which is not answering an invitation.

That also means the form only works where the function exists. Opened straight
off disk over `file://`, or on a plain static server, sending will fail.

`main.js` is linked as `main.js?v=2`. Bump that number whenever the file
changes in a way a returning visitor must not miss, so nobody keeps running a
cached copy of the old one.

Also in `main.js`: `CEREMONY`, the moment the countdown counts towards
(12 June 2027 at 13.00, Danish summer time).

## Questions inbox

The "Spørgsmål" card points guests at **info@cecilieesben.com**. That address is
received by Resend, which posts an `email.received` webhook to `/api/inbound`,
which forwards the message to both of us in one e-mail with reply-to set to the
guest — so answering from the inbox writes straight back to them.

To set it up in Resend: add `info@` as a receiving address on the domain, create
a webhook pointing at `https://cecilieesben.com/api/inbound` subscribed to
`email.received`, and copy its `whsec_…` signing secret into
`RESEND_WEBHOOK_SECRET` in Vercel.

Two things worth knowing about how it works:

- **The webhook carries no body.** Resend sends metadata only, so the handler
  fetches the message from `GET /emails/receiving/{id}` before forwarding it.
  Inline images come back as `data:` URIs, which keeps the forward
  self-contained.
- **Attachments are not carried over.** They sit behind a separate API and
  would have to be downloaded and re-uploaded one at a time. The forward lists
  their filenames instead, so nothing goes missing without you knowing — open
  the message in Resend to get the file itself.

Requests are rejected unless they carry a valid Svix signature over the raw body
and a timestamp within five minutes, because this endpoint sends mail and an
unsigned one would be anybody's to fire.

The functions in `/api` are `.mjs` on purpose: the project has no `package.json`,
and that extension is what makes them unambiguously ES modules.

## Not tracked in git

`Parbilleder/` is in `.gitignore` — it is ~45 MB of phone originals and the
web copies are committed under `assets/img/par/`. Remove that line if you want
the repo to hold the originals too.

## Still to fill in

Search for `TODO` in `assets/js/translations.js` and `assets/js/main.js`:

- [ ] Contact e-mail (replaces `bryllup@example.dk`, in `main.js` and `index.html`)
- [ ] Link to the wish list (`gifts.link` in translations.js, and the href in index.html)
- [x] Toastmaster name and phone
- [ ] Confirm the RSVP deadline (currently 1. marts 2027)
- [ ] Rewrite the welcome text in your own words
- [ ] Accommodation details: price, how guests book
- [ ] Photos of Gl. Skovridergaard
- [ ] Replace the placeholder illustrations with painted artwork (see `DESIGN.md`)
