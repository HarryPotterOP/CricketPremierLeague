(function () {
  function initHeroSlider() {
    const root = document.querySelector('[data-hero-slider]');
    if (!root) return;
    const slides = Array.from(root.querySelectorAll('[data-hero-slide]'));
    if (!slides.length) return;
    const prev = root.querySelector('[data-hero-prev]');
    const next = root.querySelector('[data-hero-next]');
    let i = 0;
    let timer = null;
    function show(idx) {
      i = (idx + slides.length) % slides.length;
      slides.forEach((s, n) => s.classList.toggle('is-active', n === i));
    }
    function stopAuto() {
      if (timer) clearInterval(timer);
      timer = null;
    }
    function startAuto() {
      stopAuto();
      timer = setInterval(() => show(i + 1), 7000);
    }
    if (prev) {
      prev.addEventListener('click', () => {
        show(i - 1);
        startAuto();
      });
    }
    if (next) {
      next.addEventListener('click', () => {
        show(i + 1);
        startAuto();
      });
    }
    show(0);
    startAuto();
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stopAuto();
      else startAuto();
    });
  }
  function initRails() {
    const rails = Array.from(document.querySelectorAll('[data-rail]'));
    rails.forEach((rail) => {
      const name = rail.getAttribute('data-rail');
      const prev = document.querySelector('[data-rail-prev="' + name + '"]');
      const next = document.querySelector('[data-rail-next="' + name + '"]');
      const step = () => Math.max(rail.clientWidth * 0.8, 280);
      function move(dir) {
        const delta = dir * step();
        const target = rail.scrollLeft + delta;
        if (typeof rail.scrollTo === 'function') {
          rail.scrollTo({ left: target, behavior: 'smooth' });
        } else {
          rail.scrollLeft = target;
        }
      }
      if (prev) prev.addEventListener('click', () => move(-1));
      if (next) next.addEventListener('click', () => move(1));
    });
  }
  document.addEventListener('DOMContentLoaded', () => {
    initHeroSlider();
    initRails();
  });
})();
