document.addEventListener("DOMContentLoaded", () => {
    const fadeInElements = document.querySelectorAll('.fade-in');
    const observerOptions = { threshold: 0.1 };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeInElements.forEach(element => {
        observer.observe(element);
    });

    const slider = document.querySelector('.slider');
    let angle = 0;

    function rotateSlider() {
        angle += 0.5;
        slider.style.transform = `perspective(1000px) rotateX(-16deg) rotateY(${angle}deg)`;
        requestAnimationFrame(rotateSlider);
    }
    rotateSlider();

    const form = document.getElementById('dimensionForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const quantity = document.getElementById('physicalQuantity').value.trim().toLowerCase();
        const dimensions = {
            force: 'M¹L¹T⁻²',
            velocity: 'L¹T⁻¹',
            acceleration: 'L¹T⁻²',
            energy: 'M¹L²T⁻²',
            pressure: 'M¹L⁻¹T⁻²',
            power: 'M¹L²T⁻³',
            momentum: 'M¹L¹T⁻¹',
            density: 'M¹L⁻³',
            area: 'L²',
            volume: 'L³'
        };
        document.getElementById('result').textContent = dimensions[quantity] 
            ? `Dimension of ${quantity}: ${dimensions[quantity]}` 
            : 'Dimension not found. Try another physical quantity.';
        form.reset();
    });
});
