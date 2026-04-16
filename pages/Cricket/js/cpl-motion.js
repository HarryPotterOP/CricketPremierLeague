(function () {
  function initReveal() {
    const els = document.querySelectorAll('[data-reveal]');
    if (!els.length) return;
    if (!window.IntersectionObserver) {
      els.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add('is-visible');
            io.unobserve(en.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );
    els.forEach((el) => io.observe(el));
  }
  function revealAllNow() {
    document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-visible'));
  }
  function activateStagger(el) {
    if (!el || el.classList.contains('is-staggered')) return;
    const kids = el.children;
    for (let i = 0; i < kids.length; i++) {
      kids[i].style.transitionDelay = 0.06 * i + 's';
    }
    requestAnimationFrame(() => el.classList.add('is-staggered'));
  }
  function initStagger() {
    const parents = document.querySelectorAll('[data-stagger-children]');
    if (!parents.length) return;
    if (!window.IntersectionObserver) {
      parents.forEach(activateStagger);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            activateStagger(en.target);
            io.unobserve(en.target);
          }
        });
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.06 }
    );
    parents.forEach((p) => io.observe(p));
  }
  function staggerAllNow() {
    document.querySelectorAll('[data-stagger-children]').forEach(activateStagger);
  }
  window.CPL_MOTION_REFRESH = function refreshReveal() {
    revealAllNow();
    staggerAllNow();
  };
  function boot() {
    initReveal();
    initStagger();
  }
  document.addEventListener('DOMContentLoaded', boot);
})();
