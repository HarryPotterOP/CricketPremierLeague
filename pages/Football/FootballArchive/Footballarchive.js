document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.player-card').forEach((card, i) => {
    card.style.animationDelay = (i * 0.2) + 's';
  });
});