#!/usr/bin/env python3
"""Flatten the pictures in a pdftocairo SVG so Vistaprint's importer shows them.

pdftocairo writes every picture that has transparency as two <image> elements
in <defs>, a colour image and a greyscale alpha image, joins them with a <mask>
and two feColorMatrix filters, and draws the result with <use> under a stack
of clipPaths. Vistaprint's SVG importer renders none of that: the outlined
text comes through and the pictures vanish.

This script does the compositing itself. For every drawn picture the alpha
mask, the group opacity and the clip rectangle are baked into one PNG, which
is written back as a plain <image x y width height> at the same place in the
drawing order. The masks, filters and picture definitions are then dropped
from <defs>; outlined text, paths and clip paths are left as they were.

It only knows the shapes pdftocairo produces: axis-aligned transforms,
rectangular clips, and masks that are either a single rect (opacity) or a
single greyscale image (alpha). Anything else stops it with an error rather
than silently writing a wrong file.

Needs Pillow:  pip install pillow

usage: flatten-svg.py in.svg out.svg
"""

import base64
import io
import math
import re
import sys
import xml.etree.ElementTree as ET

from PIL import Image

SVG = "http://www.w3.org/2000/svg"
XLINK = "http://www.w3.org/1999/xlink"
ET.register_namespace("", SVG)
ET.register_namespace("xlink", XLINK)

HREF = "{%s}href" % XLINK


def tag(name):
    return "{%s}%s" % (SVG, name)


# --- geometry ---------------------------------------------------------------

IDENTITY = (1.0, 0.0, 0.0, 1.0, 0.0, 0.0)


def parse_matrix(s):
    """An SVG transform attribute as (a, b, c, d, e, f); only matrix() occurs."""
    if not s:
        return IDENTITY
    m = re.fullmatch(r"\s*matrix\(([^)]*)\)\s*", s)
    if not m:
        raise SystemExit("unsupported transform: %s" % s)
    nums = [float(v) for v in re.split(r"[\s,]+", m.group(1).strip())]
    return tuple(nums)


def compose(outer, inner):
    """The matrix that applies `inner` first and `outer` after it."""
    a, b, c, d, e, f = outer
    a2, b2, c2, d2, e2, f2 = inner
    return (
        a * a2 + c * b2,
        b * a2 + d * b2,
        a * c2 + c * d2,
        b * c2 + d * d2,
        a * e2 + c * f2 + e,
        b * e2 + d * f2 + f,
    )


def map_rect(rect, m):
    a, b, c, d, e, f = m
    if abs(b) > 1e-9 or abs(c) > 1e-9:
        raise SystemExit("rotated or skewed transform: %r" % (m,))
    x0, y0, x1, y1 = rect
    xs = sorted((a * x0 + e, a * x1 + e))
    ys = sorted((d * y0 + f, d * y1 + f))
    return (xs[0], ys[0], xs[1], ys[1])


def intersect(r, s):
    if r is None:
        return s
    if s is None:
        return r
    return (max(r[0], s[0]), max(r[1], s[1]), min(r[2], s[2]), min(r[3], s[3]))


def clip_rect(clip_el):
    """The bounding box of a clipPath that is a single rect or rectangular path."""
    kids = list(clip_el)
    if len(kids) != 1:
        raise SystemExit("clipPath %s is not a single shape" % clip_el.get("id"))
    k = kids[0]
    if k.tag == tag("rect"):
        x, y = float(k.get("x", 0)), float(k.get("y", 0))
        return (x, y, x + float(k.get("width")), y + float(k.get("height")))
    if k.tag == tag("path"):
        nums = [float(v) for v in re.findall(r"-?\d+(?:\.\d+)?", k.get("d"))]
        xs, ys = nums[0::2], nums[1::2]
        return (min(xs), min(ys), max(xs), max(ys))
    raise SystemExit("clipPath %s holds a %s" % (clip_el.get("id"), k.tag))


def ref_id(value):
    """`url(#x)` or `#x` -> `x`."""
    m = re.fullmatch(r"\s*(?:url\()?#([^)\s]+)\)?\s*", value)
    if not m:
        raise SystemExit("unexpected reference: %s" % value)
    return m.group(1)


# --- the document -----------------------------------------------------------


class Flattener:
    def __init__(self, root):
        self.root = root
        self.by_id = {el.get("id"): el for el in root.iter() if el.get("id")}
        self.parent = {c: p for p in root.iter() for c in p}
        self.pictures = {}  # image id -> PIL image, decoded on first use
        self.replacements = []  # (use element, new image element)
        self.used_ids = set()

    # pictures

    def picture(self, image_id):
        if image_id not in self.pictures:
            el = self.by_id[image_id]
            href = el.get(HREF)
            m = re.fullmatch(r"data:image/[^;]+;base64,(.*)", href, re.S)
            if not m:
                raise SystemExit("image %s is not a data URI" % image_id)
            im = Image.open(io.BytesIO(base64.b64decode(m.group(1))))
            im.load()
            if (im.width, im.height) != (int(el.get("width")), int(el.get("height"))):
                raise SystemExit("image %s: size does not match its data" % image_id)
            self.pictures[image_id] = im
        return self.pictures[image_id]

    # masks

    def mask(self, mask_id):
        """('opacity', value) or ('alpha', image id, transform)."""
        el = self.by_id[mask_id]
        kids = list(el)
        if len(kids) == 1 and kids[0].tag == tag("g"):
            kids = list(kids[0])
        if len(kids) != 1:
            raise SystemExit("mask %s is not a single shape" % mask_id)
        k = kids[0]
        if k.tag == tag("rect"):
            return ("opacity", float(k.get("fill-opacity", 1)))
        if k.tag == tag("use"):
            return ("alpha", ref_id(k.get(HREF)), parse_matrix(k.get("transform")))
        raise SystemExit("mask %s holds a %s" % (mask_id, k.tag))

    # the walk

    def run(self):
        for child in list(self.root):
            if child.tag != tag("defs"):
                self.walk(child, IDENTITY, None, 1.0, None, None)
        for use, image in self.replacements:
            parent = self.parent[use]
            parent[list(parent).index(use)] = image
        self.prune_defs()

    def walk(self, el, ctm, clip, opacity, alpha, outer_use):
        """Carry the drawing context down to every <use> of a picture.

        `outer_use` is the <use> in the body that drew us here when we are
        inside a <defs> group; the flattened picture replaces that element.
        """
        ctm = compose(ctm, parse_matrix(el.get("transform")))
        if el.get("clip-path"):
            cid = ref_id(el.get("clip-path"))
            clip = intersect(clip, map_rect(clip_rect(self.by_id[cid]), ctm))
        if el.get("mask"):
            kind, *rest = self.mask(ref_id(el.get("mask")))
            if kind == "opacity":
                opacity *= rest[0]
            else:
                alpha = (rest[0], compose(ctm, rest[1]))
        if el.tag == tag("use"):
            target = self.by_id[ref_id(el.get(HREF))]
            # `is None`: an element with no children counts as false.
            drawer = el if outer_use is None else outer_use
            if target.tag == tag("image"):
                self.emit(drawer, target.get("id"), ctm, clip, opacity, alpha)
            elif target.tag == tag("g"):
                self.used_ids.add(target.get("id"))
                self.walk(target, ctm, clip, opacity, alpha, drawer)
            # anything else is a glyph, which Vistaprint draws fine
            return
        for child in list(el):
            self.walk(child, ctm, clip, opacity, alpha, outer_use)

    def emit(self, use, image_id, ctm, clip, opacity, alpha):
        a, b, c, d, e, f = ctm
        if abs(b) > 1e-9 or abs(c) > 1e-9 or a <= 0 or d <= 0:
            raise SystemExit("image %s: unsupported transform %r" % (image_id, ctm))
        im = self.picture(image_id).convert("RGBA")
        self.used_ids.add(image_id)

        if alpha:
            alpha_id, alpha_ctm = alpha
            if any(abs(p - q) > 1e-3 for p, q in zip(alpha_ctm, ctm)):
                raise SystemExit("image %s: its mask sits elsewhere" % image_id)
            mask = self.picture(alpha_id).convert("L")
            if mask.size != im.size:
                raise SystemExit("image %s: mask is a different size" % image_id)
            im.putalpha(mask)
            self.used_ids.add(alpha_id)

        # Crop to the visible part: the clip rectangle, rounded out to whole
        # pixels so nothing visible is lost.
        w, h = im.size
        full = (e, f, e + a * w, f + d * h)
        vis = intersect(full, clip)
        if vis[2] <= vis[0] or vis[3] <= vis[1]:
            raise SystemExit("image %s is entirely clipped" % image_id)
        px0 = max(0, math.floor((vis[0] - e) / a))
        py0 = max(0, math.floor((vis[1] - f) / d))
        px1 = min(w, math.ceil((vis[2] - e) / a))
        py1 = min(h, math.ceil((vis[3] - f) / d))
        im = im.crop((px0, py0, px1, py1))

        if opacity < 1:
            im.putalpha(im.getchannel("A").point(lambda v: round(v * opacity)))

        buf = io.BytesIO()
        im.save(buf, "PNG", optimize=True)
        data = base64.b64encode(buf.getvalue()).decode("ascii")

        out = ET.Element(tag("image"))
        out.set("x", "%.4f" % (e + px0 * a))
        out.set("y", "%.4f" % (f + py0 * d))
        out.set("width", "%.4f" % ((px1 - px0) * a))
        out.set("height", "%.4f" % ((py1 - py0) * d))
        out.set("preserveAspectRatio", "none")
        out.set(HREF, "data:image/png;base64," + data)
        out.tail = use.tail
        self.replacements.append((use, out))

    def prune_defs(self):
        """Drop the picture machinery the body no longer refers to."""
        for defs in self.root.findall(tag("defs")):
            for el in list(defs):
                if el.tag in (tag("mask"), tag("filter")):
                    defs.remove(el)
                elif el.tag == tag("image") and el.get("id") in self.used_ids:
                    defs.remove(el)
                elif el.tag == tag("g") and el.get("id") in self.used_ids:
                    defs.remove(el)


def main(argv):
    if len(argv) != 3:
        raise SystemExit(__doc__)
    tree = ET.parse(argv[1])
    flattener = Flattener(tree.getroot())
    flattener.run()
    tree.write(argv[2], encoding="UTF-8", xml_declaration=True)
    print(
        "%s: %d picture(s) flattened" % (argv[2], len(flattener.replacements)),
        file=sys.stderr,
    )


if __name__ == "__main__":
    main(sys.argv)
