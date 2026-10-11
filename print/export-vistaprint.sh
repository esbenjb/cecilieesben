#!/bin/sh
# Export the invitation for Vistaprint: one PDF with both pages and one SVG
# per side, at their flat 139 x 216 mm trim plus 1.5 mm bleed (142 x 219 mm).
#
# Needs Google Chrome, poppler (`brew install poppler` for pdftocairo) and
# Python with Pillow (`pip install pillow`; set PYTHON to an interpreter that
# has it). Run from anywhere: the paths are resolved from this file's location.
#
# Output, in this directory:
#   bryllupsinvitation-vVistaprint.pdf   both sides, page 1 = front, page 2 = back
#   invitation-forside-vVistaprint.svg    front, text as outlines, images embedded
#   invitation-bagside-vVistaprint.svg    back
#
# Vistaprint's SVG importer cannot draw the masked, filtered pictures that
# pdftocairo writes, so flatten-svg.py composites each picture into a plain
# <image> afterwards. Chrome and Illustrator show both versions alike.
set -eu

here=$(cd "$(dirname "$0")" && pwd)
root=$(cd "$here/.." && pwd)
chrome="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT

# A copy of invitation.html that points at the real assets and loads the
# bleed stylesheet last. Chrome reads it over file://, which is fine here:
# nothing on the printed sheets uses a CSS mask.
sed \
  -e "s|href=\"assets/|href=\"file://$root/assets/|g" \
  -e "s|src=\"assets/|src=\"file://$root/assets/|g" \
  -e "s|</head>|<link rel=\"stylesheet\" href=\"file://$here/vistaprint.css\" media=\"print\" /></head>|" \
  "$root/invitation.html" > "$tmp/invitation.html"

"$chrome" --headless=new --disable-gpu --no-pdf-header-footer \
  --virtual-time-budget=8000 \
  --print-to-pdf="$here/bryllupsinvitation-vVistaprint.pdf" \
  "file://$tmp/invitation.html" 2>/dev/null

pdftocairo -svg -f 1 -l 1 "$here/bryllupsinvitation-vVistaprint.pdf" "$tmp/forside.svg"
pdftocairo -svg -f 2 -l 2 "$here/bryllupsinvitation-vVistaprint.pdf" "$tmp/bagside.svg"
"${PYTHON:-python3}" -I "$here/flatten-svg.py" "$tmp/forside.svg" "$here/invitation-forside-vVistaprint.svg"
"${PYTHON:-python3}" -I "$here/flatten-svg.py" "$tmp/bagside.svg" "$here/invitation-bagside-vVistaprint.svg"

pdfinfo "$here/bryllupsinvitation-vVistaprint.pdf" | grep -E "^(Pages|Page size)"
ls -la "$here"/invitation-*-vVistaprint.svg "$here"/bryllupsinvitation-vVistaprint.pdf
