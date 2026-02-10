document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const btn = document.querySelector('button[aria-controls="mobile-menu"]');
    const menu = document.querySelector('#mobile-menu');

    btn.addEventListener('click', () => {
        const expanded = btn.getAttribute('aria-expanded') === 'true' || false;
        btn.setAttribute('aria-expanded', !expanded);
        menu.classList.toggle('hidden');
    });

    // Generic smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            menu.classList.add('hidden'); // Close mobile menu on click
            btn.setAttribute('aria-expanded', 'false');

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar scroll effect & Back to Top visibility
    const navbar = document.getElementById('navbar');
    const backToTopBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 0) {
            navbar.classList.add('shadow-md');
            navbar.classList.replace('bg-white/80', 'bg-white/95');
        } else {
            navbar.classList.remove('shadow-md');
            navbar.classList.replace('bg-white/95', 'bg-white/80');
        }

        // Back to Top Button Logic
        if (window.scrollY > 500) {
            backToTopBtn.classList.remove('translate-y-20', 'opacity-0');
        } else {
            backToTopBtn.classList.add('translate-y-20', 'opacity-0');
        }
    });

    // Back to Top Click Event
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
