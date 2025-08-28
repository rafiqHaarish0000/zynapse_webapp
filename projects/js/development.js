/**
 * FrontRow Music Learning Tools - Clean & Professional JavaScript
 * Minimal, performance-focused interactions
 */

'use strict';

// Configuration
const CONFIG = {
    ANIMATION_DURATION: 200,
    SCROLL_THRESHOLD: 50,
    DEBOUNCE_DELAY: 16,
    VIDEO_INTERSECTION_THRESHOLD: 0.3,
    STAGGER_DELAY: 100
};

// State management
const state = {
    isScrolled: false,
    hasLoaded: false,
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
};

/**
 * Initialize application
 */
function init() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupApp);
    } else {
        setupApp();
    }
}

/**
 * Setup application features
 */
function setupApp() {
    console.log('🎵 FrontRow Tools - Initializing');
    
    // Initialize core features
    initNavigation();
    initToolItems();
    initVideoHandling();
    initScrollEffects();
    initAccessibility();
    initAOS();
    
    // Mark as loaded
    state.hasLoaded = true;
    
    console.log('✅ FrontRow Tools - Ready');
}

/**
 * Navigation functionality
 */
function initNavigation() {
    const navbar = document.querySelector('.custom-navbar');
    const backBtn = document.querySelector('.back-btn');
    
    if (navbar) {
        // Smooth navbar background transition on scroll
        window.addEventListener('scroll', debounce(() => {
            const scrolled = window.pageYOffset > CONFIG.SCROLL_THRESHOLD;
            
            if (scrolled !== state.isScrolled) {
                state.isScrolled = scrolled;
                navbar.style.background = scrolled 
                    ? 'rgba(10, 10, 10, 0.95)' 
                    : 'rgba(10, 10, 10, 0.9)';
            }
        }, CONFIG.DEBOUNCE_DELAY));
    }
    
    if (backBtn) {
        backBtn.addEventListener('click', handleBackClick);
    }
}

/**
 * Handle back button click
 */
function handleBackClick(e) {
    e.preventDefault();
    
    const btn = e.currentTarget;
    btn.style.transform = 'translateX(-4px) scale(0.95)';
    
    setTimeout(() => {
        btn.style.transform = '';
        window.history.back();
    }, CONFIG.ANIMATION_DURATION);
}

/**
 * Initialize tool item interactions
 */
function initToolItems() {
    const toolItems = document.querySelectorAll('.tool-list-item');
    
    if (!toolItems.length) return;
    
    // Staggered reveal animation
    if (!state.reducedMotion) {
        toolItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * CONFIG.STAGGER_DELAY);
        });
    }
    
    // Add interaction handlers
    toolItems.forEach(item => {
        item.addEventListener('mouseenter', handleToolItemHover);
        item.addEventListener('mouseleave', handleToolItemLeave);
        item.addEventListener('click', handleToolItemClick);
        
        // Keyboard support
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                item.click();
            }
        });
    });
}

/**
 * Handle tool item hover
 */
function handleToolItemHover(e) {
    if (state.reducedMotion) return;
    
    const item = e.currentTarget;
    const video = item.querySelector('video');
    
    // Subtle lift effect
    item.style.transform = 'translateY(-4px)';
    
    // Enhance video
    if (video) {
        video.style.transform = 'scale(1.02)';
    }
}

/**
 * Handle tool item leave
 */
function handleToolItemLeave(e) {
    if (state.reducedMotion) return;
    
    const item = e.currentTarget;
    const video = item.querySelector('video');
    
    // Reset transform
    item.style.transform = 'translateY(0)';
    
    // Reset video
    if (video) {
        video.style.transform = 'scale(1)';
    }
}

/**
 * Handle tool item click
 */
function handleToolItemClick(e) {
    const item = e.currentTarget;
    
    // Subtle click feedback
    item.style.transform = 'translateY(-2px) scale(0.98)';
    
    setTimeout(() => {
        item.style.transform = '';
    }, 150);
}

/**
 * Video handling and optimization
 */
function initVideoHandling() {
    const videos = document.querySelectorAll('video');
    
    if (!videos.length) return;
    
    videos.forEach(video => {
        // Optimize video playback
        video.addEventListener('loadeddata', () => {
            video.style.opacity = '1';
        });
        
        // Intersection observer for performance
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    const video = entry.target;
                    
                    if (entry.isIntersecting) {
                        video.play().catch(() => {
                            // Autoplay blocked, that's fine
                        });
                    } else {
                        video.pause();
                    }
                });
            },
            { threshold: CONFIG.VIDEO_INTERSECTION_THRESHOLD }
        );
        
        observer.observe(video);
        
        // Click to play/pause
        video.addEventListener('click', (e) => {
            e.stopPropagation();
            
            if (video.paused) {
                video.play();
                showToast('Playing');
            } else {
                video.pause();
                showToast('Paused');
            }
        });
    });
}

/**
 * Scroll effects
 */
function initScrollEffects() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Initialize AOS if available
 */
function initAOS() {
    if (typeof AOS !== 'undefined' && !state.reducedMotion) {
        AOS.init({
            duration: 600,
            easing: 'ease-out-cubic',
            once: true,
            offset: 100,
            delay: 50
        });
    }
}

/**
 * Accessibility features
 */
function initAccessibility() {
    // Skip link for keyboard navigation
    const skipLink = createSkipLink();
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Focus management
    document.addEventListener('focusin', (e) => {
        if (e.target.matches('a, button, [tabindex]')) {
            e.target.style.outline = '2px solid #3b82f6';
            e.target.style.outlineOffset = '2px';
        }
    });
    
    document.addEventListener('focusout', (e) => {
        if (e.target.matches('a, button, [tabindex]')) {
            e.target.style.outline = 'none';
        }
    });
    
    // Announce page changes for screen readers
    announcePageContent();
}

/**
 * Create skip link for accessibility
 */
function createSkipLink() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #3b82f6;
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 1000;
        transition: top 0.2s ease;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    return skipLink;
}

/**
 * Announce page content for screen readers
 */
function announcePageContent() {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-label', 'Page announcement');
    announcement.style.cssText = `
        position: absolute;
        left: -10000px;
        width: 1px;
        height: 1px;
        overflow: hidden;
    `;
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        announcement.textContent = 'FrontRow Music Learning Tools page loaded';
    }, 1000);
}

/**
 * Show toast notification
 */
function showToast(message, duration = 2000) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 0.25rem;
        font-size: 0.875rem;
        z-index: 1000;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.2s ease;
    `;
    
    document.body.appendChild(toast);
    
    // Animate in
    requestAnimationFrame(() => {
        toast.style.opacity = '1';
    });
    
    // Remove after duration
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, 200);
    }, duration);
}

/**
 * Utility: Debounce function
 */
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

/**
 * Handle overlay close (from original HTML)
 */
function closeOverlay() {
    const overlay = document.getElementById('mboverlay');
    if (overlay) {
        overlay.style.opacity = '0';
        overlay.style.transform = 'scale(0.95)';
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 200);
    }
}

/**
 * Cleanup function
 */
function cleanup() {
    // Remove event listeners and observers if needed
    console.log('🧹 Cleaning up...');
}

// Handle page visibility changes for performance
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Page is hidden, pause videos
        document.querySelectorAll('video').forEach(video => video.pause());
    }
});

// Initialize on load
init();

// Export for global access
window.FrontRowTools = {
    closeOverlay,
    showToast,
    debounce,
    state
};

// jQuery integration (if available)
if (typeof $ !== 'undefined') {
    $(document).ready(() => {
        // Original overlay functionality
        $('#mboverlay').on('click', '#warningbtnprim', closeOverlay);
        
        console.log('🔗 jQuery integration loaded');
    });
}
 document.addEventListener("DOMContentLoaded", () => {
    const footer = document.querySelector('.custom-footer');
    footer.classList.add('show'); // this will trigger the fade-in
  });

  document.addEventListener('DOMContentLoaded', function() {
    const pillars = document.querySelectorAll('.pillars-section .pillar');
    const connectors = document.querySelectorAll('.pillars-section .connector');
    
    // Enhanced interaction for pillars
    pillars.forEach((pillar, index) => {
        pillar.addEventListener('click', function() {
            // Create ripple effect
            const ripple = document.createElement('div');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${rect.width / 2 - size / 2}px;
                top: ${rect.height / 2 - size / 2}px;
                border-radius: 50%;
                background: rgba(13, 110, 253, 0.3);
                transform: scale(0);
                pointer-events: none;
                z-index: 2;
                animation: ripple 0.6s ease-out forwards;
            `;
            
            this.style.position = 'relative';
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.remove();
                }
            }, 600);
        });
        
        // Connector highlighting on hover
        pillar.addEventListener('mouseenter', function() {
            if (index < connectors.length) {
                connectors[index].style.backgroundColor = '#0d6efd';
                connectors[index].style.height = '3px';
            }
            if (index > 0 && connectors[index - 1]) {
                connectors[index - 1].style.backgroundColor = '#0d6efd';
                connectors[index - 1].style.height = '3px';
            }
        });
        
        pillar.addEventListener('mouseleave', function() {
            connectors.forEach(connector => {
                connector.style.backgroundColor = '#6c757d';
                connector.style.height = '2px';
            });
        });
    });
});

// Add ripple animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(1);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
  

