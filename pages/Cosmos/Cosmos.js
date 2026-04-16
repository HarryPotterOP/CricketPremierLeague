document.addEventListener('DOMContentLoaded', () => {
    const starsContainer = document.getElementById('stars-container');
    const starCount = 200;
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        const size = Math.random() * 2 + 1;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = Math.random() * 3 + 2;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.animationDelay = `${delay}s`;
        star.style.animationDuration = `${duration}s`;
        starsContainer.appendChild(star);
    }
    const revealElements = document.querySelectorAll('[data-reveal]');
    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.9;
        revealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            if (elTop < triggerBottom) {
                el.classList.add('revealed');
            }
        });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check
    const header = document.querySelector('.cosmos-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '1rem 0';
            header.style.background = 'rgba(1, 4, 9, 0.9)';
        } else {
            header.style.padding = '1.5rem 0';
            header.style.background = 'rgba(1, 4, 9, 0.8)';
        }
    });
    const cards = document.querySelectorAll('.realm-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const glow = card.querySelector('.realm-glow');
            glow.style.left = `${x}px`;
            glow.style.top = `${y}px`;
        });
    });
    if (typeof SESSION_MANAGER !== 'undefined') {
        const path = window.location.pathname;
        const depth = path.split('/pages/')[1].split('/').filter(Boolean).length;
        const redirectPath = '../'.repeat(depth) + 'index.html';
    }
});
