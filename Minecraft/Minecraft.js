window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        let loadProgress = 0;
        const loaderBar = document.querySelector('.loader-bar');
        const interval = setInterval(() => {
            loadProgress += 20;
            if (loaderBar) loaderBar.style.width = loadProgress + '%';
            if (loadProgress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    preloader.style.animation = 'fadeOut 0.5s ease-out';
                    setTimeout(() => {
                        preloader.style.display = 'none';
                    }, 500);
                }, 200);
            }
        }, 200);
    }

    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) currentYearSpan.textContent = new Date().getFullYear();

    const animatedElements = document.querySelectorAll('.animate');
    if ("IntersectionObserver" in window) {
        let observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    entry.target.style.animation = `fadeIn 1s ease-out, slideIn 1s ease-out`;
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        animatedElements.forEach(element => observer.observe(element));
    } else {
        animatedElements.forEach(element => {
            element.classList.add('visible');
            element.style.animation = `fadeIn 1s ease-out, slideIn 1s ease-out`;
        });
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (this.getAttribute('href') !== "#") {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
                targetElement.style.animation = `highlight 1s ease-in-out, fadeIn 1s ease-out`;
            }
        }
    });
});


