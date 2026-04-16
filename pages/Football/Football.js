document.addEventListener('DOMContentLoaded', function () {
  const imgEl = document.querySelector('.player-3d-img');
  const player3d = document.querySelector('.player-3d-container');
  if (!imgEl || !player3d) return;
  const players = [
    {
      name: 'Gaming Elite',
      img: '../../assets/images/Elite.jpg',
      goals: 0,
      number: 5,
      country: '🇮🇳 India',
    },
    {
      name: 'King Kohli',
      img: '../../assets/images/ViratKohli.jpg',
      goals: 0,
      number: 7,
      country: '🇮🇳 India',
    },
    {
      name: 'Black Adam',
      img: '../../assets/images/Boruto.jpg',
      goals: 0,
      number: 1,
      country: '🇮🇳 India',
    },
  ];
  let current = 0;
  const statGoals = document.querySelector('.stat-goals span');
  const statNumber = document.querySelector('.stat-number span');
  const statCountry = document.querySelector('.stat-country');
  const statName = document.querySelector('.stat-name');
  const leftBtn = document.querySelector('.spotlight-btn.left');
  const rightBtn = document.querySelector('.spotlight-btn.right');
  function updatePlayer(idx, direction = 1) {
    player3d.classList.remove('show');
    player3d.classList.add(direction > 0 ? 'slide-out-left' : 'slide-out-right');
    setTimeout(() => {
      imgEl.src = players[idx].img;
      imgEl.alt = players[idx].name;
      statGoals.textContent = players[idx].goals;
      statNumber.textContent = players[idx].number;
      statCountry.textContent = players[idx].country;
      statName.textContent = players[idx].name;
      player3d.classList.remove('slide-out-left', 'slide-out-right');
      player3d.classList.add('show', direction > 0 ? 'slide-in-right' : 'slide-in-left');
      setTimeout(() => {
        player3d.classList.remove('slide-in-right', 'slide-in-left');
      }, 600);
    }, 500);
  }
  leftBtn.addEventListener('click', () => {
    const prev = (current - 1 + players.length) % players.length;
    updatePlayer(prev, -1);
    current = prev;
  });
  rightBtn.addEventListener('click', () => {
    const next = (current + 1) % players.length;
    updatePlayer(next, 1);
    current = next;
  });
  setTimeout(() => player3d.classList.add('show'), 100);
  document.querySelector('.player-spotlight-section').style.opacity = 0;
  setTimeout(() => {
    document.querySelector('.player-spotlight-section').style.transition = 'opacity 1.2s cubic-bezier(.4,2,.6,1)';
    document.querySelector('.player-spotlight-section').style.opacity = 1;
  }, 100);
});
