document.addEventListener('DOMContentLoaded', () => {
    const headers = document.querySelectorAll('.season h3');

    headers.forEach(header => {
        header.style.cursor = 'pointer';
        const table = header.nextElementSibling;
        const content = table.nextElementSibling;

        if (table && table.tagName === 'TABLE') {
            table.style.display = 'none';
            header.addEventListener('click', () => {
                table.style.display = (table.style.display === 'none') ? 'table' : 'none';
            });
        }
    });

    const navLinks = document.querySelectorAll("nav a");
    navLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            if (this.getAttribute("href").startsWith("#")) {
                e.preventDefault();
                document.querySelector(this.getAttribute("href")).scrollIntoView({
                    behavior: "smooth"
                });
            }
        });
    });
});