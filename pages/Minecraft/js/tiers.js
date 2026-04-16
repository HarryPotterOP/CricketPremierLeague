
const TIERS_ICONS = {
  overall: `<svg viewBox="0 0 24 24" fill="url(#t-grad)" stroke="#f59e0b" stroke-width="1.5"><defs><linearGradient id="t-grad" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#fbbf24"/><stop offset="100%" stop-color="#d97706"/></linearGradient></defs><path d="M5 4h14v2H5V4zm0 3h14v4c0 3.86-3.14 7-7 7s-7-3.14-7-7V7zm7 11c-2.21 0-4-1.79-4-4h8c0 2.21-1.79 4-4 4zm-1 0v3H9v2h6v-2h-2v-3h-2z"/></svg>`,
  ltms: `<svg viewBox="0 0 24 24" fill="none" class="t-icon" stroke="#cbd5e1" stroke-width="2" stroke-linecap="square" stroke-linejoin="miter"><path d="m14.5 17.5 3 3"/><path d="m5.5 8.5-3-3"/><path d="m14 13.5 6-6a2.12 2.12 0 1 0-3-3l-6 6"/><path d="m15.5 16.5-1.5-1.5"/><path d="m10.5 8.5-1.5-1.5"/><path d="m8.5 15.5-3 3"/><path d="m18.5 5.5-3-3"/><path d="m13.5 14-6 6a2.12 2.12 0 1 1-3-3l6-6"/><path d="m8.5 10.5-1.5-1.5"/><path d="m16.5 15.5-1.5-1.5"/></svg>`,
  vanilla: `<svg viewBox="0 0 24 24"><defs><radialGradient id="v-grad" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#e9d5ff" /><stop offset="100%" stop-color="#9333ea" /></radialGradient></defs><polygon points="12,2 20,8 20,16 12,22 4,16 4,8" fill="url(#v-grad)" stroke="#7e22ce" stroke-width="1.5"/><polygon points="12,6 16,10 16,14 12,18 8,14 8,10" fill="#d8b4fe" opacity="0.6"/></svg>`,
  uhc: `<svg viewBox="0 0 24 24" fill="url(#u-grad)" stroke="#991b1b" stroke-width="1"><defs><linearGradient id="u-grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#f87171"/><stop offset="100%" stop-color="#b91c1c"/></linearGradient></defs><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`,
  pot: `<svg viewBox="0 0 24 24" fill="url(#p-grad)" stroke="#c026d3" stroke-width="1.5"><defs><radialGradient id="p-grad" cx="50%" cy="50%" r="50%"><stop offset="50%" stop-color="#f472b6"/><stop offset="100%" stop-color="#db2777"/></radialGradient></defs><path d="M10 2v2"/><path d="M14 2v2"/><path d="M12 2v4"/><path d="M8.5 8c0-3 1.5-4 3.5-4s3.5 1 3.5 4c0 3-4 5-4 9s1.5 6 3 6c-3.5 0-6.5-2.5-6.5-6 0-4-3-6-3-9z"/></svg>`,
  nethop: `<svg viewBox="0 0 24 24" fill="url(#n-grad)" stroke="#7e22ce" stroke-width="1"><defs><linearGradient id="n-grad" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#c084fc"/><stop offset="100%" stop-color="#6b21a8"/></linearGradient></defs><path d="M12 2C7.58 2 4 5.58 4 10v10l2-2v2l2-2v2l2-2v2l2-2v2l2-2v2l2-2V10c0-4.42-3.58-8-8-8z"/><path d="M8 14h8" stroke="#3b0764" stroke-width="2"/></svg>`,
  smp: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#064e3b"/><circle cx="14" cy="9" r="4" fill="#34d399" opacity="0.8"/><circle cx="10" cy="15" r="3" fill="#10b981" opacity="0.4"/></svg>`,
  sword: `<svg viewBox="0 0 24 24" fill="#38bdf8" stroke="#0ea5e9" stroke-width="1.5"><path d="M14.5 17.5 3 6V3h3l11.5 11.5"/><path d="m13 19 6-6" stroke="#fbbf24" stroke-width="2"/><path d="m16 16 3 3" stroke="#fbbf24" stroke-width="2"/><path d="m19 21 2-2" stroke="#b45309" stroke-width="3"/></svg>`,
  axe: `<svg viewBox="0 0 24 24" fill="#94a3b8" stroke="#475569" stroke-width="1.5"><path d="m14 12-8.5 8.5a2.12 2.12 0 1 1-3-3L11 9"/><path d="M15 13 9 7l4-4 6 6h3a8 8 0 0 1-7 7z" fill="url(#a-grad)"/><defs><linearGradient id="a-grad"><stop offset="0%" stop-color="#cbd5e1"/><stop offset="100%" stop-color="#64748b"/></linearGradient></defs></svg>`,
  mace: `<svg viewBox="0 0 24 24" fill="#64748b" stroke="#334155" stroke-width="1.5"><path d="m15 9-9 9" stroke="#9ca3af" stroke-width="3"/><rect x="12" y="6" width="4" height="4" rx="1"/><rect x="16" y="10" width="4" height="4" rx="1"/><rect x="10" y="4" width="4" height="4" rx="1"/><rect x="14" y="12" width="4" height="4" rx="1"/><circle cx="16" cy="8" r="3" fill="#cbd5e1" stroke="#475569"/></svg>`
};
document.addEventListener('DOMContentLoaded', () => {
  injectIcons();
  initTabsFiltering();
  initPlayerSearch();
  init3DTiltEffect();
  document.addEventListener('keydown', (e) => {
    if (e.key === '/') {
      e.preventDefault();
      document.getElementById('playerSearch')?.focus();
    }
  });
});
function injectIcons() {
  for (const [key, svgStr] of Object.entries(TIERS_ICONS)) {
    document.querySelectorAll(`.SVG_${key}`).forEach(el => {
      el.innerHTML = svgStr;
    });
  }
}
function init3DTiltEffect() {
  const cards = document.querySelectorAll('.player-row');
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      if (window.innerWidth < 900) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position within the element
      const y = e.clientY - rect.top;  // y position within the element
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const percentX = (x - centerX) / centerX;
      const percentY = (y - centerY) / centerY;
      const rotateX = percentY * -5;
      const rotateY = percentX * 3;
      card.style.transform = `scale3d(1.02, 1.02, 1.02) perspective(1500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      const polygon = card.querySelector('.rank-bg-polygon');
      if (polygon) {
        polygon.style.filter = `brightness(${1.1 + (percentX * 0.1)}) saturate(1.2)`;
      }
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = `scale3d(1, 1, 1) perspective(1500px) rotateX(0deg) rotateY(0deg)`;
      const polygon = card.querySelector('.rank-bg-polygon');
      if (polygon) {
        polygon.style.filter = '';
      }
    });
    card.style.transition = 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
  });
}
function initTabsFiltering() {
  const tabs = document.querySelectorAll('.tier-tab');
  const playerRows = document.querySelectorAll('.player-row');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const category = tab.dataset.category;
      let rankCounter = 1;
      playerRows.forEach((row, idx) => {
        const categories = row.dataset.category.split(' ');
        if (category === 'overall' || categories.includes(category)) {
          row.style.display = 'grid';
          row.style.opacity = '0';
          row.style.transform = 'translateY(15px)';
          setTimeout(() => {
            row.style.opacity = '1';
            row.style.transform = 'translateY(0) scale3d(1,1,1)';
          }, idx * 40);
          const rankEl = row.querySelector('.rank-number');
          if (rankEl) rankEl.textContent = `${rankCounter}.`; // Added dot like screenshot
          row.classList.remove('rank-1', 'rank-2', 'rank-3', 'unranked');
          if (rankCounter === 1) row.classList.add('rank-1');
          else if (rankCounter === 2) row.classList.add('rank-2');
          else if (rankCounter === 3) row.classList.add('rank-3');
          else row.classList.add('unranked');
          rankCounter++;
        } else {
          row.style.display = 'none';
        }
      });
    });
  });
}
function initPlayerSearch() {
  const searchInput = document.getElementById('playerSearch');
  const playerRows = document.querySelectorAll('.player-row');
  if (!searchInput) return;
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase().trim();
    const activeTab = document.querySelector('.tier-tab.active');
    const activeCategory = activeTab ? activeTab.dataset.category : 'overall';
    playerRows.forEach(row => {
      const name = row.querySelector('.player-name')?.textContent.toLowerCase() || '';
      const categories = row.dataset.category.split(' ');
      const matchesSearch = name.includes(query);
      const matchesCategory = activeCategory === 'overall' || categories.includes(activeCategory);
      if (matchesSearch && matchesCategory) {
        row.style.display = 'grid';
      } else {
        row.style.display = 'none';
      }
    });
  });
}
