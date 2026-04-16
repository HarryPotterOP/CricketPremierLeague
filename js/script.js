let scroll;
function initScroll() {
    const mainEl = document.querySelector('#main');
    if (!mainEl) return;
    scroll = new LocomotiveScroll({
        el: mainEl,
        smooth: true
    });
}
window.addEventListener('load', () => {
    initScroll();
    setTimeout(() => {
        if (scroll) scroll.update();
    }, 500);
});
function loaderAnimation() {
    if (typeof LOADER_MANAGER !== 'undefined') {
        return;
    }
    const loader = document.querySelector("#loader");
    if (loader && loader.style.display !== 'none') {
        setTimeout(() => {
            loader.style.top = "-100%";
        }, 4200);
    }
}
loaderAnimation();
const elems = document.querySelectorAll(".elem");
const fixedImage = document.querySelector("#fixed-image");
elems.forEach(elem => {
    elem.addEventListener("mouseenter", () => {
        const imageUrl = elem.dataset.image;
        if (fixedImage) {
            fixedImage.style.backgroundImage = `url(${imageUrl})`;
            fixedImage.style.display = "block";
        }
    });
    elem.addEventListener("mouseleave", () => {
        if (fixedImage) fixedImage.style.display = "none";
    });
});
function toggleUserMenu() {
    const dropdown = document.getElementById('user-dropdown');
    if (dropdown) {
        dropdown.classList.toggle('dropdown-hidden');
        dropdown.classList.toggle('dropdown-visible');
    }
}
document.addEventListener('click', (e) => {
    const menu = document.getElementById('user-menu-nav');
    const dropdown = document.getElementById('user-dropdown');
    if (menu && dropdown && !menu.contains(e.target)) {
        dropdown.classList.add('dropdown-hidden');
        dropdown.classList.remove('dropdown-visible');
    }
});
function updateClock() {
    const timeEl = document.getElementById('current-time');
    const dateEl = document.getElementById('current-date');
    if (!timeEl || !dateEl) return;
    const now = new Date();
    timeEl.textContent = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    dateEl.textContent = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}
function initFeatureCards() {
    const cards = document.querySelectorAll('.feature-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 30;
            const rotateY = (centerX - x) / 30;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(4px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)';
        });
    });
}
window.addEventListener('DOMContentLoaded', () => {
    updateClock();
    setInterval(updateClock, 1000);
    initFeatureCards();
});
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector(".mySwiper")) {
        new Swiper(".mySwiper", {
            slidesPerView: "auto",
            freeMode: true,
            spaceBetween: 20
        });
    }
});
