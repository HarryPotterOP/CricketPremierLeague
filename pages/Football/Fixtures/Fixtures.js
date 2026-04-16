
document.addEventListener('DOMContentLoaded', () => {
    const matchCards = document.querySelectorAll('.match-card');
    matchCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
    const standingsRows = document.querySelectorAll('.standings-row');
    standingsRows.forEach((row, index) => {
        row.style.animationDelay = `${index * 0.15}s`;
    });
});
