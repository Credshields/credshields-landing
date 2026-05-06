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
  var aiScanFormUrl = 'https://share-eu1.hsforms.com/2zCMAi8R0SD6rmwMc_-UwBQeth5y';
  var chainQuickscanUrl = 'https://solidityscan.com/quickscan';

  function openHubspotPopup(url) {
    var popup = window.open(url, '_blank', 'noopener,noreferrer');
    if (!popup) {
      window.location.href = url;
    }
  }

  function openCalendlyPopup(url) {
    if (window.Calendly && typeof window.Calendly.initPopupWidget === 'function') {
      window.Calendly.initPopupWidget({ url: url });
      return;
    }
    window.location.href = url;
  }

  function openBookingPopup() {
    openCalendlyPopup(bookingUrl);
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
    openHubspotPopup(aiScanFormUrl);
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
