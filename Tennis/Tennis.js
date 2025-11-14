document.addEventListener('DOMContentLoaded', function () {
  const players = [
    {
      name: 'Gaming Elite',
      img: '../../images/Elite.jpg',
      goals: 0,
      number: 5,
      country: '🇮🇳 India',
    },
    {
      name: 'King Kohli',
      img: '../../images/ViratKohli.jpg',
      goals: 0,
      number: 7,
      country: '🇮🇳 India',
    },
    {
      name: 'Arise',
      img: '../../images/Giyuu.webp',
      goals: 0,
      number: 11,
      country: '🇮🇳 India',
    },
    {
      name: 'Black Adam',
      img: '../../images/Boruto.jpg',
      goals: 0,
      number: 1,
      country: '🇮🇳 India',
    },
    {
      name: 'Mathematics',
      img: 'https://static2.srcdn.com/wordpress/wp-content/uploads/2017/05/Tom-Holland-as-Peter-Parker-in-Spider-Man-Homecoming.jpg',
      goals: 0,
      number: 15,
      country: '🇮🇳 India',
    },
  ];

  let current = 0;
  const imgEl = document.querySelector('.player-3d-img');
  const statGoals = document.querySelector('.stat-goals span');
  const statNumber = document.querySelector('.stat-number span');
  const statCountry = document.querySelector('.stat-country');
  const statName = document.querySelector('.stat-name');
  const leftBtn = document.querySelector('.spotlight-btn.left');
  const rightBtn = document.querySelector('.spotlight-btn.right');
  const player3d = document.querySelector('.player-3d-container');

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
