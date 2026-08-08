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
| `stedet.html` | Gl. Skovridergaard — gallery, facts, map links |
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

For venue photos, drop files into `assets/img/venue/` using the names already
referenced in `stedet.html` (`gaarden.jpg`, `parken.jpg`, `orangeriet.jpg`,
`salen.jpg`, `vaerelse.jpg`, `almindsoe.jpg`). Until then each slot shows a soft
green placeholder.

One gotcha: image paths written inside a `--photo` custom property are resolved
against **`assets/css/style.css`**, not the HTML file — so they start `../img/…`.
Paths in `src` and `data-full` attributes are normal and start `assets/…`.

## RSVP

The form validates in the browser and then, because no endpoint is configured
yet, opens the guest's mail app with the reply pre-filled. To post it somewhere
instead, set `FORM_ENDPOINT` at the top of `assets/js/main.js` to a Formspree /
Google Form / own-backend URL — the form posts `FormData` and expects a 2xx.

Also in `main.js`: `CONTACT_EMAIL`, and `CEREMONY`, the moment the countdown
counts towards (12 June 2027 at 13.00, Danish summer time).

## Not tracked in git

`Parbilleder/` is in `.gitignore` — it is ~45 MB of phone originals and the
web copies are committed under `assets/img/par/`. Remove that line if you want
the repo to hold the originals too.

## Still to fill in

Search for `TODO` in `assets/js/translations.js` and `assets/js/main.js`:

- [ ] Contact e-mail (replaces `bryllup@example.dk`, in `main.js` and `index.html`)
- [ ] Link to the wish list (`gifts.link` in translations.js, and the href in index.html)
- [ ] Toastmaster name and phone
- [ ] Confirm the RSVP deadline (currently 1. marts 2027)
- [ ] Rewrite the welcome text in your own words
- [ ] Accommodation details: price, how guests book
- [ ] Photos of Gl. Skovridergaard
- [ ] Replace the placeholder illustrations with painted artwork (see `DESIGN.md`)
