document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       1. Ninja Sword Slash Intro Animation
       ========================================== */
    const introOverlay = document.getElementById('intro');
    const mainContent = document.getElementById('main-content');

    // Prevent scrolling during intro
    document.body.style.overflow = 'hidden';

    // Start intro sequence after a tiny delay
    setTimeout(() => {
        // Step 1: Sword Slash
        introOverlay.classList.add('animate-slash');

        // Step 2: Screen Splits Open (0.8s after slash starts)
        setTimeout(() => {
            introOverlay.classList.add('animate-split');

            // Step 3: Fade in main content
            mainContent.classList.add('visible');

            // Allow scrolling again
            document.body.style.overflow = 'auto';
            document.body.style.overflowX = 'hidden'; // Keep horizontal hidden

            // Clean up DOM 
            setTimeout(() => {
                introOverlay.style.display = 'none';
            }, 1200);

        }, 800);

    }, 300);

    /* ==========================================
       2. Dark/Light Theme Toggle
       ========================================== */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const icon = themeToggleBtn.querySelector('i');

    // Check saved theme or default to dark
    let currentTheme = localStorage.getItem('theme') || 'dark';
    document.body.setAttribute('data-theme', currentTheme);
    updateToggleIcon(currentTheme);

    themeToggleBtn.addEventListener('click', () => {
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.body.setAttribute('data-theme', currentTheme);
        localStorage.setItem('theme', currentTheme);
        updateToggleIcon(currentTheme);
    });

    function updateToggleIcon(theme) {
        if (theme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun'); // Show sun icon to toggle TO light
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon'); // Show moon icon to toggle TO dark
        }
    }

    /* ==========================================
       3. Scroll Reveal Animations
       ========================================== */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once it's visible
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in-scroll');
    fadeElements.forEach(el => observer.observe(el));

    /* ==========================================
       4. Custom Cursor
       ========================================== */
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    // Only run custom cursor logic if it's a device that uses a mouse (not touch)
    if (window.matchMedia("(pointer: fine)").matches) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            // Animate outline for smooth trailing effect
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: 'forwards' });
        });
    }

    /* ==========================================
       5. Copy Email to Clipboard
       ========================================== */
    const sayHelloBtn = document.getElementById('say-hello-btn');
    const toast = document.getElementById('toast');

    if (sayHelloBtn) {
        sayHelloBtn.addEventListener('click', () => {
            const email = sayHelloBtn.getAttribute('data-email');

            // Write to clipboard
            navigator.clipboard.writeText(email).then(() => {
                // Show toast
                toast.classList.add('show');

                // Hide toast after 3 seconds
                setTimeout(() => {
                    toast.classList.remove('show');
                }, 3000);
            }).catch(err => {
                console.error("Failed to copy email: ", err);
                // Fallback for older browsers
                window.location.href = `mailto:${email}`;
            });
        });
    }
});
