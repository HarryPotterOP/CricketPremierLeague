const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const BASE_MATCHES = {
  'Nov 2024': [
    {
      date: 'Thursday 7th November',
      time: '10:00 AM',
      team1: 'The Avengers',
      team2: 'Sinister Six',
      venue: 'Stamford Bridge',
      result: 'FT',
      score1: 2,
      score2: 1,
      info: 'Club Friendlies - Club Friendlies 1',
    },
    {
      date: 'Thursday 14th November',
      time: '11:00 AM',
      team1: 'Living Legends',
      team2: 'Black Panthers',
      venue: 'Anfield',
      result: 'FT',
      score1: 0,
      score2: 0,
      info: 'Club Friendlies - Club Friendlies 2',
    },
  ],
  'May 2025': [
    {
      date: 'Monday 5th May',
      time: '5:30 PM',
      team1: 'Royal Bengal Challengers',
      team2: 'Moon Knight',
      venue: 'Wembley Stadium',
      result: 'FT',
      score1: 0,
      score2: 0,
      info: 'League Match',
    },
  ],
  'Apr 2026': [
    {
      date: 'Saturday 4th April',
      time: '4:00 PM',
      team1: 'Bengal Challengers',
      team2: 'Moon Knight',
      venue: 'Eden Gardens',
      result: 'FT',
      score1: 0,
      score2: 0,
    },
  ],
  'May 2026': [],
  'Jun 2026': [],
  'Jul 2026': [],
  'Aug 2026': [],
  'Sep 2026': [],
  'Oct 2026': [],
  'Nov 2026': [],
  'Dec 2026': [],
  'Jan 2027': [],
  'Feb 2027': [],
  'Mar 2027': [],
  'Apr 2027': [],
};
let matchesData = BASE_MATCHES;
function reloadMatchesData() {
  matchesData = BASE_MATCHES;
}
function formatDateForCard(d) {
  if (!d) return '';
  return d.replace(/\b(\d+)(st|nd|rd|th)\b/gi, '$1<sup>$2</sup>');
}
function isMatchScheduled(m) {
  return m && !m.result || m.result === 'Scheduled' || m.result === 'Postponed';
}
function renderMatches() {
  const container = document.getElementById('matches-container');
  if (!container) return;
  const selectedChip = document.querySelector('.month-chip.selected');
  const monthKey = selectedChip ? selectedChip.getAttribute('data-month') : 'Apr 2026';
  const month = matchesData[monthKey] || [];
  container.innerHTML = '';
  if (month.length === 0) {
    container.innerHTML = `
      <div class="no-matches">
        <p>No matches scheduled for ${monthKey}</p>
      </div>
    `;
    return;
  }
  month.forEach((m) => {
    const matchCard = document.createElement('div');
    matchCard.className = 'match-card';
    const scheduled = isMatchScheduled(m);
    const hasScore = !scheduled && m.score1 !== undefined && m.score2 !== undefined;
    matchCard.innerHTML = `
      <div class="match-header">
        <span class="match-date">${formatDateForCard(m.date)}</span>
        <span class="match-time">${m.time || ''}</span>
        ${m.venue ? `<span class="match-venue">${m.venue}</span>` : ''}
      </div>
      <div class="match-body">
        <div class="team home-team">
          <span class="team-name">${m.team1 || 'Team 1'}</span>
        </div>
        <div class="match-score">
          ${hasScore 
            ? `<span class="score">${m.score1}</span><span class="separator">-</span><span class="score">${m.score2}</span>`
            : `<span class="vs-badge">VS</span>`
          }
        </div>
        <div class="team away-team">
          <span class="team-name">${m.team2 || 'Team 2'}</span>
        </div>
      </div>
      <div class="match-footer">
        <span class="match-status ${scheduled ? 'scheduled' : 'completed'}">${m.result || 'Scheduled'}</span>
      </div>
    `;
    container.appendChild(matchCard);
  });
}
function displayMatches(monthKey) {
  renderMatches();
}
function resolveTodayMonthForTabs(keys) {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = MONTHS_SHORT[now.getMonth()];
  const currentKey = `${currentMonth} ${currentYear}`;
  if (keys.includes(currentKey)) {
    return { key: currentKey, note: '' };
  }
  const futureKeys = keys.filter(k => {
    const [month, year] = k.split(' ');
    const yearNum = parseInt(year);
    const monthIdx = MONTHS_SHORT.indexOf(month);
    return yearNum > currentYear || (yearNum === currentYear && monthIdx > now.getMonth());
  });
  if (futureKeys.length > 0) {
    return { key: futureKeys[0], note: 'Upcoming' };
  }
  return { key: keys[keys.length - 1], note: 'Latest' };
}
function selectMonthChipByKey(key) {
  const monthsContainer = document.getElementById('months-container');
  if (!monthsContainer) return;
  monthsContainer.querySelectorAll('[data-month]').forEach((el) => el.classList.remove('selected'));
  const monthEl = monthsContainer.querySelector(`[data-month="${key}"]`);
  if (monthEl) {
    monthEl.classList.add('selected');
    renderMatches();
  }
}
function buildMonthTabs() {
  const container = document.getElementById('months-container');
  if (!container) return;
  const keys = Object.keys(matchesData).sort((a, b) => {
    const [ma, ya] = a.split(' ');
    const [mb, yb] = b.split(' ');
    return parseInt(ya) - parseInt(yb) || MONTHS_SHORT.indexOf(ma) - MONTHS_SHORT.indexOf(mb);
  });
  container.innerHTML = '';
  keys.forEach((key) => {
    const chip = document.createElement('button');
    chip.className = 'month-chip';
    chip.setAttribute('data-month', key);
    chip.textContent = key;
    chip.addEventListener('click', () => {
      container.querySelectorAll('[data-month]').forEach((el) => el.classList.remove('selected'));
      chip.classList.add('selected');
      renderMatches();
    });
    container.appendChild(chip);
  });
  const { key, note } = resolveTodayMonthForTabs(keys);
  selectMonthChipByKey(key);
  renderMatches();
}
function updateViewHint(note) {
  const hint = document.getElementById('view-hint');
  if (hint) hint.textContent = note;
}
function init() {
  reloadMatchesData();
  buildMonthTabs();
  setupTabButtons();
}
function setupTabButtons() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => {
        b.classList.remove('selected');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('selected');
      btn.setAttribute('aria-selected', 'true');
      const tab = btn.getAttribute('data-tab');
      if (tab === 'today') {
        showTodayMatches();
      } else {
        const keys = Object.keys(matchesData).sort((a, b) => {
          const [ma, ya] = a.split(' ');
          const [mb, yb] = b.split(' ');
          return parseInt(ya) - parseInt(yb) || MONTHS_SHORT.indexOf(ma) - MONTHS_SHORT.indexOf(mb);
        });
        const { key } = resolveTodayMonthForTabs(keys);
        selectMonthChipByKey(key);
        const hint = document.getElementById('scoreboard-view-hint');
        if (hint) {
          hint.hidden = true;
          hint.textContent = '';
        }
      }
    });
  });
}
function showTodayMatches() {
  const now = new Date();
  const currentMonth = MONTHS_SHORT[now.getMonth()];
  const currentYear = now.getFullYear();
  const currentKey = `${currentMonth} ${currentYear}`;
  const todayStr = now.toLocaleDateString('en-GB', { 
    weekday: 'long', 
    day: 'numeric',
    month: 'long'
  });
  if (matchesData[currentKey]) {
    selectMonthChipByKey(currentKey);
    const container = document.getElementById('matches-container');
    if (!container) return;
    const todayMatches = matchesData[currentKey].filter(m => {
      if (!m.date) return false;
      const matchDay = parseInt(m.date.match(/\d+/)?.[0] || 0);
      return matchDay === now.getDate();
    });
    if (todayMatches.length > 0) {
      container.innerHTML = '';
      todayMatches.forEach((m) => {
        const matchCard = document.createElement('div');
        matchCard.className = 'match-card';
        const scheduled = isMatchScheduled(m);
        const hasScore = !scheduled && m.score1 !== undefined && m.score2 !== undefined;
        matchCard.innerHTML = `
          <div class="match-header">
            <span class="match-date">${formatDateForCard(m.date)}</span>
            <span class="match-time">${m.time || ''}</span>
            ${m.venue ? `<span class="match-venue">${m.venue}</span>` : ''}
          </div>
          <div class="match-body">
            <div class="team home-team">
              <span class="team-name">${m.team1 || 'Team 1'}</span>
            </div>
            <div class="match-score">
              ${hasScore 
                ? `<span class="score">${m.score1}</span><span class="separator">-</span><span class="score">${m.score2}</span>`
                : `<span class="vs-badge">VS</span>`
              }
            </div>
            <div class="team away-team">
              <span class="team-name">${m.team2 || 'Team 2'}</span>
            </div>
          </div>
          <div class="match-footer">
            <span class="match-status ${scheduled ? 'scheduled' : 'completed'}">${m.result || 'Scheduled'}</span>
          </div>
        `;
        container.appendChild(matchCard);
      });
      const hint = document.getElementById('scoreboard-view-hint');
      if (hint) {
        hint.textContent = `Showing matches for today (${todayStr})`;
        hint.hidden = false;
      }
    } else {
      const container = document.getElementById('matches-container');
      if (container) {
        container.innerHTML = `
          <div class="no-matches">
            <p>No matches scheduled for today (${todayStr})</p>
            <p>Showing matches for ${currentKey} instead</p>
          </div>
        `;
      }
      const hint = document.getElementById('scoreboard-view-hint');
      if (hint) {
        hint.textContent = `No matches today - showing ${currentKey}`;
        hint.hidden = false;
      }
    }
  } else {
    const container = document.getElementById('matches-container');
    if (container) {
      container.innerHTML = `
        <div class="no-matches">
          <p>No data available for ${currentKey}</p>
          <p>Please select a different month</p>
        </div>
      `;
    }
    const hint = document.getElementById('scoreboard-view-hint');
    if (hint) {
      hint.textContent = `No data for ${currentKey}`;
      hint.hidden = false;
    }
  }
}
document.addEventListener('DOMContentLoaded', function() {
  init();
});
