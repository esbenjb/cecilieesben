#!/bin/sh
# Export the invitation for the printer: one PDF with both pages and one SVG
# per side, at A5 trim plus 3 mm bleed (154 x 216 mm per page).
#
# Needs Google Chrome and poppler (`brew install poppler` for pdftocairo).
# Run from anywhere: the paths below are resolved from this file's location.
#
# Output, in this directory:
#   invitation-a5-bleed.pdf   both sides, page 1 = front, page 2 = back
#   invitation-forside.svg    front, text as outlines, images embedded
#   invitation-bagside.svg    back
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
  -e "s|</head>|<link rel=\"stylesheet\" href=\"file://$here/bleed.css\" media=\"print\" /></head>|" \
  "$root/invitation.html" > "$tmp/invitation.html"

"$chrome" --headless=new --disable-gpu --no-pdf-header-footer \
  --virtual-time-budget=8000 \
  --print-to-pdf="$here/invitation-a5-bleed.pdf" \
  "file://$tmp/invitation.html" 2>/dev/null

pdftocairo -svg -f 1 -l 1 "$here/invitation-a5-bleed.pdf" "$here/invitation-forside.svg"
pdftocairo -svg -f 2 -l 2 "$here/invitation-a5-bleed.pdf" "$here/invitation-bagside.svg"

pdfinfo "$here/invitation-a5-bleed.pdf" | grep -E "^(Pages|Page size)"
ls -la "$here"/invitation-*.svg "$here"/invitation-a5-bleed.pdf
