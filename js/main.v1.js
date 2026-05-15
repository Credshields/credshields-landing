/* =========================================================
   CredShields Main JS v1
   ─ Mode toggle (Apps ↔ Chain)
   ─ Mobile nav overlay
   ─ Banner close
   ─ Animated stat counters
   ========================================================= */

(function () {
  'use strict';

  var bookingUrl = 'https://calendly.com/koda-credshields/30min';
  var hubspotPortalId = '24889894';
  var hubspotFormId = 'cc23008b-c474-483e-ab9b-031cffe53005';
  var hubspotSubmitUrl = 'https://api.hsforms.com/submissions/v3/integration/submit/' + hubspotPortalId + '/' + hubspotFormId;
  var sampleReportHubspotFormId = '82af3488-c4b7-4925-b29e-7e1be857b2e9';
  var sampleReportHubspotSubmitUrl = 'https://api.hsforms.com/submissions/v3/integration/submit/' + hubspotPortalId + '/' + sampleReportHubspotFormId;
  var chainQuickscanUrl = 'https://solidityscan.com/quickscan';
  var contactModal = null;
  var contactLastFocus = null;
  var contactFieldMap = {
    email: 'email',
    need: 'what_are_you_looking_for_from_the_credshields_team_',
    company: 'company',
    website: 'website',
    platform: 'platform_for_the_project',
    telegram: 'telegram_id',
    calendar: 'link_to_the_calendar_schedule_meeting'
  };
  var contactFallbackFieldMap = {
    email: 'email',
    company: 'company',
    website: 'website',
    telegram: 'telegram_handle',
    expectation: 'briefly_describe_your_expectation_'
  };

  function openSchedulingPopup(url) {
    if (window.Calendly && typeof window.Calendly.initPopupWidget === 'function') {
      window.Calendly.initPopupWidget({ url: url });
      return;
    }
    window.location.href = url;
  }

  function openBookingPopup() {
    openSchedulingPopup(bookingUrl);
  }

  function getHubspotCookie() {
    var match = document.cookie.match(/(?:^|;\s*)hubspotutk=([^;]+)/);
    return match ? decodeURIComponent(match[1]) : '';
  }

  function contactOptions(name, values) {
    return values.map(function (value) {
      var id = 'cs-contact-' + name + '-' + value.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      return (
        '<label class="cs-contact-check" for="' + id + '">' +
          '<input id="' + id + '" type="checkbox" name="' + name + '" value="' + value + '">' +
          '<span>' + value + '</span>' +
        '</label>'
      );
    }).join('');
  }

  function ensureContactModal() {
    if (contactModal) return contactModal;

    var modal = document.createElement('div');
    modal.className = 'cs-contact-modal';
    modal.setAttribute('aria-hidden', 'true');
    modal.innerHTML =
      '<div class="cs-contact-backdrop" data-contact-close></div>' +
      '<div class="cs-contact-dialog" role="dialog" aria-modal="true" aria-labelledby="cs-contact-title">' +
        '<button class="cs-contact-close" type="button" aria-label="Close contact form" data-contact-close>✕</button>' +
        '<div class="cs-contact-kicker">Security briefing</div>' +
        '<h2 id="cs-contact-title" class="cs-contact-title">Talk to the CredShields team</h2>' +
        '<p class="cs-contact-copy">Please fill out the form below to get in touch with the team. We typically respond within 48 hours. For urgent requests, drop a message in the <a href="https://t.me/solidityscan" target="_blank" rel="noopener noreferrer">SolidityScan Telegram community</a>.</p>' +
        '<form class="cs-contact-form" novalidate>' +
          '<div class="cs-contact-status" role="status" aria-live="polite"></div>' +
          '<label class="cs-contact-field">Email <strong>*</strong><input type="email" name="email" autocomplete="email" required></label>' +
          '<fieldset class="cs-contact-fieldset">' +
            '<legend>What are you looking for from the CredShields team?</legend>' +
            '<div class="cs-contact-checkgrid">' + contactOptions('need', ['Smart Contract Audit', 'Web Application Audit', 'Cloud Infrastructure Audit', 'Others']) + '</div>' +
          '</fieldset>' +
          '<div class="cs-contact-grid">' +
            '<label class="cs-contact-field">Company Name<input type="text" name="company" autocomplete="organization"></label>' +
            '<label class="cs-contact-field">Project Website<input type="url" name="website" inputmode="url" placeholder="https://"></label>' +
          '</div>' +
          '<fieldset class="cs-contact-fieldset">' +
            '<legend>Platform for the project</legend>' +
            '<div class="cs-contact-checkgrid cs-contact-checkgrid--platform">' + contactOptions('platform', ['Arbitrum', 'Base', 'Binance', 'Ethereum', 'Polygon', 'Others']) + '</div>' +
          '</fieldset>' +
          '<div class="cs-contact-grid">' +
            '<label class="cs-contact-field">Telegram ID <strong>*</strong><input type="text" name="telegram" autocomplete="off" required></label>' +
            '<label class="cs-contact-field">Link to the calendar <span>(Schedule Meeting)</span><input type="url" name="calendar" inputmode="url" placeholder="https://"></label>' +
          '</div>' +
          '<div class="cs-contact-actions">' +
            '<button class="btn-primary-lg cs-contact-submit" type="submit">Submit request</button>' +
            '<a class="cs-contact-calendar" href="' + bookingUrl + '" data-book-security>Schedule instead ↗</a>' +
          '</div>' +
        '</form>' +
      '</div>';

    document.body.appendChild(modal);
    contactModal = modal;

    modal.addEventListener('click', function (e) {
      if (e.target.closest('[data-contact-close]')) closeContactModal();
    });

    modal.querySelector('form').addEventListener('submit', submitContactForm);
    return modal;
  }

  function openContactModal() {
    var modal = ensureContactModal();
    contactLastFocus = document.activeElement;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('cs-contact-modal-open');
    setTimeout(function () {
      var firstInput = modal.querySelector('input[name="email"]');
      if (firstInput) firstInput.focus();
    }, 0);
  }

  function closeContactModal() {
    if (!contactModal) return;
    contactModal.classList.remove('open');
    contactModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('cs-contact-modal-open');
    if (contactLastFocus && typeof contactLastFocus.focus === 'function') {
      contactLastFocus.focus();
    }
  }

  function getCheckedValues(form, name) {
    return Array.prototype.slice.call(form.querySelectorAll('input[name="' + name + '"]:checked')).map(function (input) {
      return input.value;
    });
  }

  function normalizeUrl(value) {
    var trimmed = (value || '').trim();
    if (!trimmed) return '';
    if (/^https?:\/\//i.test(trimmed)) return trimmed;
    return 'https://' + trimmed;
  }

  function setContactStatus(form, message, state) {
    var status = form.querySelector('.cs-contact-status');
    if (!status) return;
    status.textContent = message || '';
    status.dataset.state = state || '';
  }

  function buildContactPayload(fields) {
    var payload = {
      submittedAt: Date.now(),
      fields: fields,
      context: {
        pageUri: window.location.href,
        pageName: document.title
      }
    };
    var hutk = getHubspotCookie();
    if (hutk) payload.context.hutk = hutk;
    return payload;
  }

  function submitHubspotPayload(payload, submitUrl) {
    return fetch(submitUrl || hubspotSubmitUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).then(function (response) {
      if (!response.ok) throw new Error('HubSpot returned ' + response.status);
      return response.json().catch(function () { return {}; });
    });
  }

  function submitContactForm(e) {
    e.preventDefault();
    var form = e.currentTarget;
    var submit = form.querySelector('.cs-contact-submit');
    var email = form.elements.email.value.trim();
    var telegram = form.elements.telegram.value.trim();
    var need = getCheckedValues(form, 'need');
    var platform = getCheckedValues(form, 'platform');

    if (!email || !telegram) {
      setContactStatus(form, 'Please add your email and Telegram ID before submitting.', 'error');
      form.reportValidity();
      return;
    }

    var fields = [
      { name: contactFieldMap.email, value: email },
      { name: contactFieldMap.telegram, value: telegram }
    ];
    var fallbackFields = [
      { name: contactFallbackFieldMap.email, value: email },
      { name: contactFallbackFieldMap.telegram, value: telegram }
    ];
    var company = form.elements.company.value.trim();
    var website = normalizeUrl(form.elements.website.value);
    var calendar = normalizeUrl(form.elements.calendar.value);
    var expectation = [
      need.length ? 'Looking for: ' + need.join(', ') : '',
      platform.length ? 'Platform: ' + platform.join(', ') : '',
      calendar ? 'Schedule meeting link: ' + calendar : ''
    ].filter(Boolean).join('\n');

    if (need.length) fields.push({ name: contactFieldMap.need, value: need.join(';') });
    if (company) {
      fields.push({ name: contactFieldMap.company, value: company });
      fallbackFields.push({ name: contactFallbackFieldMap.company, value: company });
    }
    if (website) {
      fields.push({ name: contactFieldMap.website, value: website });
      fallbackFields.push({ name: contactFallbackFieldMap.website, value: website });
    }
    if (platform.length) fields.push({ name: contactFieldMap.platform, value: platform.join(';') });
    if (calendar) fields.push({ name: contactFieldMap.calendar, value: calendar });
    if (expectation) fallbackFields.push({ name: contactFallbackFieldMap.expectation, value: expectation });

    setContactStatus(form, 'Submitting your request...', 'pending');
    if (submit) submit.disabled = true;

    submitHubspotPayload(buildContactPayload(fields)).catch(function () {
      return submitHubspotPayload(buildContactPayload(fallbackFields));
    }).then(function () {
      form.reset();
      setContactStatus(form, 'Thanks. Your request has been submitted and our team will get back to you soon.', 'success');
    }).catch(function () {
      setContactStatus(form, 'We could not submit the form just now. Please try again, or schedule a meeting instead.', 'error');
    }).finally(function () {
      if (submit) submit.disabled = false;
    });
  }

  function setSampleReportStatus(form, message, state) {
    var status = form.querySelector('[data-sample-report-status]');
    if (!status) return;
    status.textContent = message || '';
    status.dataset.state = state || '';
    status.style.color = state === 'error' ? '#C0000A' : state === 'success' ? 'var(--green)' : 'var(--fg-3)';
  }

  function submitSampleReportForm(e) {
    var form = e.target.closest('[data-sample-report-form]');
    if (!form) return;

    e.preventDefault();

    var emailInput = form.elements.email;
    var submit = form.querySelector('button[type="submit"]');
    var email = emailInput ? emailInput.value.trim() : '';

    if (!email) {
      setSampleReportStatus(form, 'Please enter your email to receive the sample report.', 'error');
      form.reportValidity();
      return;
    }

    setSampleReportStatus(form, 'Sending the sample report request...', 'pending');
    if (submit) submit.disabled = true;

    submitHubspotPayload(buildContactPayload([
      { name: 'email', value: email }
    ]), sampleReportHubspotSubmitUrl).then(function () {
      form.reset();
      setSampleReportStatus(form, 'Thanks. We received your request and will send the sample report to your inbox.', 'success');
    }).catch(function () {
      setSampleReportStatus(form, 'We could not submit the request just now. Please try again in a moment.', 'error');
    }).finally(function () {
      if (submit) submit.disabled = false;
    });
  }

  function hasNativeLinkTarget(cta) {
    if (!cta || cta.tagName !== 'A') return false;
    var href = cta.getAttribute('href') || '';
    return href && href !== '#';
  }

  document.addEventListener('click', function (e) {
    var cta = e.target.closest('[data-book-security]');
    if (!cta) return;
    e.preventDefault();
    openBookingPopup();
  });

  document.addEventListener('click', function (e) {
    var cta = e.target.closest('[data-free-ai-scan]');
    if (!cta) return;
    if (hasNativeLinkTarget(cta)) return;
    e.preventDefault();
    window.location.href = chainQuickscanUrl;
  });

  document.addEventListener('click', function (e) {
    var cta = e.target.closest('[data-contact-form]');
    if (!cta) return;
    e.preventDefault();
    openContactModal();
  });

  document.addEventListener('submit', submitSampleReportForm);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && contactModal && contactModal.classList.contains('open')) {
      closeContactModal();
    }
  });

  /* ── 1. MODE TOGGLE ─────────────────────────────────────── */
  var html    = document.documentElement;
  var btns    = document.querySelectorAll('.mode-toggle-btn');
  var saved   = null;

  try { saved = localStorage.getItem('cs-mode'); } catch (e) {}
  if (saved === 'apps' || saved === 'chain') applyMode(saved);

  function applyMode(mode) {
    html.setAttribute('data-mode', mode);
    btns.forEach(function (b) {
      b.setAttribute('aria-pressed', b.dataset.mode === mode ? 'true' : 'false');
    });
    try { localStorage.setItem('cs-mode', mode); } catch (e) {}
    setTimeout(initHeroTraces, 0);
  }

  var pathname = location.pathname || '';
  var isIndex  = /(^\/$|index\.html$)/i.test(pathname) || pathname === '';

  btns.forEach(function (b) {
    b.addEventListener('click', function () {
      var mode = b.dataset.mode;
      try { localStorage.setItem('cs-mode', mode); } catch (e) {}
      if (isIndex) {
        applyMode(mode);
      } else {
        location.href = 'index.html';
      }
    });
  });

  /* ── 2. MOBILE NAV OVERLAY ──────────────────────────────── */
  var menuBtn  = document.getElementById('mobile-menu-btn');
  var overlay  = document.getElementById('mobile-overlay');
  var closeBtn = document.getElementById('mobile-close');

  if (menuBtn && overlay) {
    menuBtn.addEventListener('click', function () {
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
    closeBtn && closeBtn.addEventListener('click', closeMobileNav);
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeMobileNav();
    });
  }

  function closeMobileNav() {
    if (overlay) overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Mobile sub-menu toggles
  document.querySelectorAll('.mobile-nav-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var sub = document.getElementById(btn.dataset.target);
      if (sub) sub.classList.toggle('open');
      var icon = btn.querySelector('.mobile-chevron');
      if (icon) icon.style.transform = sub && sub.classList.contains('open')
        ? 'rotate(180deg)' : 'rotate(0deg)';
    });
  });

  /* ── 3. NOTIFICATION BANNER CLOSE ──────────────────────── */
  var banner    = document.getElementById('alert-banner');
  var bannerBtn = document.getElementById('close-banner');
  if (bannerBtn && banner) {
    bannerBtn.addEventListener('click', function () {
      banner.style.display = 'none';
    });
  }

  /* ── 4. HERO GRID TRACES ───────────────────────────────── */
  function initHeroTraces() {
    var hosts = document.querySelectorAll('.hero-traces');
    if (!hosts.length) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var cell = 48;
    var density = 1 / 260;
    var minCount = 4;
    var maxCount = 8;
    var verticalRatio = 0.6;

    function rand(min, max) {
      return min + Math.random() * (max - min);
    }

    function randInt(min, max) {
      return Math.floor(rand(min, max));
    }

    function pickFree(size, used) {
      if (size <= 2) return 1;
      for (var k = 0; k < 16; k++) {
        var value = randInt(1, size);
        if (!used.has(value)) return value;
      }
      for (var i = 1; i < size; i++) {
        if (!used.has(i)) return i;
      }
      return 1;
    }

    function randomize(trace, cols, rows, usedCols, usedRows) {
      if (trace.dataset.axis === 'v' && trace.dataset.line) usedCols.delete(+trace.dataset.line);
      if (trace.dataset.axis === 'h' && trace.dataset.line) usedRows.delete(+trace.dataset.line);

      var vertical = Math.random() < verticalRatio;
      if (vertical && usedCols.size >= cols - 1) vertical = false;
      if (!vertical && usedRows.size >= rows - 1) vertical = true;

      trace.className = 'hero-trace ' + (vertical ? 'v' : 'h');
      trace.dataset.axis = vertical ? 'v' : 'h';

      var line;
      if (vertical) {
        line = pickFree(cols, usedCols);
        usedCols.add(line);
        trace.style.left = (line * cell) + 'px';
        trace.style.top = (randInt(0, Math.max(1, rows)) * cell) + 'px';
      } else {
        line = pickFree(rows, usedRows);
        usedRows.add(line);
        trace.style.top = (line * cell) + 'px';
        trace.style.left = (randInt(0, Math.max(1, cols)) * cell) + 'px';
      }

      trace.dataset.line = line;
      trace.style.setProperty('--travel', ((randInt(3, 6) * cell) + 192) + 'px');
      trace.style.setProperty('--dur', rand(1.8, 3.2).toFixed(2) + 's');
    }

    function build(host, usedCols, usedRows) {
      host.innerHTML = '';
      usedCols.clear();
      usedRows.clear();

      var width = host.clientWidth;
      var height = host.clientHeight;
      if (!width || !height) return;

      var cols = Math.floor(width / cell);
      var rows = Math.floor(height / cell);
      var count = Math.max(minCount, Math.min(maxCount, Math.round(width * density)));

      for (var i = 0; i < count; i++) {
        var trace = document.createElement('div');
        host.appendChild(trace);
        randomize(trace, cols, rows, usedCols, usedRows);
        trace.style.animationDelay = rand(-8, 0).toFixed(2) + 's';
        trace.addEventListener('animationiteration', (function (el) {
          return function () { randomize(el, cols, rows, usedCols, usedRows); };
        })(trace));
      }
    }

    hosts.forEach(function (host) {
      var state = host.__heroTraceState || {
        usedCols: new Set(),
        usedRows: new Set(),
        resizeTimer: null,
        bound: false
      };
      host.__heroTraceState = state;

      build(host, state.usedCols, state.usedRows);

      if (state.bound) return;
      state.bound = true;
      window.addEventListener('resize', function () {
        clearTimeout(state.resizeTimer);
        state.resizeTimer = setTimeout(function () {
          build(host, state.usedCols, state.usedRows);
        }, 180);
      });
    });
  }

  initHeroTraces();

  /* ── 5. STAT COUNTER ANIMATION ──────────────────────────── */
  function animateCounters() {
    document.querySelectorAll('[data-counter]').forEach(function (el) {
      var target   = parseFloat(el.dataset.counter);
      var prefix   = el.dataset.prefix  || '';
      var suffix   = el.dataset.suffix  || '';
      var decimals = el.dataset.decimals ? parseInt(el.dataset.decimals) : 0;
      var duration = 1600;
      var start    = null;

      function step(ts) {
        if (!start) start = ts;
        var progress = Math.min((ts - start) / duration, 1);
        var eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        var val      = eased * target;
        el.textContent = prefix + val.toFixed(decimals) + suffix;
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }

  // Only run counters when hero enters viewport
  var heroStats = document.querySelector('.hero-stats');
  if (heroStats && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { animateCounters(); io.disconnect(); }
      });
    }, { threshold: 0.5 });
    io.observe(heroStats);
  } else if (heroStats) {
    animateCounters();
  }

})();
