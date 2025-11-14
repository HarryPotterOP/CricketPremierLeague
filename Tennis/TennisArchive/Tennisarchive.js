document.addEventListener('DOMContentLoaded', function () {
  // Animate player cards in view
  document.querySelectorAll('.player-card').forEach((card, i) => {
    card.style.animationDelay = (i * 0.2) + 's';
  });
});