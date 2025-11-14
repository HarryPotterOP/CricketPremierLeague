document.addEventListener('DOMContentLoaded', function() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="main-bg"></div>
    <div class="gradient-overlay"></div>
    <img class="bg-image" src="./image/Fifa.png" alt="BG" />
    <img class="player-img" src="../image/Haaland.png" alt="Player" />
    <div class="stats-container"></div>
    <div class="info-container"></div>
  `;
  const stats = [
    { label: 'PACE', value: 89, side: 'left', index: 0 },
    { label: 'SHOOTING', value: 94, side: 'left', index: 1 },
    { label: 'DRIBBLING', value: 83, side: 'right', index: 0 },
    { label: 'PASSING', value: 78, side: 'left', index: 2 }
  ];
  const playerInfo = [
    { label: 'HAALAND', value: '', side: 'right', index: 1, isName: true },
    { label: 'ST', value: '', side: 'right', index: 2, isName: false },
    { label: 'IN INDIA', value: '', side: 'right', index: 3, isName: false }
  ];

  function getRandomPosition(side, index) {
    const isLeft = side === 'left';
    const horizontal = (2 + Math.random() * 8) + '%';
    const baseTop = 15 + (index * 25);
    const randomOffset = (Math.random() - 0.5) * 15;
    const top = Math.max(10, Math.min(75, baseTop + randomOffset)) + '%';
    return isLeft ? { top, left: horizontal } : { top, right: horizontal };
  }

  const statsContainer = document.querySelector('.stats-container');
  stats.forEach((stat, i) => {
    const pos = getRandomPosition(stat.side, stat.index);
    const box = document.createElement('div');
    box.className = 'stat-box';
    box.style.top = pos.top;
    if (pos.left) box.style.left = pos.left;
    if (pos.right) box.style.right = pos.right;
    box.style.animationDelay = (0.2 + i * 0.15) + 's';
    box.innerHTML = `
      <div class="parallelogram">
        <div class="stat-label">${stat.label}</div>
        <div class="stat-bar-bg">
          <div class="stat-bar" style="width: 0"></div>
        </div>
        <div class="stat-value">${stat.value}</div>
      </div>
    `;
    statsContainer.appendChild(box);
    setTimeout(() => {
      box.querySelector('.stat-bar').style.width = stat.value + '%';
      box.classList.add('glow');
    }, 700 + i * 200);
  });

  const infoContainer = document.querySelector('.info-container');
  playerInfo.forEach((info, i) => {
    const pos = getRandomPosition(info.side, info.index);
    const box = document.createElement('div');
    box.className = 'info-box' + (info.isName ? ' info-name' : '');
    box.style.top = pos.top;
    if (pos.left) box.style.left = pos.left;
    if (pos.right) box.style.right = pos.right;
    box.style.animationDelay = (0.5 + i * 0.18) + 's';
    if (info.isName) {
      box.innerHTML = `<div class="parallelogram info-name-label">${info.label}</div>`;
    } else {
      box.innerHTML = `<div class="parallelogram info-label">${info.label}</div>`;
    }
    infoContainer.appendChild(box);
    setTimeout(() => {
      box.classList.add('glow');
    }, 900 + i * 200);
  });
});
