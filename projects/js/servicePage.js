// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections for animation
document.querySelectorAll('.solution-card, .review-card, .employee-card, .brand-logo, .story-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// Add hover effects for solution cards
document.querySelectorAll('.solution-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 15px 30px rgba(102, 126, 234, 0.3)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    // Add staggered animation to hero elements
    const heroElements = document.querySelectorAll('.fade-in');
    heroElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.2}s`;
    });

    // Add parallax effect to hero section
    const heroSection = document.querySelector('.hero-section');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        if (heroSection) {
            heroSection.style.transform = `translateY(${parallax}px)`;
        }
    });

    // Add counter animation for review ratings
    const animateCounters = () => {
        const reviewRatings = document.querySelectorAll('.review-rating');
        reviewRatings.forEach(rating => {
            const finalText = rating.textContent;
            const number = parseFloat(finalText);
            if (!isNaN(number)) {
                let current = 0;
                const increment = number / 100;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= number) {
                        current = number;
                        clearInterval(timer);
                    }
                    rating.textContent = current.toFixed(1) + ' of 5';
                }, 20);
            }
        });
    };

    // Trigger counter animation when reviews section is visible
    const reviewsSection = document.querySelector('.reviews-section');
    const reviewsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                reviewsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    if (reviewsSection) {
        reviewsObserver.observe(reviewsSection);
    }

    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        setTimeout(typeWriter, 500);
    }

    // Add click tracking for solution cards
    document.querySelectorAll('.solution-card').forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            const title = this.querySelector('.solution-title').textContent;
            console.log(`User clicked on: ${title}`);
            // Add your tracking code here
        });
    });

    // Add form validation if contact forms are added later
    const validateForm = (form) => {
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#ff4444';
            } else {
                input.style.borderColor = '#ddd';
            }
        });
        
        return isValid;
    };

    // Add mobile menu toggle functionality
    const addMobileMenu = () => {
        // This function can be expanded when a navigation menu is added
        console.log('Mobile menu functionality ready');
    };

    addMobileMenu();
});