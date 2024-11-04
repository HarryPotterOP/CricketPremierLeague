const players = [
    { number: 1, position: 'GK', top: 90, left: 50 },
    { number: 2, position: 'DF', top: 70, left: 20 },
    { number: 3, position: 'DF', top: 70, left: 50 },
    { number: 4, position: 'DF', top: 70, left: 80 },
    { number: 5, position: 'MF', top: 50, left: 25 },
    { number: 6, position: 'MF', top: 50, left: 50 },
    { number: 7, position: 'MF', top: 50, left: 75 },
    { number: 8, position: 'FW', top: 30, left: 33 },
    { number: 9, position: 'FW', top: 30, left: 67 },
    { number: 10, position: 'FW', top: 10, left: 50 }
];

const teamLineup = document.getElementById('team-lineup');

players.forEach(player => {
    const playerDiv = document.createElement('div');
    playerDiv.classList.add('player');
    playerDiv.style.top = `${player.top}%`;
    playerDiv.style.left = `${player.left}%`;
    playerDiv.style.transform = 'translate(-50%, -50%)';
    playerDiv.innerText = player.number;
    teamLineup.appendChild(playerDiv);
});
