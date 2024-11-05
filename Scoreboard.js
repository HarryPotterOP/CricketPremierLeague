const matchesData = {
    "Jul 2024": [
        { date: "Wednesday 31st July", info: "Club Friendlies - Club Friendlies 1", team1: "Barcelona", score1: 2, team2: "Manchester City", score2: 2, result: "Barcelona win 4-1 on pens" },
        { date: "Saturday 27th July", info: "Club Friendlies - Club Friendlies 1", team1: "Manchester City", score1: 2, team2: "AC Milan", score2: 3, result: "FT" },
        { date: "Wednesday 24th July", info: "Club Friendlies - Club Friendlies 1", team1: "Manchester City", score1: 3, team2: "Celtic", score2: 4, result: "FT" }
    ],
    "Aug 2024": [
        { date: "Saturday 10th August", info: "Club Friendlies - Club Friendlies 2", team1: "Real Madrid", score1: 1, team2: "Chelsea", score2: 1, result: "FT" },
        { date: "Wednesday 14th August", info: "Club Friendlies - Club Friendlies 2", team1: "Liverpool", score1: 0, team2: "Bayern Munich", score2: 2, result: "FT" }
    ],
    "Sep 2024": [
        { date: "Monday 2nd September", info: "League Match", team1: "Arsenal", score1: 2, team2: "Manchester United", score2: 3, result: "FT" }
    ]
};

const matchesContainer = document.getElementById('matches-container');

function displayMatches(month) {
    matchesContainer.innerHTML = '';
    const matches = matchesData[month] || [];
    
    if (matches.length === 0) {
        matchesContainer.innerHTML = '<div class="no-matches">No matches available for this month.</div>';
        return;
    }
    
    matches.forEach(match => {
        const matchElement = document.createElement('div');
        matchElement.classList.add('match');
        matchElement.innerHTML = `
            <div class="date">${match.date}</div>
            <div class="info">${match.info}</div>
            <div class="teams">
                <span>${match.team1}</span>
                <span class="score">${match.score1}</span>
                <span>-</span>
                <span class="score">${match.score2}</span>
                <span>${match.team2}</span>
            </div>
            <div class="result">${match.result}</div>
        `;
        matchesContainer.appendChild(matchElement);
    });
}

document.querySelectorAll('.tabs div').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.tabs div').forEach(el => el.classList.remove('selected'));
        tab.classList.add('selected');
        displayMatches(document.querySelector('.months .selected').getAttribute('data-month'));
    });
});

document.querySelectorAll('.months div').forEach(month => {
    month.addEventListener('click', () => {
        document.querySelectorAll('.months div').forEach(el => el.classList.remove('selected'));
        month.classList.add('selected');
        displayMatches(month.getAttribute('data-month'));
    });
});

displayMatches("Jul 2024");
