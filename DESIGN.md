# Designsystem — Cecilie & Esben, 12. juni 2027

The house style for the wedding site, the printed invitations and any further
design assets. Written so a person or an image model can produce new pieces that
sit next to the existing ones without looking borrowed.

Everything here is derived from the references in `Design inspiration/`.

---

## 1. The illustration style

**Name it:** *faded watercolour with coloured-pencil texture* — botanical-plate
technique applied to Danish lake-district landscape, desaturated for a calm,
modern feel.

It comes from two references, combined:

| Reference | What we take from it |
| --- | --- |
| `Watercolour style.jpg` (kingfisher) | The *technique*: watercolour washes worked over with directional coloured-pencil hatching, soft blending, paper left bare around the edges |
| `Drawing style.webp` (Matt & Maeva) | The *composition*: wide panorama, low horizon, empty sky for type to sit in, no outlines |
| `Plakat af Silkeborg.jpg` (vintage poster) | The *subject language*: Hjejlen, canoes, Himmelbjerget, water treated as flat overlapping washes |

### Rules

1. **Medium** — watercolour wash first, coloured pencil on top for texture and
   edges. Cold-press paper. Never digital-flat, never vector-crisp.
2. **Saturation** — pull everything back roughly 40 % from the reference. The
   kingfisher's cobalt and magenta become dusty blue and dusty rose. No colour
   at full chroma anywhere.
3. **No pure black, no pure white.** Darkest value is a soft slate `#3A4247`;
   lightest is the paper, `#F3EFE6`.
4. **Edges are soft.** Wet-into-wet bleeds, feathered horizons, the occasional
   dry-brush break. **No ink outlines** and no hard contours.
5. **Paper shows through.** Leave bare cream at the edges of every illustration;
   let the wash fade out rather than stopping at a border.
6. **Light is high-key and flat** — late afternoon, low contrast, no drama, no
   heavy shadows.
7. **Composition** — low horizon, generous empty space above. The subject sits
   in the lower third so type can occupy the sky.
8. **Detail falls off fast.** The subject gets pencil detail; everything more
   than a few metres behind it dissolves into wash.
9. **Grain** — a faint paper texture over the whole image at ~10 % opacity.

### Prompt template for generating new assets

> Soft watercolour and coloured-pencil illustration of **[SUBJECT]**, in the
> style of a faded botanical plate. Muted, desaturated natural palette: dusty
> sage green, soft heather purple, washed blue-grey water, warm cream paper,
> pale terracotta and antique brass accents. Wet-into-wet washes with visible
> directional pencil hatching, soft feathered edges, no outlines, no black.
> Cold-press paper texture showing through. High-key flat afternoon light, low
> contrast. Low horizon with generous empty sky above for text. Wide panoramic
> composition. Danish lake-district landscape. Calm, modern, understated.

Append for a wide band: `Aspect ratio 16:6, subject in the lower third.`
Append for a single object: `Centred single subject on bare cream paper, no background scene.`

---

## 2. Colour

Two layers: the **interface palette** (site chrome, type, UI) and the
**illustration palette** (used inside artwork). They share the same neutrals.

### Interface

| Token | Hex | Use |
| --- | --- | --- |
| `--paper` | `#FBF7EF` | Page background |
| `--paper-2` | `#FFFDF9` | Raised surfaces, cards, inputs |
| `--sand` | `#EFE6D6` | Hairlines, borders, quiet fills |
| `--taupe` | `#A89A8A` | Eyebrows, secondary labels |
| `--ink` | `#2C332D` | Body text |
| `--muted` | `#77796F` | Secondary text |
| `--terracotta` | `#A9503C` | **All display type**, links, primary buttons |
| `--terracotta-deep` | `#8C4131` | Hover state |
| `--brass` | `#C08A4E` | Times, small accents |
| `--forest` | `#34483A` | Dark sections (countdown, gifts, footer) |
| `--sage` | `#9CAB92` | Text on dark sections |
| `--sage-deep` | `#6E8168` | — |
| `--lake` | `#47646E` | — |

The terracotta comes from Hjejlen's brass funnel and the red pennant; it is the
one warm note and carries all the display typography, exactly as in the
`Drawing style.webp` reference. Use it sparingly and never as a large fill.

### Illustration (washed back)

```
sky / paper    #F3EFE6  #EAEFE9  #DCE6E6
water          #9DB4B8  #7E9AA1  #66808A
grass / green  #AFBAA0  #93A487  #6E8168  #566B54
heather        #C0A8B6  #A88BA0  #8E7387  #7C6376
sand / path    #E0D3B9  #DCCFB2
timber         #C9A97C  #A98457
brass          #C3A175
terracotta     #BE7460
hull / ink     #4A5157  #3A4247
```

Every colour above is deliberately one step duller than reality. If a new asset
looks brighter than `assets/img/illustrations/hjejlen.svg`, it is wrong.

---

## 3. Photography

Snapshots arrive in every colour temperature going, and left alone they fight
the watercolours. Every photograph on the site therefore gets the same
treatment, applied by the `.photo` class:

```css
filter: saturate(0.82) sepia(0.08) contrast(1.02);
```

Desaturated a little, warmed a little. That is enough to make a phone snap from
Patagonia sit next to a washed-back watercolour without either one shouting.

Rules for choosing and placing photographs:

- **As a subject** (the collage on the front page, the panel beside the flyer):
  pick pictures where the two of them are clearly the subject. Full colour,
  `.photo` treatment, generous size.
- **As texture** (behind the countdown and the closing band on the venue page):
  the photograph sits under a `rgba(44,51,45,0.82)`–`0.88` scrim. It reads as
  depth, not as a picture — the crop barely matters.
- **Never** put a card or a block of text directly over an unblurred face. If a
  photograph needs to fill space behind something, put the two side by side
  instead.
- Source photographs are HEIC out of the phone; convert before use:
  `sips -s format jpeg -s formatOptions 80 --resampleHeightWidthMax 2000 in.HEIC --out out.jpg`

---

## 4. The A6 flyer

`plan.html` shows the weekend plan as a card that is exactly A6 — 105 × 148 mm
— on screen and on paper. `@page { size: A6 portrait; margin: 0 }` prints it
1:1, and the browser furniture is hidden in print.

Two things make it work:

- **Every measurement inside the card is a multiple of `--u`**, which is `1mm`
  by default. Below 30rem `--u` shrinks to `(100vw - 2 × gutter) / 105`, so the
  whole card scales as a unit on a phone instead of wrapping or cramming. Print
  resets it to `1mm`.
- **Times and titles only.** The descriptions live on the front page. If you add
  a programme item, check the card still fits: on a laptop it sits beside a
  photo panel that is exactly 148 mm tall — if the card is taller than the
  photo, it no longer fits on one A6 page.

The schedule itself is rendered from one source (`SCHEDULE` in
`assets/js/main.js` plus the `program.*` keys), so the front page and the flyer
can never drift apart.

---

## 5. Typography

| Role | Face | Notes |
| --- | --- | --- |
| Display | **Fraunces** (variable, `opsz` 100, `SOFT` 0, `WONK` 0) | Warm high-contrast serif. All headings, always terracotta. The italic is used for taglines and the ampersand. |
| Body / UI | **Jost** 300 / 400 / 500 | Geometric sans. Body copy at 300. |

Conventions:

- Eyebrow labels: Jost, `0.6875rem`, `letter-spacing: 0.34em`, uppercase, taupe.
- Buttons: Jost, `0.75rem`, `letter-spacing: 0.2em`, uppercase.
- Headings never carry letter-spacing above `-0.01em`.
- Danish typography: dates as `12. juni 2027`, times as `14.00` (full stop, not
  colon), ranges with an en dash, `11.–13. juni`.

---

## 6. Layout

- Max content width `1180px`, narrow measure `58rem` for running text.
- Section rhythm `clamp(4.5rem, 10vw, 8.5rem)` top and bottom.
- Corner radius `3px` — almost square. Nothing is pill-shaped except the
  language toggle and the choice chips.
- Alternating surfaces: `--paper` → `--paper-2` → `--forest` for the two dark
  bands (countdown, gifts) and the footer.
- Illustrations either run **full bleed** as a band, or sit in a 3-up grid with
  a caption beneath.
- Header: nav left, line-sketch monogram centred, RSVP button and the DA/EN
  toggle right. The toggle is the rightmost element on every page and viewport.

---

## 7. The asset set

All assets live in `assets/img/`, are SVG, and are self-contained (filters and
gradients are declared inside each file, so they can be dropped into print or
Figma as-is).

| File | Size | What it is |
| --- | --- | --- |
| `illustrations/silkeborg-panorama.svg` | 1600 × 560 | Hero band — the lakes, forest shoreline, Hjejlen, a suggestion of the estate on the far bank |
| `illustrations/hjejlen.svg` | 720 × 400 | Hjejlen in profile: black hull, white canopy deck, brass funnel, paddle box, Dannebrog, coal smoke |
| `illustrations/ringene.svg` | 720 × 480 | Østre Søbad at Almindsø from above — the two interlocking timber rings, ripple circles around the swimmers |
| `illustrations/sindbjerg-stoubjerg.svg` | 1600 × 620 | The heather hills above Sejs-Svejbæk — heather bank in front, grass hollows, sandy path, pine ridge, summer cumulus |
| `monogram.svg` | 260 × 76 | Fine-line pen sketch of the estate between trees, above water. Single stroke weight, no shading. Rendered as a CSS mask so it takes the surrounding text colour |

### The ring motif

The two interlocking circles of Østre Søbad are the strongest mark we have:
they read as a bathing jetty *and* as two wedding rings. Use them as the
recurring signature — on the invitation, as a section divider, as a stamp on the
menu card. Two circles, radius ratio ~1 : 0.83, overlapping by about a third.
The ripple rings inside them (concentric circles spreading from a swimmer) are
the secondary motif — good for spot decoration, dividers, and page numbers.

### Current SVGs are placeholders

The four illustrations are hand-built in SVG so the site looks finished today.
They follow the palette and composition rules above, but they are not painted.
When real artwork exists, replace each file **at the same path and the same
proportions** — no code changes are needed anywhere.

---

## 8. Subject reference for new assets

Facts checked against sources listed at the bottom, so briefs and captions stay
accurate.

### Gl. Skovridergaard — the venue

- Marienlundsvej 36, 8600 Silkeborg. Phone 87 22 55 00.
- Roots back to **1798**; a former forester's estate and later a health resort,
  today a hotel and conference centre.
- Its own park, direct access to the Silkeborg forests, the Gudenå river nearby
  and **Almindsø** within walking distance.
- Rooms on site: singles, doubles, junior suites, grand lit.
- Free parking, EV charging. Silkeborg town centre within walking distance.
- Nearby: Museum Jorn, KunstCentret Silkeborg Bad.

### Hjejlen — the paddle steamer

- Built **1861** by Baumgarten & Burmeister, commissioned by a group of citizens
  led by paper manufacturer **Michael Drewsen**.
- The world's oldest **coal-fired** paddle steamer still in operation.
- Maiden voyage **24 June 1861**, from Himmelbjerget to Silkeborg, with King
  Frederik VII and Countess Danner aboard. 150th anniversary in 2011 with
  Queen Margrethe II present.
- Sails Silkeborg → Himmelbjerget in about **1 hour 15 minutes**.
- Appearance: long black hull with a red-brown boot top, white deck house and an
  open canopy deck aft, brass/ochre funnel with a black cap, semicircular paddle
  box amidships, Dannebrog pennant, coal smoke trailing astern.

### Almindsø and Østre Søbad — the rings

- Almindsø lies between Silkeborg and Virklund.
- **Østre Søbad** and **Vestre Søbad** are built from timber out of the
  Silkeborg forests.
- Østre Søbad is two large circular platforms: one ringing a shallow children's
  basin, the other over water about **4.5 m** deep for diving and swimming.
- Seen from above they interlock — the source of our ring motif.

### Sindbjerg and Stoubjerg — the heather hills

- Two heather-covered hills above **Sejs-Svejbæk**, east of Silkeborg, between
  the town and Himmelbjerget.
- Late-glacial landscape: steep dome-shaped hills, purple heather from late
  summer, green grass hollows running down the slopes, scattered oaks and
  junipers, sandy footpaths, pine and mixed forest along the ridges.
- Views over Julsø and towards Himmelbjerget.
- Note for captions: the heather blooms **August–September**. The wedding is in
  June, when the hills are green with the heather still in bud.

### Himmelbjerget

- Summit **147 m** above sea level, 125 m above Julsø.
- The tower was completed in **1875**, is **25 m** tall, designed by architect
  Ludvig P. Fenger for a tower committee founded by Michael Drewsen in 1867.

### Silkeborg itself

- Grew up around **Silkeborg Papirfabrik**, founded by Michael Drewsen and his
  family in **1844**; the site was chosen because the Gudenå could supply cheap
  water power.
- The Gudenå is Denmark's largest watercourse.
- Sits in **Søhøjlandet**, the Danish lake district: Silkeborg Langsø, Almindsø,
  Julsø, Borresø, Brassø.
- Other landmarks worth drawing: Museum Jorn, KunstCentret Silkeborg Bad,
  AQUA, the Tollund Man at Museum Silkeborg, canoes on the Gudenå.

---

## 9. Checklist for a new asset

- [ ] Palette taken from §2 — nothing more saturated than the existing set
- [ ] No outlines, no pure black, no pure white
- [ ] Cream paper visible at the edges; wash fades out rather than stopping
- [ ] Low horizon, empty space above for type
- [ ] Paper grain at ~10 %
- [ ] Sits next to `hjejlen.svg` without either looking out of place
- [ ] Exported as SVG (or 2× PNG on transparent cream) at the sizes in §7
- [ ] Danish alt text added to `assets/js/translations.js`, English alongside it

---

## Sources

- [Gl. Skovridergaard](https://glskov.dk/en/)
- [SS Hjejlen — Wikipedia](https://en.wikipedia.org/wiki/SS_Hjejlen) and
  [Hjejlen — Det sker i Silkeborg](https://detskerisilkeborg.dk/kultur-attraktioner/attraktioner/hjejlen/)
- [Himmelbjerget — Wikipedia](https://en.wikipedia.org/wiki/Himmelbjerget) and
  [Himmelbjergtårnet](https://www.rundtidanmark.dk/himmelbjerget-med-himmelbjergtaarnet/)
- [Michael Drewsen — danmarkshistorien.dk](https://danmarkshistorien.dk/leksikon-og-kilder/vis/materiale/michael-drewsen-1804-1874)
  and [Silkeborg — danmarkshistorien.lex.dk](https://danmarkshistorien.lex.dk/Silkeborg)
- [Østre Søbad i Almind Sø](https://www.rundtidanmark.dk/ostre-sobad-i-almind-so/)
  and [Vandrerute Almindsø rundt](https://www.friefodspor.dk/vandrerute-almindsoe-rundt/)
