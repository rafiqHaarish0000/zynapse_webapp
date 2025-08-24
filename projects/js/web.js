// ===== INITIALIZE AOS (ANIMATE ON SCROLL) =====
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 1000,
        easing: 'ease-out',
        once: true,
        offset: 100
    });
});

// ===== PAGE LOADER =====
window.addEventListener('load', function() {
    const loader = document.getElementById('pageLoader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 1500);
});

// ===== CUSTOM CURSOR =====
// function initCustomCursor() {
//     const cursor = document.getElementById('customCursor');
//     const links = document.querySelectorAll('a, button, .point-number, video, img, .morework-item');

//     // Show cursor on mouse move
//     document.addEventListener('mousemove', (e) => {
//         cursor.style.left = e.clientX + 'px';
//         cursor.style.top = e.clientY + 'px';
//         cursor.classList.add('active');
//     });

//     // Hide cursor when mouse leaves window
//     document.addEventListener('mouseleave', () => {
//         cursor.classList.remove('active');
//     });

//     // Add hover effects for interactive elements
//     links.forEach(link => {
//         link.addEventListener('mouseenter', () => {
//             cursor.classList.add('hover');
//         });
        
//         link.addEventListener('mouseleave', () => {
//             cursor.classList.remove('hover');
//         });
//     });
// }

// Initialize cursor after DOM loads
document.addEventListener('DOMContentLoaded', initCustomCursor);

// ===== BACK BUTTON FUNCTION =====
function goBack() {
    const backBtn = document.querySelector('.back-btn');
    if (backBtn) {
        backBtn.style.transform = 'translateX(-10px) scale(0.95)';
        
        setTimeout(() => {
            backBtn.style.transform = '';
            window.history.back();
        }, 200);
    }
}

// ===== SMOOTH SCROLLING FOR ANCHOR LINKS =====
// function initSmoothScrolling() {
//     document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//         anchor.addEventListener('click', function (e) {
//             e.preventDefault();
//             const target = document.querySelector(this.getAttribute('href'));
//             if (target) {
//                 target.scrollIntoView({
//                     behavior: 'smooth',
//                     block: 'start'
//                 });
//             }
//         });
//     });
// }

// document.addEventListener('DOMContentLoaded', initSmoothScrolling);

// ===== PARALLAX EFFECT FOR HERO SECTION =====
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.getElementById('csprohero');
        if (hero) {
            // Subtle parallax effect
            hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });
}

document.addEventListener('DOMContentLoaded', initParallax);

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                // Add custom animation class for enhanced effects
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all animated elements
    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });
}

document.addEventListener('DOMContentLoaded', initIntersectionObserver);

// ===== DYNAMIC BACKGROUND COLORS FOR SECTIONS =====
function initDynamicNavbar() {
    const sections = document.querySelectorAll('.site-section');
    const navBar = document.querySelector('.custom-navbar');

    if (!navBar || sections.length === 0) return;

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionClasses = entry.target.classList;
                if (sectionClasses.contains('blackbg')) {
                    navBar.style.background = 'rgba(10, 20, 30, 0.9)';
                    navBar.style.color = '#fff';
                } else if (sectionClasses.contains('lgraybg')) {
                    navBar.style.background = 'rgba(248, 249, 250, 0.9)';
                    navBar.style.color = '#333';
                } else {
                    navBar.style.background = 'rgba(28, 30, 45, 0.9)';
                    navBar.style.color = '#fff';
                }
            }
        });
    }, { threshold: 0.5 });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

document.addEventListener('DOMContentLoaded', initDynamicNavbar);

// ===== ENHANCED VIDEO INTERACTIONS =====
function initVideoInteractions() {
    const videos = document.querySelectorAll('video');
    const videoPlaceholders = document.querySelectorAll('.video-placeholder');

    [...videos, ...videoPlaceholders].forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.transform = 'scale(1.05) translateY(-10px)';
            element.style.boxShadow = '0 30px 80px rgba(205, 169, 84, 0.4)';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'scale(1) translateY(0)';
            element.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.3)';
        });
    });
}

document.addEventListener('DOMContentLoaded', initVideoInteractions);

// ===== TYPING EFFECT FOR HERO TITLE =====
function typeWriter(element, text, speed = 80) {
    let i = 0;
    element.innerHTML = '';
    
    function typing() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typing, speed);
        }
    }
    typing();
}

function initTypingEffect() {
    const heroTitle = document.querySelector('.text-header');
    if (!heroTitle) return;

    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.typed) {
                const originalText = entry.target.textContent;
                typeWriter(entry.target, originalText, 60);
                entry.target.dataset.typed = 'true';
            }
        });
    }, { threshold: 0.5 });

    heroObserver.observe(heroTitle);
}

document.addEventListener('DOMContentLoaded', initTypingEffect);

// ===== FLOATING PARTICLES =====
function createParticle() {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: var(--primary-gold);
        border-radius: 50%;
        pointer-events: none;
        opacity: 0.5;
        left: ${Math.random() * 100}vw;
        top: 100vh;
        z-index: 1;
    `;
    
    document.body.appendChild(particle);
    
    const animation = particle.animate([
        { transform: 'translateY(0)', opacity: 0 },
        { transform: 'translateY(-20vh)', opacity: 0.5 },
        { transform: 'translateY(-100vh)', opacity: 0 }
    ], {
        duration: Math.random() * 3000 + 2000,
        easing: 'linear'
    });
    
    animation.onfinish = () => {
        if (particle.parentNode) {
            particle.remove();
        }
    };
}

function initFloatingParticles() {
    // Create particles periodically
    setInterval(createParticle, 500);
}

document.addEventListener('DOMContentLoaded', initFloatingParticles);

// ===== ENHANCED SCROLL-TRIGGERED ANIMATIONS =====
function initScrollAnimations() {
    window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        
        // Update progress indicator if exists
        const progressBar = document.querySelector('.scroll-progress');
        if (progressBar) {
            progressBar.style.width = scrollPercent + '%';
        }

        // Add scroll-based transformations
        const scrollElements = document.querySelectorAll('.point-number');
        scrollElements.forEach((element, index) => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.transform = `translateY(0) rotate(${index * 5}deg)`;
                element.style.opacity = '1';
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', initScrollAnimations);

// ===== ENHANCED BUTTON INTERACTIONS =====
function initButtonInteractions() {
    const buttons = document.querySelectorAll('.cta-redirect, .story-type p, .story-year p');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
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
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                pointer-events: none;
                z-index: 1;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            const animation = ripple.animate([
                { transform: 'scale(0)', opacity: 1 },
                { transform: 'scale(1)', opacity: 0 }
            ], {
                duration: 600,
                easing: 'ease-out'
            });
            
            animation.onfinish = () => {
                if (ripple.parentNode) {
                    ripple.remove();
                }
            };
        });
    });
}

document.addEventListener('DOMContentLoaded', initButtonInteractions);

// ===== ENHANCED HOVER EFFECTS FOR CARDS =====
function initCardHoverEffects() {
    const cards = document.querySelectorAll('.morework-item, .point-number');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

document.addEventListener('DOMContentLoaded', initCardHoverEffects);

// ===== PERFORMANCE OPTIMIZATION =====
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// Optimize scroll events
const optimizedScrollHandler = debounce(() => {
    // Scroll-based animations here
    const scrolled = window.pageYOffset;
    
    // Update any scroll-dependent elements
    const hero = document.getElementById('csprohero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);

// ===== ACCESSIBILITY ENHANCEMENTS =====
function initAccessibility() {
    // Add focus indicators for keyboard navigation
    const focusableElements = document.querySelectorAll('a, button, [tabindex]');
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', () => {
            element.style.outline = '2px solid var(--primary-gold)';
            element.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', () => {
            element.style.outline = 'none';
        });
    });

    // Add reduced motion support
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
        // Disable animations for users who prefer reduced motion
        document.documentElement.style.setProperty('--animation-duration', '0s');
    }
}

document.addEventListener('DOMContentLoaded', initAccessibility);

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // Graceful fallback - ensure basic functionality still works
});

// ===== INITIALIZE ALL FEATURES =====
function initializeApp() {
    console.log('🚀 CoinSwitch Pro Enhanced - Initializing...');
    
    // Check if all required DOM elements exist
    const requiredElements = ['#pageLoader', '#customCursor', '.custom-navbar'];
    const missingElements = requiredElements.filter(selector => !document.querySelector(selector));
    
    if (missingElements.length > 0) {
        console.warn('⚠️ Missing required elements:', missingElements);
    }
    
    console.log('✅ CoinSwitch Pro Enhanced - All systems loaded!');
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initializeApp);

// ===== EXPORT FUNCTIONS FOR GLOBAL ACCESS =====
window.CoinSwitchPro = {
    goBack,
    createParticle,
    typeWriter,
    initCustomCursor,
    initSmoothScrolling,
    initParallax
};