/* NOURA — landing page enhancements.
   Everything here is progressive: the story, anchors and FAQ work without JavaScript.
   Forms run in DEMO mode: they validate locally and never send, store or approve anything. */
(function () {
  'use strict';

  var root = document.documentElement;
  var isPreview = root.getAttribute('data-mode') === 'preview';
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ---------- Missing assets → honest placeholders ---------- */
  function markMissing(img) {
    var slot = img.closest('[data-asset-slot]');
    if (!slot) { img.hidden = true; return; }
    var name = img.getAttribute('data-asset') || 'asset';
    var isLogo = /logo|wordmark/.test(name);
    var label = slot.getAttribute('data-missing-text') || (isLogo ? 'Logo asset pending' : 'Image pending · ' + name);
    slot.setAttribute('data-missing-label', isPreview ? label : '');
    slot.classList.add('is-missing');
  }
  document.querySelectorAll('img[data-asset]').forEach(function (img) {
    if (img.complete && img.naturalWidth === 0) markMissing(img);
    img.addEventListener('error', function () { markMissing(img); });
  });

  /* ---------- Mobile menu ---------- */
  var menuToggle = document.querySelector('[data-menu-toggle]');
  var menu = document.querySelector('[data-menu]');
  var menuLabel = document.querySelector('[data-menu-label]');

  function setMenu(open, restoreFocus) {
    menu.hidden = !open;
    menuToggle.setAttribute('aria-expanded', String(open));
    menuLabel.textContent = open ? 'Close menu' : 'Open menu';
    if (!open && restoreFocus) menuToggle.focus();
  }
  if (menuToggle && menu) {
    menuToggle.addEventListener('click', function () {
      var open = menuToggle.getAttribute('aria-expanded') !== 'true';
      setMenu(open, false);
      if (open) {
        var first = menu.querySelector('a');
        if (first) first.focus();
      }
    });
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false, false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !menu.hidden) setMenu(false, true);
    });
    window.matchMedia('(min-width: 1024px)').addEventListener('change', function (mq) {
      if (mq.matches) setMenu(false, false);
    });
  }

  /* ---------- Hero film ---------- */
  var hero = document.querySelector('[data-hero]');
  var video = document.querySelector('[data-film]');
  var toggle = document.querySelector('[data-film-toggle]');
  var toggleLabel = document.querySelector('[data-film-label]');
  var picker = document.querySelector('[data-film-picker]');

  if (hero && video && toggle) {
    var saveData = !!(navigator.connection && navigator.connection.saveData);
    var userPaused = false;       // an explicit pause always wins
    var autoPaused = false;       // paused by us (offscreen / hidden tab)
    var localUrl = null;

    var syncUI = function () {
      var paused = video.paused;
      toggle.setAttribute('data-state', paused ? 'paused' : 'playing');
      toggleLabel.textContent = paused ? 'Play film' : 'Pause film';
      hero.classList.toggle('is-playing', !paused);
    };

    var pickSource = function () {
      var mobile = video.getAttribute('data-src-mobile');
      if (mobile && window.matchMedia('(max-width: 767px)').matches) return mobile;
      return video.getAttribute('data-src');
    };

    var attemptPlay = function () {
      var p = video.play();
      if (p && p.catch) {
        // Autoplay blocked: stay on the poster and offer Play.
        p.catch(function () { syncUI(); });
      }
    };

    var loadFilm = function () {
      if (!video.getAttribute('src')) {
        var src = pickSource();
        if (!src) return false;
        video.src = src;
      }
      return true;
    };

    video.addEventListener('play', syncUI);
    video.addEventListener('pause', syncUI);
    video.addEventListener('loadeddata', function () {
      toggle.hidden = false;
      hero.classList.add('has-film');
      syncUI();
    });
    video.addEventListener('error', function () {
      // Unavailable or unsupported film: poster, copy and CTAs stay intact.
      video.removeAttribute('src');
      hero.classList.remove('has-film', 'is-playing');
      toggle.hidden = true;
    });

    toggle.addEventListener('click', function () {
      if (video.paused) {
        userPaused = false;
        autoPaused = false;
        if (loadFilm()) attemptPlay();
      } else {
        userPaused = true;
        video.pause();
      }
    });

    // Poster-first. Only fetch the film when motion is welcome and data-saver is off.
    if (!reducedMotion.matches && !saveData) {
      if (loadFilm()) attemptPlay();
    } else {
      // Offer an explicit opt-in; the file is only requested on click.
      toggle.hidden = false;
      syncUI();
    }

    reducedMotion.addEventListener('change', function (mq) {
      if (mq.matches && !video.paused) { autoPaused = false; userPaused = true; video.pause(); }
    });

    var resumeIfAllowed = function () {
      if (autoPaused && !userPaused && video.getAttribute('src')) {
        autoPaused = false;
        attemptPlay();
      }
    };
    var pauseAutomatically = function () {
      if (!video.paused) { autoPaused = true; video.pause(); }
    };

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) resumeIfAllowed(); else pauseAutomatically();
        });
      }, { threshold: 0.15 }).observe(hero);
    }
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) pauseAutomatically(); else resumeIfAllowed();
    });

    // Preview-only: try a local film on this device. Nothing is uploaded or saved.
    if (picker) {
      picker.addEventListener('change', function () {
        var file = picker.files && picker.files[0];
        if (!file || !/^video\/(mp4|webm)$/.test(file.type)) return;
        if (localUrl) URL.revokeObjectURL(localUrl);
        localUrl = URL.createObjectURL(file);
        userPaused = false;
        video.src = localUrl;
        attemptPlay();
      });
    }
  }

  /* ---------- Chapter actions preselect the private-session form ---------- */
  var sessionSelect = document.querySelector('[data-session-select]');
  document.querySelectorAll('a[data-session]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      if (!sessionSelect) return;
      var target = document.getElementById('private-session');
      e.preventDefault();
      sessionSelect.value = link.getAttribute('data-session');
      sessionSelect.dispatchEvent(new Event('change', { bubbles: true }));
      target.scrollIntoView({ behavior: reducedMotion.matches ? 'auto' : 'smooth', block: 'start' });
      if (history.pushState) history.pushState(null, '', '#private-session');
      sessionSelect.focus({ preventScroll: true });
    });
  });

  /* ---------- Request forms (demo) ---------- */
  var SESSION_TYPES = ['Yoga', 'Meditation', 'Music & Sound', 'Private Group Sessions', 'Not sure yet'];
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var PHONE_RE = /^[0-9+()\-.\s]*$/;

  function todayISO() {
    // Visitor-local date. Production validates against the approved operating timezone server-side.
    var d = new Date();
    var pad = function (n) { return String(n).padStart(2, '0'); };
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  }

  function newKey() {
    if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
    return 'k-' + Date.now().toString(36) + Math.random().toString(36).slice(2);
  }

  // Returns an error message or '' — mirrors the field dictionary in requirements.md.
  var RULES = {
    full_name: function (v) {
      v = v.trim();
      if (!v) return 'Enter your full name.';
      if (v.length < 2) return 'Your name needs at least 2 characters.';
      if (v.length > 100) return 'Your name must be 100 characters or fewer.';
      return '';
    },
    email: function (v) {
      v = v.trim();
      if (!v) return 'Enter your email address.';
      if (v.length > 254 || !EMAIL_RE.test(v)) return 'Enter an email address in the format name@example.com.';
      return '';
    },
    phone: function (v) {
      v = v.trim();
      if (v.length > 30) return 'Phone must be 30 characters or fewer.';
      if (!PHONE_RE.test(v)) return 'Use digits, spaces and + ( ) - only.';
      return '';
    },
    referral_other: function (v) {
      return v.trim().length > 100 ? 'Please keep this to 100 characters or fewer.' : '';
    },
    interests: function (v) {
      v = v.trim();
      if (!v) return 'Tell us a little about what draws you to the experience.';
      if (v.length < 10) return 'Please write at least 10 characters.';
      if (v.length > 1000) return 'Please keep this to 1000 characters or fewer.';
      return '';
    },
    session_type: function (v) {
      return SESSION_TYPES.indexOf(v) === -1 ? 'Choose the experience you are interested in.' : '';
    },
    preferred_date: function (v, el) {
      if (!v) return '';
      if (el.validity && el.validity.badInput) return 'Enter a valid date.';
      if (!/^\d{4}-\d{2}-\d{2}$/.test(v)) return 'Enter a valid date.';
      if (v < todayISO()) return 'Choose today or a future date.';
      return '';
    },
    message: function (v) {
      return v.trim().length > 1000 ? 'Please keep this to 1000 characters or fewer.' : '';
    },
    privacy_acknowledged: function (v, el) {
      return el.checked ? '' : 'Please confirm you understand how your details will be used.';
    }
  };

  function fieldError(el) {
    var rule = RULES[el.name];
    if (!rule) return '';
    var container = el.closest('.field');
    if (container && container.hidden) return '';
    return rule(el.value || '', el);
  }

  function showFieldError(el, message) {
    var errorEl = document.getElementById(el.id + '-error');
    if (message) {
      el.setAttribute('aria-invalid', 'true');
      if (errorEl) { errorEl.textContent = message; errorEl.hidden = false; }
    } else {
      el.removeAttribute('aria-invalid');
      if (errorEl) { errorEl.textContent = ''; errorEl.hidden = true; }
    }
  }

  var pointerDown = false;
  var pending = [];
  function afterPointerUp(fn) { pending.push(fn); }
  document.addEventListener('pointerdown', function () { pointerDown = true; }, true);
  ['pointerup', 'pointercancel'].forEach(function (type) {
    document.addEventListener(type, function () {
      pointerDown = false;
      var queue = pending; pending = [];
      // Let the click land first, then reveal any message.
      window.setTimeout(function () { queue.forEach(function (fn) { fn(); }); }, 0);
    }, true);
  });

  document.querySelectorAll('[data-request-form]').forEach(function (form) {
    var summary = form.querySelector('[data-error-summary]');
    var summaryList = form.querySelector('[data-error-list]');
    var status = form.querySelector('[data-status]');
    var submit = form.querySelector('[data-submit]');
    var submitLabel = form.querySelector('[data-submit-label]');
    var idem = form.querySelector('[data-idempotency]');
    var defaultLabel = submitLabel.textContent;
    var busy = false;
    var controls = Array.prototype.filter.call(form.elements, function (el) {
      return el.name && RULES[el.name];
    });

    idem.value = newKey();

    form.querySelectorAll('[data-future-date]').forEach(function (el) { el.min = todayISO(); });

    form.querySelectorAll('[data-counter]').forEach(function (el) {
      var out = document.getElementById(el.getAttribute('data-counter'));
      var max = el.getAttribute('maxlength');
      var update = function () { out.textContent = el.value.length + ' / ' + max; };
      el.addEventListener('input', update);
      form.addEventListener('reset', function () { setTimeout(update, 0); });
    });

    form.querySelectorAll('[data-other-toggle]').forEach(function (select) {
      var other = document.getElementById(select.getAttribute('data-other-toggle'));
      var sync = function () {
        other.hidden = select.value !== 'other';
        if (other.hidden) {
          var input = other.querySelector('input');
          input.value = '';
          showFieldError(input, '');
        }
      };
      select.addEventListener('change', sync);
      form.addEventListener('reset', function () { setTimeout(sync, 0); });
    });

    // Validate on blur once a value exists; re-validate live once a field has been flagged.
    // If the blur came from a press elsewhere, wait for the release so a newly shown message
    // cannot shift the control being clicked out from under the pointer.
    controls.forEach(function (el) {
      el.addEventListener('blur', function () {
        if (el.type === 'checkbox') return;
        var run = function () {
          if (el.value.trim() || el.getAttribute('aria-invalid') === 'true') showFieldError(el, fieldError(el));
        };
        if (pointerDown) afterPointerUp(run); else run();
      });
      var live = function () {
        if (el.getAttribute('aria-invalid') === 'true') showFieldError(el, fieldError(el));
      };
      el.addEventListener('input', live);
      el.addEventListener('change', live);
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (busy) return; // duplicate-click guard
      status.textContent = '';

      var errors = [];
      controls.forEach(function (el) {
        var msg = fieldError(el);
        showFieldError(el, msg);
        if (msg) errors.push({ el: el, msg: msg });
      });

      summaryList.textContent = '';
      if (errors.length) {
        errors.forEach(function (item) {
          var li = document.createElement('li');
          var a = document.createElement('a');
          a.href = '#' + item.el.id;
          a.textContent = item.msg;
          a.addEventListener('click', function (ev) {
            ev.preventDefault();
            item.el.focus();
          });
          li.appendChild(a);
          summaryList.appendChild(li);
        });
        summary.hidden = false;
        summary.focus();
        return;
      }
      summary.hidden = true;

      // Submitting state. Production: POST form.action with idem.value; on network failure keep
      // the input and the same key so a deliberate retry cannot create a duplicate request.
      busy = true;
      form.classList.add('is-submitting');
      form.setAttribute('aria-busy', 'true');
      submit.disabled = true;
      submitLabel.textContent = 'Sending…';

      window.setTimeout(function () {
        busy = false;
        form.classList.remove('is-submitting');
        form.removeAttribute('aria-busy');
        submit.disabled = false;
        submitLabel.textContent = defaultLabel;

        // The honeypot field (name="website") is checked server-side in production; a filled
        // honeypot still receives the same generic acknowledgement so nothing is revealed.
        form.reset();
        controls.forEach(function (el) { showFieldError(el, ''); });
        idem.value = newKey();

        renderSuccess(status);
        status.setAttribute('tabindex', '-1');
        status.focus();
      }, 900);
    });
  });

  function renderSuccess(status) {
    status.textContent = '';
    var title = document.createElement('p');
    title.className = 'form-status__title';
    title.innerHTML = '<svg class="icon icon--sm" aria-hidden="true" focusable="false" viewBox="0 0 24 24"><path d="m5 12 4 4L19 6"/></svg>';
    title.appendChild(document.createTextNode('Your request has been received.'));
    var body = document.createElement('p');
    body.textContent = 'Our team will review it and contact you with next steps. This is not a confirmed booking or membership approval.';
    status.appendChild(title);
    status.appendChild(body);
    var demo = document.createElement('p');
    demo.className = 'form-status__demo';
    demo.textContent = 'Preview only: nothing was sent, stored or approved.';
    status.appendChild(demo);
  }
})();
