const scoreboardCarousel = document.querySelector('.scoreboard-carousel');
const scoreboardWrapper = document.querySelector('.scoreboard-wrapper');

let isDragging = false;
let startX, scrollLeft;

scoreboardCarousel.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX - scoreboardCarousel.offsetLeft;
    scrollLeft = scoreboardCarousel.scrollLeft;
});

scoreboardCarousel.addEventListener('mouseleave', () => {
    isDragging = false;
});

scoreboardCarousel.addEventListener('mouseup', () => {
    isDragging = false;
});

scoreboardCarousel.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scoreboardCarousel.offsetLeft;
    const walk = (x - startX) * 2; // scroll-fast
    scoreboardCarousel.scrollLeft = scrollLeft - walk;
});
