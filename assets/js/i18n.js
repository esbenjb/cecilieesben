/*
 * Minimal i18n layer.
 *
 * Danish is the default. The chosen language is stored in localStorage so it
 * survives navigation between pages and repeat visits.
 *
 * Markup contract:
 *   data-i18n="key"                          -> replaces textContent
 *   data-i18n-attr="placeholder:key;title:k" -> replaces the listed attributes
 *   <body data-title-key data-description-key> -> <title> and meta description
 */
(function () {
  'use strict';

  var DEFAULT_LANG = 'da';
  var SUPPORTED = ['da', 'en'];
  var STORAGE_KEY = 'bryllup.lang';

  function readStored() {
    try {
      var stored = window.localStorage.getItem(STORAGE_KEY);
      return SUPPORTED.indexOf(stored) !== -1 ? stored : null;
    } catch (err) {
      return null; // private mode / storage disabled
    }
  }

  function persist(lang) {
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch (err) {
      /* ignore */
    }
  }

  var current = readStored() || DEFAULT_LANG;

  function t(key) {
    var dict = window.TRANSLATIONS[current] || {};
    if (Object.prototype.hasOwnProperty.call(dict, key)) return dict[key];
    var fallback = window.TRANSLATIONS[DEFAULT_LANG] || {};
    if (Object.prototype.hasOwnProperty.call(fallback, key)) return fallback[key];
    return key; // makes a missing translation obvious rather than silent
  }

  function applyTo(root) {
    var scope = root || document;

    scope.querySelectorAll('[data-i18n]').forEach(function (el) {
      el.textContent = t(el.getAttribute('data-i18n'));
    });

    scope.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
      el.getAttribute('data-i18n-attr')
        .split(';')
        .forEach(function (pair) {
          var parts = pair.split(':');
          if (parts.length !== 2) return;
          el.setAttribute(parts[0].trim(), t(parts[1].trim()));
        });
    });
  }

  function apply() {
    document.documentElement.lang = current;
    applyTo(document);

    var body = document.body;
    if (body.dataset.titleKey) document.title = t(body.dataset.titleKey);
    if (body.dataset.descriptionKey) {
      var meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute('content', t(body.dataset.descriptionKey));
    }

    document.querySelectorAll('[data-lang-btn]').forEach(function (btn) {
      var isActive = btn.getAttribute('data-lang-btn') === current;
      btn.classList.toggle('is-active', isActive);
      btn.setAttribute('aria-pressed', String(isActive));
    });

    document.dispatchEvent(
      new CustomEvent('i18n:change', { detail: { lang: current } })
    );
  }

  function setLang(lang) {
    if (SUPPORTED.indexOf(lang) === -1 || lang === current) return;
    current = lang;
    persist(lang);
    apply();
  }

  window.i18n = {
    t: t,
    apply: apply,
    applyTo: applyTo,
    setLang: setLang,
    get lang() {
      return current;
    },
  };

  document.addEventListener('click', function (event) {
    var btn = event.target.closest('[data-lang-btn]');
    if (!btn) return;
    setLang(btn.getAttribute('data-lang-btn'));
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', apply);
  } else {
    apply();
  }
})();
