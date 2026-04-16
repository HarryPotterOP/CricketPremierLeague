
function goalsData() {
  return CPL_CONTENT.mergeFootballGoals(CPL_CONTENT.defaultFootballGoals());
}
function updateGoalDisplay() {
  const data = goalsData();
  Object.keys(data).forEach((playerId) => {
    const el = document.getElementById(`goals-${playerId}`);
    if (el) {
      el.textContent = data[playerId];
    }
  });
}
function init() {
  updateGoalDisplay();
  window.addEventListener('storage', (e) => {
    if (e.key === CPL_CONTENT.FOOTBALL_GOALS_KEY) {
      updateGoalDisplay();
    }
  });
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
