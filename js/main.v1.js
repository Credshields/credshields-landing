/* =========================================================
   CredShields Main JS v1
   ─ Mode toggle (Apps ↔ Chain)
   ─ Mobile nav overlay
   ─ Banner close
   ─ Animated stat counters
   ========================================================= */

(function () {
  'use strict';

  var bookingUrl = 'https://share-eu1.hsforms.com/2sIrgwu_PRrq0Y3dNK4ZSTAeth5y';
  var aiScanFormUrl = 'https://share-eu1.hsforms.com/2zCMAi8R0SD6rmwMc_-UwBQeth5y';
  var chainQuickscanUrl = 'https://solidityscan.com/quickscan';

  function openHubspotPopup(url) {
    if (window.Calendly && typeof window.Calendly.initPopupWidget === 'function') {
      window.Calendly.initPopupWidget({ url: url });
    } else {
      window.location.href = url;
    }
  }

  function openBookingPopup() {
    openHubspotPopup(bookingUrl);
  }

  function isChainScanCta(cta) {
    if (cta.classList.contains('show-chain') || cta.closest('.show-chain')) return true;
    if (cta.classList.contains('show-apps') || cta.closest('.show-apps')) return false;
    return html.getAttribute('data-mode') === 'chain';
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
    e.preventDefault();
    if (isChainScanCta(cta)) {
      window.location.href = chainQuickscanUrl;
    } else {
      openHubspotPopup(aiScanFormUrl);
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

  /* ── 4. STAT COUNTER ANIMATION ──────────────────────────── */
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
