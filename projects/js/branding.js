/**
 * Zero Keyframe Animation - Professional JavaScript
 * Clean, performant, and accessible interactions
 */

'use strict';

// Configuration
const CONFIG = {
    SCROLL_THRESHOLD: 100,
    ANIMATION_DELAY: 100,
    VIDEO_INTERSECTION_THRESHOLD: 0.5,
    DEBOUNCE_DELAY: 16,
    LOADING_DURATION: 1500
};

// Application state
const App = {
    isLoaded: false,
    isScrolled: false,
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    
    // Initialize the application
    init() {
        console.log('🎬 Zero Keyframe Animation - Initializing...');
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    },
    
    // Setup all features
    setup() {
        this.createLoadingScreen();
        this.initNavigation();
        this.initScrollEffects();
        this.initVideoHandling();
        this.initSectionAnimations();
        this.initAOS();
        this.initAccessibility();
        this.initPerformanceOptimizations();
        
        // Mark as loaded after short delay
        setTimeout(() => {
            this.removeLoadingScreen();
            this.isLoaded = true;
            console.log('✅ Zero Keyframe Animation - Ready');
        }, CONFIG.LOADING_DURATION);
    }
};

// Loading Screen
App.createLoadingScreen = function() {
    if (this.reducedMotion) return;
    
    const loading = document.createElement('div');
    loading.className = 'loading';
    loading.innerHTML = `
        <div class="loading-content">
            <div class="loading-spinner"></div>
            <p>Loading Zero Keyframe Animation...</p>
        </div>
    `;
    document.body.appendChild(loading);
};

App.removeLoadingScreen = function() {
    const loading = document.querySelector('.loading');
    if (loading) {
        loading.style.opacity = '0';
        setTimeout(() => loading.remove(), 500);
    }
};

// Navigation
App.initNavigation = function() {
    const navbar = document.querySelector('.custom-navbar');
    const backBtn = document.querySelector('.back-btn');
    
    if (navbar) {
        this.createScrollProgress();
        this.initScrollListener(navbar);
    }
    
    if (backBtn) {
        backBtn.addEventListener('click', this.handleBackClick);
    }
};

App.createScrollProgress = function() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
};

App.initScrollListener = function(navbar) {
    let ticking = false;
    
    const updateScroll = () => {
        const scrolled = window.pageYOffset;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = Math.min((scrolled / documentHeight) * 100, 100);
        
        // Update navbar
        const isScrolled = scrolled > CONFIG.SCROLL_THRESHOLD;
        if (isScrolled !== this.isScrolled) {
            this.isScrolled = isScrolled;
            navbar.classList.toggle('scrolled', isScrolled);
        }
        
        // Update progress bar
        const progressBar = document.querySelector('.scroll-progress');
        if (progressBar) {
            progressBar.style.width = progress + '%';
        }
        
        ticking = false;
    };
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateScroll);
            ticking = true;
        }
    });
};

App.handleBackClick = function(e) {
    e.preventDefault();
    const btn = e.currentTarget;
    
    // Visual feedback
    btn.style.transform = 'translateX(-6px) scale(0.95)';
    
    setTimeout(() => {
        btn.style.transform = '';
        window.history.back();
    }, 200);
};

// Scroll Effects
App.initScrollEffects = function() {
    // Smooth scroll for anchor links
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
    
    // Parallax effect for yellow background
    if (!this.reducedMotion) {
        window.addEventListener('scroll', this.debounce(() => {
            const scrolled = window.pageYOffset;
            const yellowBg = document.querySelector('body[style*="background:#ffe834"]');
            if (yellowBg) {
                yellowBg.style.transform = `translateY(${scrolled * 0.1}px)`;
            }
        }, CONFIG.DEBOUNCE_DELAY));
    }
};

// Video Handling
App.initVideoHandling = function() {
    const videos = document.querySelectorAll('video');
    
    videos.forEach(video => {
        this.setupVideoObserver(video);
        this.addVideoInteractions(video);
        this.optimizeVideo(video);
    });
};

App.setupVideoObserver = function(video) {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.play().catch(() => {
                        // Autoplay blocked - that's okay
                    });
                } else {
                    entry.target.pause();
                }
            });
        },
        { threshold: CONFIG.VIDEO_INTERSECTION_THRESHOLD }
    );
    
    observer.observe(video);
};

App.addVideoInteractions = function(video) {
    video.addEventListener('click', (e) => {
        e.stopPropagation();
        
        if (video.paused) {
            video.play();
            this.showToast('▶ Playing');
        } else {
            video.pause();
            this.showToast('⏸ Paused');
        }
    });
    
    // Hover effects
    video.addEventListener('mouseenter', () => {
        if (!this.reducedMotion) {
            video.style.transform = 'translateY(-4px) scale(1.02)';
        }
    });
    
    video.addEventListener('mouseleave', () => {
        if (!this.reducedMotion) {
            video.style.transform = 'translateY(0) scale(1)';
        }
    });
};

App.optimizeVideo = function(video) {
    video.addEventListener('loadeddata', () => {
        video.style.opacity = '1';
    });
    
    // Lazy loading
    video.setAttribute('loading', 'lazy');
};

// Section Animations
App.initSectionAnimations = function() {
    if (this.reducedMotion) return;
    
    const sections = document.querySelectorAll('.section');
    
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate');
                    }, index * CONFIG.ANIMATION_DELAY);
                }
            });
        },
        { threshold: 0.2, rootMargin: '0px 0px -100px 0px' }
    );
    
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Animate images on hover
    this.initImageAnimations();
};

App.initImageAnimations = function() {
    const images = document.querySelectorAll('.section img');
    
    images.forEach(img => {
        img.addEventListener('mouseenter', () => {
            if (!this.reducedMotion) {
                img.style.transform = 'scale(1.05)';
            }
        });
        
        img.addEventListener('mouseleave', () => {
            img.style.transform = 'scale(1)';
        });
    });
};

// AOS Integration
App.initAOS = function() {
    if (typeof AOS !== 'undefined' && !this.reducedMotion) {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 120,
            delay: 50
        });
    }
};

// Accessibility
App.initAccessibility = function() {
    // Skip link
    this.createSkipLink();
    
    // Focus management
    this.initFocusManagement();
    
    // Keyboard navigation
    this.initKeyboardNavigation();
    
    // Screen reader announcements
    this.announcePageContent();
};

App.createSkipLink = function() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 10px;
        background: #000;
        color: #ffe834;
        padding: 8px 16px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10000;
        transition: top 0.3s ease;
        font-weight: 600;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '10px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
};

App.initFocusManagement = function() {
    document.addEventListener('focusin', (e) => {
        if (e.target.matches('a, button, video, [tabindex]')) {
            e.target.style.outline = '3px solid #000';
            e.target.style.outlineOffset = '2px';
        }
    });
    
    document.addEventListener('focusout', (e) => {
        if (e.target.matches('a, button, video, [tabindex]')) {
            e.target.style.outline = 'none';
        }
    });
};

App.initKeyboardNavigation = function() {
    document.addEventListener('keydown', (e) => {
        // Space or Enter to activate focused elements
        if (e.key === ' ' || e.key === 'Enter') {
            const focused = document.activeElement;
            if (focused && focused.tagName === 'VIDEO') {
                e.preventDefault();
                focused.click();
            }
        }
        
        // Escape to close modals or overlays
        if (e.key === 'Escape') {
            const overlay = document.getElementById('mboverlay');
            if (overlay && overlay.style.display !== 'none') {
                this.closeOverlay();
            }
        }
    });
};

App.announcePageContent = function() {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-label', 'Page status');
    announcement.style.cssText = `
        position: absolute;
        left: -10000px;
        width: 1px;
        height: 1px;
        overflow: hidden;
    `;
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        announcement.textContent = 'Zero Keyframe Animation case study loaded';
    }, 1000);
};

// Performance Optimizations
App.initPerformanceOptimizations = function() {
    // Preload critical resources
    const criticalResources = [
        'img/icn-back-black.svg',
        'img/stipple-logo-white.svg'
    ];
    
    criticalResources.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
    
    // Optimize images
    this.initImageOptimization();
    
    // Handle visibility changes
    this.initVisibilityHandling();
};

App.initImageOptimization = function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.setAttribute('loading', 'lazy');
        
        // Add fade in on load
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
    });
};

App.initVisibilityHandling = function() {
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            // Page hidden - pause all videos
            document.querySelectorAll('video').forEach(video => {
                video.pause();
            });
        }
    });
};

// Utility Functions
App.showToast = function(message, duration = 2000) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.9);
        color: #ffe834;
        padding: 0.75rem 1.5rem;
        border-radius: 25px;
        font-weight: 600;
        z-index: 10000;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s ease;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 232, 52, 0.3);
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
        }, 300);
    }, duration);
};

App.debounce = function(func, wait, immediate) {
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
};

// Overlay Management (from original HTML)
App.closeOverlay = function() {
    const overlay = document.getElementById('mboverlay');
    if (overlay) {
        overlay.style.opacity = '0';
        overlay.style.transform = 'scale(0.95)';
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 300);
    }
};

// More Works Interactions
App.initMoreWorksInteractions = function() {
    const workItems = document.querySelectorAll('.morework-item');
    
    workItems.forEach((item, index) => {
        if (!this.reducedMotion) {
            // Staggered reveal
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.6s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 150);
        }
        
        // Enhanced hover effects
        item.addEventListener('mouseenter', () => {
            if (!this.reducedMotion) {
                const video = item.querySelector('video');
                if (video) {
                    video.style.transform = 'scale(1.05)';
                }
            }
        });
        
        item.addEventListener('mouseleave', () => {
            const video = item.querySelector('video');
            if (video) {
                video.style.transform = 'scale(1)';
            }
        });
    });
};

// Enhanced initialization
App.setup = function() {
    this.createLoadingScreen();
    this.initNavigation();
    this.initScrollEffects();
    this.initVideoHandling();
    this.initSectionAnimations();
    this.initMoreWorksInteractions();
    this.initAOS();
    this.initAccessibility();
    this.initPerformanceOptimizations();
    
    setTimeout(() => {
        this.removeLoadingScreen();
        this.isLoaded = true;
        console.log('✅ Zero Keyframe Animation - Ready');
    }, CONFIG.LOADING_DURATION);
};

// Error Handling
window.addEventListener('error', (e) => {
    console.error('Zero Keyframe Animation Error:', e.error);
});

// Initialize the application
App.init();

// Export for global access
window.ZeroKeyframeAnimation = {
    App,
    closeOverlay: App.closeOverlay.bind(App),
    showToast: App.showToast.bind(App)
};

// jQuery integration (if available)
if (typeof $ !== 'undefined') {
    $(document).ready(() => {
        // Original overlay functionality
        $('#mboverlay').on('click', '#warningbtnprim', () => {
            App.closeOverlay();
        });
        
        console.log('🔗 jQuery integration loaded');
    });
}