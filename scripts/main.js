document.addEventListener("DOMContentLoaded", () => {
    // 1. Splash Screen Fade Out & Redirect
    const splash = document.getElementById('splash');
    const mainContent = document.getElementById('main-content');
    
    if (splash && mainContent) {
        // Typing animation is 1.6s. Let's show the completed text for 0.4s before fading out.
        const redirectDelay = 2000; 
        
        setTimeout(() => {
            splash.style.opacity = '0';
            splash.style.pointerEvents = 'none';
            
            // Show main content immediately to start layout calculation
            mainContent.classList.remove('hidden');
            mainContent.classList.add('fade-in');
            
            // Clean up the splash overlay from DOM after fade completes
            splash.addEventListener('transitionend', () => {
                splash.remove();
            });
        }, redirectDelay);
    } else {
        // Fallback if elements are missing
        if (mainContent) {
            mainContent.classList.remove('hidden');
            mainContent.classList.add('fade-in');
        }
    }

    // 2. Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 3. Reveal Animation for Sections
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Animates once
            }
        });
    }, observerOptions);

    // Apply class for layout and observe each section
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('section-animate');
        sectionObserver.observe(section);
    });

    // 4. Mobile Menu Functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                if (navLinks.classList.contains('active')) {
                    icon.className = 'fa-solid fa-xmark';
                } else {
                    icon.className = 'fa-solid fa-bars';
                }
            }
        });

        // Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) icon.className = 'fa-solid fa-bars';
            });
        });
    }
});
