/* Animated release workflow, adapted from the standalone homepage. */
(function () {
  'use strict';
  class ReleaseWorkflow {
    constructor() {
      this._alive = true;
      this._setupPipe();
      if (!this._pipeEls) return;
      this._motion = window.matchMedia('(prefers-reduced-motion: reduce)');
      this._motion.addEventListener('change', () => { this._pipeStop(); if (this._visible && !document.hidden) this._pipeStart(); });
      document.addEventListener('visibilitychange', () => { this._pipeStop(); if (this._visible && !document.hidden) this._pipeStart(); });
      window.addEventListener('pagehide', () => this._pipeStop());
      window.addEventListener('pageshow', () => { if (this._visible && !document.hidden) this._pipeStart(); });
    }
  _setupPipe() {
    const root = document;
    const wrap = root.querySelector('[data-pipe]');
    if (!wrap) return;
    this._pipeEls = {
      cards: Array.from(wrap.querySelectorAll('[data-pipe-card]')),
      pulse: wrap.querySelector('[data-pipe-pulse]'),
      status: wrap.querySelector('[data-pipe-status]'),
      progress: wrap.querySelector('[data-pipe-progress]'),
      stageProgress: Array.from(wrap.querySelectorAll('[data-pipe-stage-progress]')),
    };
    this._pipeIo = new IntersectionObserver((entries) => {
      for (const en of entries) { this._visible = en.isIntersecting; if (this._visible && !document.hidden) this._pipeStart(); else this._pipeStop(); }
    }, { threshold: 0.35 });
    this._pipeIo.observe(wrap);
  }
  _pipeStart() {
    if (this._pipeTimers) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this._pipeEls.stageProgress.forEach((bar) => { bar.style.width = '100%'; });
      const g = this._pipeEls.cards[3]; if (g) { g.setAttribute('data-state', 'ok'); this._pipeEls.status.textContent = 'PROTECTED'; this._pipeEls.progress.style.width = '100%'; }
      return;
    }
    this._pipeTimers = new Set();
    this._pipeRun();
  }
  _pipeStop() {
    if (this._pipeTimers) { this._pipeTimers.forEach(clearTimeout); this._pipeTimers = null; }
    this._pipeReset();
  }
  _pipeReset() {
    const e = this._pipeEls; if (!e) return;
    e.cards.forEach((c) => { c.removeAttribute('data-active'); c.removeAttribute('data-state'); });
    if (e.pulse) { e.pulse.style.transition = 'none'; e.pulse.style.opacity = '0'; e.pulse.style.left = '0%'; }
    if (e.status) e.status.textContent = 'IDLE';
    if (e.progress) { e.progress.style.transition = 'none'; e.progress.style.width = '0%'; }
    e.stageProgress.forEach((bar) => { bar.style.transition = 'none'; bar.style.width = '0%'; });
  }
  _pipeRun() {
    const e = this._pipeEls; if (!e || !this._pipeTimers) return;
    const at = (ms, fn) => { const timer = setTimeout(() => { if (!this._pipeTimers) return; this._pipeTimers.delete(timer); if (this._alive) fn(); }, ms); this._pipeTimers.add(timer); };
    const on = (i) => { e.cards.forEach((c, k) => { if (k === i) c.setAttribute('data-active', '1'); else if (k !== 3) c.removeAttribute('data-active'); }); };
    const commitStart = 40;
    const commitEnd = 2000;
    const buildEnd = 3800;
    const deployEnd = 5600;
    const fill = (i, duration) => { e.stageProgress[i].style.transition = 'width ' + duration + 'ms linear'; e.stageProgress[i].style.width = '100%'; };
    this._pipeReset();
    at(commitStart, () => {
      e.pulse.style.transition = '';
      e.progress.style.transition = '';
      e.pulse.style.opacity = '1';
      on(0);
      fill(0, commitEnd - commitStart);
    });
    at(500, () => { e.pulse.style.left = '33.333%'; });
    at(commitEnd, () => { on(1); fill(1, buildEnd - commitEnd); });
    at(2300, () => { e.pulse.style.left = '66.666%'; });
    at(buildEnd, () => { on(2); fill(2, deployEnd - buildEnd); });
    at(4100, () => { e.pulse.style.left = '100%'; });
    at(deployEnd, () => { e.pulse.style.opacity = '0'; e.cards[2].removeAttribute('data-active'); e.cards[3].setAttribute('data-state', 'scan'); e.status.textContent = 'SCANNING'; e.progress.style.width = '22%'; });
    at(6450, () => { e.status.textContent = 'ATTACK DETECTED'; e.progress.style.width = '52%'; });
    at(7350, () => { e.status.textContent = 'EXPLOIT VERIFIED'; e.progress.style.width = '84%'; });
    at(8250, () => { e.status.textContent = 'PROTECTED'; e.progress.style.width = '100%'; e.cards[3].setAttribute('data-state', 'ok'); });
    at(10250, () => { e.cards[3].removeAttribute('data-state'); e.status.textContent = 'IDLE'; e.progress.style.transition = 'none'; e.progress.style.width = '0%'; });
    at(10950, () => this._pipeRun());
  }
  }
  new ReleaseWorkflow();
})();
