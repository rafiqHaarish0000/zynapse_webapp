document.addEventListener('DOMContentLoaded', function() {
    // Initialize elements
    const animatableElements = document.querySelectorAll(
        '.title-text, .subtitle, .cta-button, .floating-card'
    );

    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('title-text') || 
                    entry.target.classList.contains('subtitle') || 
                    entry.target.classList.contains('cta-button')) {
                    entry.target.classList.add('active');
                } else if (entry.target.classList.contains('floating-card')) {
                    const delay = parseInt(entry.target.style.transitionDelay || '0') * 1000;
                    setTimeout(() => {
                        entry.target.classList.add('active');
                    }, delay);
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '100px'
    });

    animatableElements.forEach(el => {
        observer.observe(el);
        if (el.classList.contains('floating-card')) {
            el.style.animationPlayState = 'paused';
        }
    });

    // Ripple Button effects
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255,255,255,0.3);
                border-radius: 50%;
                transform: scale(0);
                pointer-events: none;
                animation: ripple 0.6s ease-out;
            `;

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
            showBookingModal();
        });
    }

    // Performance optimization
    document.addEventListener('visibilitychange', () => {
        const cards = document.querySelectorAll('.floating-card');
        if (document.hidden) {
            cards.forEach(card => card.style.animationPlayState = 'paused');
        } else {
            cards.forEach(card => card.style.animationPlayState = 'running');
        }
    });

    function showBookingModal() {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        `;

        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: white;
            padding: 2rem;
            border-radius: 20px;
            text-align: center;
            max-width: 400px;
            animation: slideUp 0.3s ease;
        `;

        modalContent.innerHTML = `
            <h3 style="color: #2c5aa0; margin-bottom: 1rem;">Book a Call</h3>
            <p style="color: #666; margin-bottom: 2rem;">Ready to discuss your project? Let's chat!</p>
            <button onclick="this.closest('div[style*=\"position: fixed\"]').remove()" 
                    style="padding: 0.8rem 2rem; background: #ff6b35; color: white; border: none; border-radius: 25px; cursor: pointer;">
                Close
            </button>
        `;

        modal.appendChild(modalContent);
        document.body.appendChild(modal);

        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    }

    // Add animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            from { transform: scale(0); opacity: 1; }
            to { transform: scale(1); opacity: 0; }
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(50px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
    `;
    document.head.appendChild(style);

    // === SCROLL EFFECTS ===
    let lastScrollPosition = 0;
    const mainTitle = document.querySelector('.main-title');

    window.addEventListener('scroll', function() {
        const currentScrollPosition = window.scrollY;

        if (mainTitle) {
            // Only zoom IN when scrolling UP
            if (currentScrollPosition < lastScrollPosition) {
                // Scrolling UP
                mainTitle.style.transform = "scale(1.1)";
                mainTitle.style.transition = "transform 0.3s ease-out";
            } else {
                // Reset when scrolling DOWN
                mainTitle.style.transform = "scale(1)";
                mainTitle.style.transition = "transform 0.3s ease-out";
            }
        }

        lastScrollPosition = currentScrollPosition;
    });

    // Fade out service section smoothly
    const serviceSection = document.querySelector(".service");
    if (serviceSection) {
        window.addEventListener("scroll", () => {
            const sectionTop = serviceSection.offsetTop;
            const sectionHeight = serviceSection.offsetHeight;
            const scrollY = window.scrollY;

            const progress = (scrollY - sectionTop) / sectionHeight;
            if (progress >= 0 && progress <= 1) {
                serviceSection.style.opacity = 1 - progress;   
                serviceSection.style.transform = `translateY(${progress * 50}px)`;
            } else if (progress < 0) {
                serviceSection.style.opacity = 1;
                serviceSection.style.transform = "translateY(0px)";
            } else {
                serviceSection.style.opacity = 0;
            }
        });
    }
});
