/*
 * The travel globe.
 *
 * An orthographic globe drawn on a canvas, which turns to face whichever
 * photograph in "Vejen hertil" the visitor is pointing at. Coordinates come
 * from data-lat / data-lon on the buttons; coastlines from world.js.
 *
 * Nothing is drawn between transitions — the globe holds still once it has
 * arrived, so an idle page costs nothing.
 */
(function () {
  'use strict';

  var RAD = Math.PI / 180;

  var OCEAN_LIGHT = '#a9c3c9';
  var OCEAN_DEEP = '#4e6f79';
  var LAND = '#93a689';
  var LAND_EDGE = 'rgba(46, 63, 50, 0.55)';
  var GRATICULE = 'rgba(251, 247, 239, 0.22)';
  var PIN = '#a9503c';
  var PIN_IDLE = 'rgba(251, 247, 239, 0.75)';

  /* --- Maths ------------------------------------------------------------ */

  // Signed difference a -> b, taking the short way round the globe.
  function shortest(a, b) {
    var d = (b - a) % 360;
    if (d > 180) d -= 360;
    if (d < -180) d += 360;
    return d;
  }

  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function initGlobe() {
    var root = document.querySelector('[data-travel]');
    if (!root) return;

    var canvas = root.querySelector('[data-globe-canvas]');
    var trips = Array.prototype.slice.call(root.querySelectorAll('[data-trip]'));
    if (!canvas || !canvas.getContext || !trips.length) return;

    var land = window.WORLD_LAND || [];
    var ctx = canvas.getContext('2d');
    var placeOut = root.querySelector('[data-globe-place]');
    var countryOut = root.querySelector('[data-globe-country]');

    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    var spots = trips.map(function (btn) {
      return {
        el: btn,
        lat: parseFloat(btn.getAttribute('data-lat')),
        lon: parseFloat(btn.getAttribute('data-lon')),
      };
    });

    // Rotation is expressed the way d3 does it: the angles the sphere is
    // turned by, so a place at (lon, lat) is centred at (-lon, -lat).
    var rot = { lam: -spots[0].lon, phi: -spots[0].lat };
    var active = 0;
    var size = 0;
    var frame = null;

    /* --- Projection ----------------------------------------------------- */

    // Returns unit-sphere screen offsets plus how far towards the viewer the
    // point sits; `front` below zero means it is round the back.
    function project(lon, lat) {
      var l = (lon + rot.lam) * RAD;
      var p = lat * RAD;
      var cp = Math.cos(p);
      var x = Math.cos(l) * cp;
      var y = Math.sin(l) * cp;
      var z = Math.sin(p);
      var dp = rot.phi * RAD;
      var cd = Math.cos(dp);
      var sd = Math.sin(dp);
      return { x: y, y: -(z * cd + x * sd), front: x * cd - z * sd };
    }

    /* --- Drawing -------------------------------------------------------- */

    function drawSphere(cx, cy, r) {
      var g = ctx.createRadialGradient(
        cx - r * 0.35, cy - r * 0.42, r * 0.08,
        cx, cy, r * 1.05
      );
      g.addColorStop(0, OCEAN_LIGHT);
      g.addColorStop(1, OCEAN_DEEP);

      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();
    }

    // Meridians and parallels, broken wherever they pass behind the horizon.
    function drawGraticule(cx, cy, r) {
      ctx.strokeStyle = GRATICULE;
      ctx.lineWidth = 0.6;

      var lon, lat, step, started, p;

      for (lon = -180; lon < 180; lon += 30) {
        ctx.beginPath();
        started = false;
        for (lat = -80; lat <= 80; lat += 4) {
          p = project(lon, lat);
          if (p.front < 0) { started = false; continue; }
          if (started) ctx.lineTo(cx + p.x * r, cy + p.y * r);
          else { ctx.moveTo(cx + p.x * r, cy + p.y * r); started = true; }
        }
        ctx.stroke();
      }

      for (lat = -60; lat <= 60; lat += 30) {
        ctx.beginPath();
        started = false;
        for (step = -180; step <= 180; step += 4) {
          p = project(step, lat);
          if (p.front < 0) { started = false; continue; }
          if (started) ctx.lineTo(cx + p.x * r, cy + p.y * r);
          else { ctx.moveTo(cx + p.x * r, cy + p.y * r); started = true; }
        }
        ctx.stroke();
      }
    }

    /*
     * Coastlines.
     *
     * A ring that runs round the back of the globe has to be cut at the
     * horizon and closed again along it, or the hidden half folds over the
     * front — Antarctica alone would flood the whole sphere with green.
     * So each ring is split into the runs that face us, and consecutive runs
     * are rejoined by an arc along the rim.
     *
     * Two things have to be right for that to work.
     *
     * The direction round the rim: the arc has to keep the land on the same
     * side the coastline does. Orthographic projection reverses orientation
     * across the whole visible hemisphere, so the sign of the ring's area in
     * lon/lat settles it — as long as a ring drawn round a pole, whose area
     * comes out inverted on a flat lon/lat grid, is turned back over.
     *
     * And which run follows which: a continent can surface at two opposite
     * edges of the disc at once — Africa on one side, Siberia on the other —
     * and those are two separate shapes, not one band across the middle. So
     * each run is joined to the first entry point met travelling along the
     * rim, which closes each piece on itself.
     */

    var TAU = Math.PI * 2;

    // Signed area of a ring in lon/lat, longitudes unwrapped so a coastline
    // crossing the date line still comes out as one polygon. A ring that
    // encircles a pole sweeps a whole turn of longitude, and its area on the
    // flat grid then has the wrong sign for the shape on the globe.
    function ringWinding(ring) {
      var firstLon = ring[0];
      var firstLat = ring[1];
      var lon = firstLon;
      var raw = firstLon;
      var px = firstLon;
      var py = firstLat;
      var area = 0;

      for (var i = 2; i < ring.length; i += 2) {
        var step = ring[i] - raw;
        if (step > 180) step -= 360;
        else if (step < -180) step += 360;
        raw = ring[i];
        lon += step;
        var lat = ring[i + 1];
        area += px * lat - lon * py;
        px = lon;
        py = lat;
      }
      area += px * firstLat - firstLon * py;
      return Math.abs(lon - firstLon) > 180 ? -area : area;
    }

    // Canvas angles grow clockwise on screen; a ring that reads clockwise
    // there keeps its interior to the right, and so does a rim walked with
    // the angle increasing.
    var clockwise = land.map(function (ring) {
      return ringWinding(ring) < 0;
    });

    // How far it is from one rim angle to another, travelling the way the
    // rim is walked for this ring.
    function rimGap(from, to, cw) {
      var d = (cw ? to - from : from - to) % TAU;
      return d < 0 ? d + TAU : d;
    }

    // Where the edge a–b crosses the horizon, as a point on the rim.
    function horizon(ax, ay, af, bx, by, bf) {
      var t = af / (af - bf);
      var x = ax + (bx - ax) * t;
      var y = ay + (by - ay) * t;
      var m = Math.sqrt(x * x + y * y) || 1e-9;
      return [x / m, y / m];
    }

    var px = [];
    var py = [];
    var pf = [];

    function drawLand(cx, cy, r) {
      ctx.fillStyle = LAND;
      ctx.strokeStyle = LAND_EDGE;
      ctx.lineWidth = 0.7;
      ctx.lineJoin = 'round';

      land.forEach(function (ring, ringIndex) {
        var n = ring.length / 2;
        var i;
        var seen = false;
        var hidden = false;

        for (i = 0; i < n; i++) {
          var p = project(ring[i * 2], ring[i * 2 + 1]);
          px[i] = p.x;
          py[i] = p.y;
          pf[i] = p.front;
          if (p.front >= 0) seen = true;
          else hidden = true;
        }

        if (!seen) return;

        // Wholly in view: an ordinary polygon.
        if (!hidden) {
          ctx.beginPath();
          for (i = 0; i < n; i++) {
            if (i === 0) ctx.moveTo(cx + px[i] * r, cy + py[i] * r);
            else ctx.lineTo(cx + px[i] * r, cy + py[i] * r);
          }
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          return;
        }

        // Start the walk on a hidden vertex, so every run has both an entry
        // and an exit on the rim.
        var start = 0;
        while (pf[start] >= 0) start++;

        var runs = [];
        var run = null;
        for (var k = 0; k < n; k++) {
          var a = (start + k) % n;
          var b = (start + k + 1) % n;
          var aSeen = pf[a] >= 0;
          var bSeen = pf[b] >= 0;

          if (!aSeen && bSeen) {
            var enter = horizon(px[a], py[a], pf[a], px[b], py[b], pf[b]);
            run = { points: [enter], entry: Math.atan2(enter[1], enter[0]) };
          }
          if (aSeen && run) run.points.push([px[a], py[a]]);
          if (aSeen && !bSeen && run) {
            var leave = horizon(px[a], py[a], pf[a], px[b], py[b], pf[b]);
            run.points.push(leave);
            run.exit = Math.atan2(leave[1], leave[0]);
            runs.push(run);
            run = null;
          }
        }

        if (!runs.length) return;

        var cw = clockwise[ringIndex];

        // Follow each run with whichever run starts first along the rim.
        var follows = runs.map(function (piece) {
          var best = 0;
          var bestGap = Infinity;
          runs.forEach(function (other, j) {
            var gap = rimGap(piece.exit, other.entry, cw);
            if (gap < bestGap) {
              bestGap = gap;
              best = j;
            }
          });
          return best;
        });

        // Each chain of runs closes into one shape; a ring showing up in two
        // places on the rim therefore comes out as two shapes.
        var done = [];
        ctx.beginPath();
        for (var s = 0; s < runs.length; s++) {
          if (done[s]) continue;
          var at = s;
          var opening = true;
          do {
            done[at] = true;
            var points = runs[at].points;
            for (var m = 0; m < points.length; m++) {
              var X = cx + points[m][0] * r;
              var Y = cy + points[m][1] * r;
              if (opening && m === 0) ctx.moveTo(X, Y);
              else ctx.lineTo(X, Y);
            }
            opening = false;
            var to = follows[at];
            ctx.arc(cx, cy, r, runs[at].exit, runs[to].entry, !cw);
            at = to;
          } while (!done[at]);
          ctx.closePath();
        }
        ctx.fill();

        // Stroke the coastline only — the rim arcs are not shoreline.
        ctx.beginPath();
        runs.forEach(function (piece) {
          piece.points.forEach(function (point, m) {
            var X = cx + point[0] * r;
            var Y = cy + point[1] * r;
            if (m === 0) ctx.moveTo(X, Y);
            else ctx.lineTo(X, Y);
          });
        });
        ctx.stroke();
      });
    }

    function drawPins(cx, cy, r) {
      spots.forEach(function (spot, index) {
        var p = project(spot.lon, spot.lat);
        if (p.front < 0) return;
        var x = cx + p.x * r;
        var y = cy + p.y * r;

        if (index === active) {
          ctx.beginPath();
          ctx.arc(x, y, r * 0.085, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(169, 80, 60, 0.22)';
          ctx.fill();

          ctx.beginPath();
          ctx.arc(x, y, r * 0.05, 0, Math.PI * 2);
          ctx.strokeStyle = PIN;
          ctx.lineWidth = 1.4;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(x, y, r * 0.022, 0, Math.PI * 2);
          ctx.fillStyle = PIN;
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(x, y, r * 0.014, 0, Math.PI * 2);
          ctx.fillStyle = PIN_IDLE;
          ctx.fill();
        }
      });
    }

    function drawRim(cx, cy, r) {
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(44, 51, 45, 0.18)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    function draw() {
      if (!size) return;
      var cx = size / 2;
      var cy = size / 2;
      var r = size / 2 - 2;

      ctx.clearRect(0, 0, size, size);
      drawSphere(cx, cy, r);

      // Everything on the sphere stays inside it, however the rim is rounded.
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.clip();
      drawGraticule(cx, cy, r);
      drawLand(cx, cy, r);
      drawPins(cx, cy, r);
      ctx.restore();

      drawRim(cx, cy, r);
    }

    /* --- Turning -------------------------------------------------------- */

    function turnTo(spot) {
      var from = { lam: rot.lam, phi: rot.phi };
      var dLam = shortest(from.lam, -spot.lon);
      var dPhi = -spot.lat - from.phi;

      if (reduced || (Math.abs(dLam) < 0.01 && Math.abs(dPhi) < 0.01)) {
        rot.lam = -spot.lon;
        rot.phi = -spot.lat;
        draw();
        return;
      }

      // Long hops get a little longer to travel, within reason.
      var distance = Math.sqrt(dLam * dLam + dPhi * dPhi);
      var duration = Math.min(1500, 550 + distance * 3.2);
      var start = null;

      if (frame) window.cancelAnimationFrame(frame);

      frame = window.requestAnimationFrame(function step(now) {
        if (start === null) start = now;
        var t = Math.min(1, (now - start) / duration);
        var e = easeInOutCubic(t);
        rot.lam = from.lam + dLam * e;
        rot.phi = from.phi + dPhi * e;
        draw();
        if (t < 1) frame = window.requestAnimationFrame(step);
        else frame = null;
      });
    }

    /* --- Selection ------------------------------------------------------ */

    function names(btn) {
      var place = btn.querySelector('.trip__place');
      var country = btn.querySelector('.trip__country');
      return {
        place: place ? place.textContent : '',
        country: country ? country.textContent : '',
      };
    }

    function label(index) {
      var text = names(spots[index].el);
      if (placeOut) placeOut.textContent = text.place;
      if (countryOut) countryOut.textContent = text.country;
    }

    // What the lightbox in main.js needs to open the full photograph. Taken
    // from the markup rather than repeated in it, and rebuilt when the
    // language changes so the caption follows.
    function describe() {
      spots.forEach(function (spot) {
        var img = spot.el.querySelector('img');
        var text = names(spot.el);
        if (img) spot.el.setAttribute('data-full', img.getAttribute('src'));
        spot.el.setAttribute(
          'data-caption',
          text.country ? text.place + ' · ' + text.country : text.place
        );
      });
    }

    function select(index) {
      if (index === active) return;
      spots[active].el.removeAttribute('aria-current');
      active = index;
      spots[active].el.setAttribute('aria-current', 'true');
      label(index);
      turnTo(spots[index]);
    }

    spots.forEach(function (spot, index) {
      spot.el.addEventListener('mouseenter', function () {
        select(index);
      });
      spot.el.addEventListener('focus', function () {
        select(index);
      });
      spot.el.addEventListener('click', function () {
        select(index);
      });
    });

    /* --- Sizing ---------------------------------------------------------- */

    function resize() {
      var width = canvas.parentNode.clientWidth;
      if (!width || width === size) {
        draw();
        return;
      }
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      size = width;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(width * dpr);
      canvas.style.height = width + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    }

    if ('ResizeObserver' in window) {
      new window.ResizeObserver(resize).observe(canvas.parentNode);
    } else {
      window.addEventListener('resize', resize);
    }

    spots[active].el.setAttribute('aria-current', 'true');
    label(active);
    describe();
    resize();

    // Place names are translated, so the label has to be rebuilt on a switch.
    document.addEventListener('i18n:change', function () {
      label(active);
      describe();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGlobe);
  } else {
    initGlobe();
  }
})();
