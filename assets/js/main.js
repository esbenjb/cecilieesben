/* Site behaviour: countdown, navigation, scroll reveal, RSVP form, gallery lightbox. */
(function () {
  'use strict';

  /* --- Configuration -------------------------------------------------- */

  // Ceremony start, Danish summer time (UTC+2).
  var CEREMONY = new Date('2027-06-12T13:00:00+02:00');

  // TODO: paste a Formspree / Google Form / own endpoint here. While it is
  // empty the form falls back to opening the guest's mail app with the reply
  // pre-filled, so the site is usable from day one.
  var FORM_ENDPOINT = '';

  // TODO: replace with the address replies should be sent to.
  var CONTACT_EMAIL = 'bryllup@example.dk';

  /* --- Schedule -------------------------------------------------------- */

  // One source of truth for the weekend, rendered in two shapes: the day cards
  // on the front page and the flyer list on the plan page.
  var SCHEDULE = [
    { key: 'fri', items: 2 },
    { key: 'sat', items: 8, feature: true },
    { key: 'sun', items: 2 },
  ];

  // Each shape names its own classes; 'notes' and 'texts' say how much of the
  // wording survives at that size.
  var SHAPES = {
    cards: { block: 'day', item: 'day__item', feature: true, texts: true, notes: true },
    flyer: { block: 'plan-day', item: 'plan-item', texts: false, notes: true },
    card: { block: 'inv-day', item: 'inv-item', texts: false, notes: false },
  };

  function renderSchedule() {
    var hosts = document.querySelectorAll('[data-schedule]');
    if (!hosts.length) return;

    var t = window.i18n.t;

    hosts.forEach(function (host) {
      var shape = SHAPES[host.getAttribute('data-schedule')] || SHAPES.cards;
      host.textContent = '';

      SCHEDULE.forEach(function (day) {
        var article = document.createElement('article');
        article.className = shape.block;
        if (shape.feature && day.feature) article.classList.add(shape.block + '--feature');

        var head = document.createElement('header');
        head.className = shape.block + '__head';
        ['day', 'date', 'title'].forEach(function (part, index) {
          var el = document.createElement(index === 1 ? 'strong' : index === 2 ? 'p' : 'span');
          el.className = shape.block + '__' + part;
          el.textContent = t('program.' + day.key + '.' + part);
          head.appendChild(el);
        });
        article.appendChild(head);

        var list = document.createElement('ul');
        list.className = shape.block + '__list';

        for (var i = 1; i <= day.items; i++) {
          var prefix = 'program.' + day.key + '.' + i + '.';
          var li = document.createElement('li');
          li.className = shape.item;

          var time = document.createElement('span');
          time.className = shape.item + '__time';
          time.textContent = t(prefix + 'time');

          var body = document.createElement('div');
          var title = document.createElement('h4');
          title.textContent = t(prefix + 'title');
          body.appendChild(title);

          if (shape.texts) {
            var text = document.createElement('p');
            text.textContent = t(prefix + 'text');
            body.appendChild(text);
          }

          li.appendChild(time);
          li.appendChild(body);
          list.appendChild(li);
        }
        article.appendChild(list);

        if (shape.notes) {
          var note = document.createElement('p');
          note.className = shape.block + '__note';
          note.textContent = t('program.' + day.key + '.note');
          article.appendChild(note);
        }

        host.appendChild(article);
      });
    });
  }

  /* --- Countdown ------------------------------------------------------- */

  function initCountdown() {
    var root = document.querySelector('[data-countdown]');
    if (!root) return;

    var units = ['days', 'hours', 'minutes', 'seconds'];
    var outputs = {};
    units.forEach(function (unit) {
      outputs[unit] = root.querySelector('[data-countdown-value="' + unit + '"]');
    });
    var message = root.querySelector('[data-countdown-message]');
    var grid = root.querySelector('[data-countdown-grid]');

    function pad(value) {
      return value < 10 ? '0' + value : String(value);
    }

    function render() {
      var diff = CEREMONY.getTime() - Date.now();

      if (diff <= 0) {
        if (grid) grid.hidden = true;
        if (message) {
          // Same calendar day as the ceremony? Then it is happening today.
          var isToday = diff > -24 * 60 * 60 * 1000;
          message.textContent = window.i18n.t(
            isToday ? 'countdown.today' : 'countdown.past'
          );
          message.hidden = false;
        }
        return false;
      }

      var seconds = Math.floor(diff / 1000);
      var values = {
        days: Math.floor(seconds / 86400),
        hours: Math.floor((seconds % 86400) / 3600),
        minutes: Math.floor((seconds % 3600) / 60),
        seconds: seconds % 60,
      };

      units.forEach(function (unit) {
        if (!outputs[unit]) return;
        outputs[unit].textContent =
          unit === 'days' ? String(values[unit]) : pad(values[unit]);
      });
      return true;
    }

    if (render()) {
      var timer = window.setInterval(function () {
        if (!render()) window.clearInterval(timer);
      }, 1000);
    }

    // Unit labels are translated by i18n.js; the message needs a re-render.
    document.addEventListener('i18n:change', render);
  }

  /* --- Navigation ------------------------------------------------------ */

  function initNav() {
    var header = document.querySelector('[data-header]');
    var toggle = document.querySelector('[data-nav-toggle]');
    var menu = document.querySelector('[data-nav-menu]');

    // Subpages keep a solid header at all times; the front page only gets one
    // once you have scrolled past the hero illustration.
    if (header && !header.hasAttribute('data-header-solid')) {
      var onScroll = function () {
        header.classList.toggle('is-scrolled', window.scrollY > 40);
      };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    if (!toggle || !menu) return;

    function close() {
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }

    toggle.addEventListener('click', function () {
      var isOpen = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    menu.addEventListener('click', function (event) {
      if (event.target.closest('a')) close();
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') close();
    });
  }

  /* --- Scroll reveal --------------------------------------------------- */

  function initReveal() {
    var items = document.querySelectorAll('[data-reveal]');
    if (!items.length) return;

    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !('IntersectionObserver' in window)) {
      items.forEach(function (el) {
        el.classList.add('is-visible');
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );

    items.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* --- RSVP ------------------------------------------------------------ */

  function initRsvp() {
    var form = document.querySelector('[data-rsvp-form]');
    if (!form) return;

    var status = form.querySelector('[data-rsvp-status]');
    var submit = form.querySelector('[data-rsvp-submit]');
    var attendingFields = form.querySelector('[data-attending-fields]');

    function setStatus(key, type) {
      if (!status) return;
      status.textContent = window.i18n.t(key);
      status.dataset.state = type;
      status.hidden = false;
    }

    function clearStatus() {
      if (!status) return;
      status.hidden = true;
      status.dataset.state = '';
      status.removeAttribute('data-i18n');
    }

    // Hide the weekend-specific questions when someone declines.
    function syncAttending() {
      var choice = form.querySelector('input[name="attending"]:checked');
      var coming = !choice || choice.value === 'yes';
      if (attendingFields) attendingFields.hidden = !coming;
    }

    form.querySelectorAll('input[name="attending"]').forEach(function (input) {
      input.addEventListener('change', syncAttending);
    });
    syncAttending();

    function validate(data) {
      if (!data.name.trim()) return 'rsvp.error.name';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
        return 'rsvp.error.email';
      }
      if (!data.attending) return 'rsvp.error.attending';
      if (data.attending === 'yes' && !data.days.length) return 'rsvp.error.days';
      return null;
    }

    function collect() {
      var fd = new FormData(form);
      return {
        name: String(fd.get('name') || ''),
        email: String(fd.get('email') || ''),
        phone: String(fd.get('phone') || ''),
        attending: fd.get('attending'),
        days: fd.getAll('days'),
        guests: String(fd.get('guests') || ''),
        overnight: fd.getAll('overnight'),
        diet: String(fd.get('diet') || ''),
        song: String(fd.get('song') || ''),
        message: String(fd.get('message') || ''),
      };
    }

    function asPlainText(data) {
      return [
        'Navn: ' + data.name,
        'E-mail: ' + data.email,
        'Telefon: ' + (data.phone || '-'),
        'Deltager: ' + (data.attending === 'yes' ? 'Ja' : 'Nej'),
        'Dage: ' + (data.days.join(', ') || '-'),
        'Antal gæster: ' + (data.guests || '-'),
        'Overnatning: ' + (data.overnight.join(', ') || '-'),
        'Mad/allergi: ' + (data.diet || '-'),
        'Sangønske: ' + (data.song || '-'),
        'Hilsen: ' + (data.message || '-'),
      ].join('\n');
    }

    function sendByMail(data) {
      var href =
        'mailto:' +
        CONTACT_EMAIL +
        '?subject=' +
        encodeURIComponent('Svar på invitation – ' + data.name) +
        '&body=' +
        encodeURIComponent(asPlainText(data));
      window.location.href = href;
      setStatus('rsvp.success.mail', 'success');
    }

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      clearStatus();

      var data = collect();
      var error = validate(data);
      if (error) {
        setStatus(error, 'error');
        return;
      }

      if (!FORM_ENDPOINT) {
        sendByMail(data);
        return;
      }

      submit.disabled = true;
      setStatus('rsvp.sending', 'pending');

      fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      })
        .then(function (response) {
          if (!response.ok) throw new Error('Request failed');
          form.reset();
          syncAttending();
          setStatus('rsvp.success', 'success');
        })
        .catch(function () {
          setStatus('rsvp.error', 'error');
        })
        .finally(function () {
          submit.disabled = false;
        });
    });
  }

  /* --- Gallery lightbox ------------------------------------------------ */

  function initGallery() {
    var galleries = document.querySelectorAll('[data-gallery]');
    var lightbox = document.querySelector('[data-lightbox]');
    if (!galleries.length || !lightbox) return;

    var image = lightbox.querySelector('[data-lightbox-image]');
    var caption = lightbox.querySelector('[data-lightbox-caption]');
    var closeBtn = lightbox.querySelector('[data-lightbox-close]');
    var lastFocused = null;

    function open(trigger) {
      var src = trigger.getAttribute('data-full');
      if (!src) return;
      lastFocused = trigger;
      image.src = src;
      image.alt = trigger.getAttribute('data-caption') || '';
      if (caption) caption.textContent = trigger.getAttribute('data-caption') || '';
      lightbox.hidden = false;
      document.body.classList.add('is-locked');
      closeBtn.focus();
    }

    function close() {
      lightbox.hidden = true;
      image.removeAttribute('src');
      document.body.classList.remove('is-locked');
      if (lastFocused) lastFocused.focus();
    }

    galleries.forEach(function (gallery) {
      gallery.addEventListener('click', function (event) {
        var trigger = event.target.closest('[data-full]');
        if (trigger) open(trigger);
      });
    });

    closeBtn.addEventListener('click', close);
    lightbox.addEventListener('click', function (event) {
      if (event.target === lightbox) close();
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && !lightbox.hidden) close();
    });
  }

  /* --- Boot ------------------------------------------------------------ */

  function init() {
    renderSchedule();
    document.addEventListener('i18n:change', renderSchedule);

    initNav();
    initCountdown();
    initReveal();
    initRsvp();
    initGallery();

    var printBtn = document.querySelector('[data-print]');
    if (printBtn) {
      printBtn.addEventListener('click', function () {
        window.print();
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
