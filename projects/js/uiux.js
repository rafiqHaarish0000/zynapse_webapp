/**
 * OLA Play CXC - Enhanced JavaScript
 * Professional interactions and animations
 */

(function ($) {
  "use strict";

  // Configuration
  const CONFIG = {
    SCROLL_THRESHOLD: 100,
    LOADING_DURATION: 1500,
    ANIMATION_DELAY: 150,
    VIDEO_INTERSECTION_THRESHOLD: 0.5,
    DEBOUNCE_DELAY: 16
  };

  // Application state
  const App = {
    isLoaded: false,
    isScrolled: false,
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    
    // Initialize the application
    init() {
      console.log('🚗 OLA Play CXC - Initializing...');
      
      if (document.readyState === 'loading') {
        $(document).ready(() => this.setup());
      } else {
        this.setup();
      }
    },
    
    // Setup all features
    setup() {
      this.createLoadingScreen();
      this.initBurgerMenu();
      this.initIsotope();
      this.initOwlCarousel();
      this.initNavigation();
      this.initScrollEffects();
      this.initVideoHandling();
      this.initSectionAnimations();
      this.initAccessibility();
      this.initAOS();
      
      // Remove loading screen
      setTimeout(() => {
        this.removeLoadingScreen();
        this.isLoaded = true;
        console.log('✅ OLA Play CXC - Ready');
      }, CONFIG.LOADING_DURATION);
    }
  };

  // Loading Screen
  App.createLoadingScreen = function() {
    if (this.reducedMotion) return;
    
    const loading = $(`
      <div class="loading-overlay">
        <div class="loading-content">
          <div class="loading-spinner"></div>
          <p>Loading OLA Play CXC...</p>
        </div>
      </div>
    `);
    
    $('body').append(loading);
  };

  App.removeLoadingScreen = function() {
    $('.loading-overlay').fadeOut(500, function() {
      $(this).remove();
    });
  };

  // Burger Menu (from original)
  App.initBurgerMenu = function() {
    $('.burger').click(function(e) {
      e.preventDefault();
      $(window).scrollTop(0);
      
      if(!$(this).hasClass('active')) {
        $(this).addClass('active');
      } else {
        $(this).removeClass('active');
      }
    });
  };

  // Isotope (from original, enhanced)
  App.initIsotope = function() {
    if ($('#portfolio-grid').length === 0) return;
    
    const $container = $('#portfolio-grid').isotope({
      itemSelector: '.item',
      isFitWidth: true,
      transitionDuration: '0.3s'
    });

    $(window).resize(() => {
      $container.isotope({
        columnWidth: '.col-sm-3'
      });
    });
    
    $container.isotope({ filter: '*' });

    $('#filters').on('click', 'a', function(e) {
      e.preventDefault();
      const filterValue = $(this).attr('data-filter');
      $container.isotope({ filter: filterValue });
      $('#filters a').removeClass('active');
      $(this).addClass('active');
    });
  };

  // Owl Carousel (from original, enhanced)
  App.initOwlCarousel = function() {
    if ($('.testimonial-carousel').length === 0) return;
    
    $('.testimonial-carousel').owlCarousel({
      center: true,
      items: 1,
      loop: true,
      margin: 0,
      autoplay: true,
      smartSpeed: 1000,
      autoplayTimeout: 5000,
      autoplayHoverPause: true,
      nav: false,
      dots: true,
      responsive: {
        0: { items: 1 },
        768: { items: 1 },
        1024: { items: 1 }
      }
    });
  };

  // Enhanced Navigation
  App.initNavigation = function() {
    const $navbar = $('.custom-navbar');
    const $backBtn = $('.back-btn');
    
    if ($navbar.length) {
      this.createScrollProgress();
      this.initScrollListener($navbar);
    }
    
    if ($backBtn.length) {
      $backBtn.on('click', (e) => {
        e.preventDefault();
        this.handleBackClick($backBtn);
      });
    }
  };

  App.createScrollProgress = function() {
    const progressBar = $('<div class="scroll-progress"></div>');
    $('body').append(progressBar);
  };

  App.initScrollListener = function($navbar) {
    let ticking = false;
    
    const updateScroll = () => {
      const scrolled = $(window).scrollTop();
      const documentHeight = $(document).height() - $(window).height();
      const progress = Math.min((scrolled / documentHeight) * 100, 100);
      
      // Update navbar
      const isScrolled = scrolled > CONFIG.SCROLL_THRESHOLD;
      if (isScrolled !== this.isScrolled) {
        this.isScrolled = isScrolled;
        $navbar.toggleClass('scrolled', isScrolled);
      }
      
      // Update progress bar
      $('.scroll-progress').css('width', progress + '%');
      
      // Parallax effect for red background
      if (!this.reducedMotion) {
        const redBg = $('body[style*="background:#FB5256"]');
        if (redBg.length) {
          redBg.css('transform', `translateY(${scrolled * 0.1}px)`);
        }
      }
      
      ticking = false;
    };
    
    $(window).on('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateScroll);
        ticking = true;
      }
    });
  };

  App.handleBackClick = function($btn) {
    $btn.css('transform', 'translateX(-6px) scale(0.95)');
    
    setTimeout(() => {
      $btn.css('transform', '');
      window.history.back();
    }, 200);
  };

  // Scroll Effects
  App.initScrollEffects = function() {
    // Smooth scroll for anchor links
    $('a[href^="#"]').on('click', function(e) {
      e.preventDefault();
      const target = $($(this).attr('href'));
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top - 100
        }, 800);
      }
    });
    
    // Section reveal animations
    if (!this.reducedMotion) {
      this.initSectionReveal();
    }
  };

  App.initSectionReveal = function() {
    const $sections = $('.site-section');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              $(entry.target).addClass('animate-in');
            }, index * CONFIG.ANIMATION_DELAY);
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -100px 0px' }
    );
    
    $sections.each(function() {
      observer.observe(this);
    });
  };

  // Video Handling
  App.initVideoHandling = function() {
    const $videos = $('video');
    
    $videos.each((index, video) => {
      this.setupVideoObserver($(video));
      this.addVideoInteractions($(video));
      this.optimizeVideo($(video));
    });
  };

  App.setupVideoObserver = function($video) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const video = entry.target;
          if (entry.isIntersecting) {
            video.play().catch(() => {
              // Autoplay blocked - that's okay
            });
          } else {
            video.pause();
          }
        });
      },
      { threshold: CONFIG.VIDEO_INTERSECTION_THRESHOLD }
    );
    
    observer.observe($video[0]);
  };

  App.addVideoInteractions = function($video) {
    $video.on('click', (e) => {
      e.stopPropagation();
      const video = $video[0];
      
      if (video.paused) {
        video.play();
        this.showToast('▶ Playing');
      } else {
        video.pause();
        this.showToast('⏸ Paused');
      }
    });
    
    // Enhanced hover effects
    $video.on('mouseenter', () => {
      if (!this.reducedMotion) {
        $video.css('transform', 'translateY(-5px) scale(1.03)');
      }
    });
    
    $video.on('mouseleave', () => {
      $video.css('transform', 'translateY(0) scale(1)');
    });
  };

  App.optimizeVideo = function($video) {
    $video.on('loadeddata', () => {
      $video.css('opacity', '1');
    });
    
    // Set lazy loading
    $video.attr('loading', 'lazy');
  };

  // Section Animations
  App.initSectionAnimations = function() {
    if (this.reducedMotion) return;
    
    // Animate icons on scroll
    this.initIconAnimations();
    
    // Animate images on hover
    this.initImageAnimations();
    
    // Animate more works items
    this.initMoreWorksAnimations();
  };

  App.initIconAnimations = function() {
    const $icons = $('img[src*="ic-"]');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              $(entry.target).addClass('animate-bounce');
            }, index * 200);
          }
        });
      },
      { threshold: 0.5 }
    );
    
    $icons.each(function() {
      observer.observe(this);
    });
  };

  App.initImageAnimations = function() {
    const $images = $('.section img, .whitebg img');
    
    $images.on('mouseenter', function() {
      if (!App.reducedMotion) {
        $(this).css('transform', 'scale(1.02) translateY(-2px)');
      }
    });
    
    $images.on('mouseleave', function() {
      $(this).css('transform', 'scale(1) translateY(0)');
    });
  };

  App.initMoreWorksAnimations = function() {
    const $workItems = $('.morework-item');
    
    $workItems.each((index, item) => {
      const $item = $(item);
      
      // Staggered reveal
      setTimeout(() => {
        $item.addClass('fade-in-up');
      }, index * 150);
      
      // Enhanced hover effects
      $item.on('mouseenter', () => {
        const $video = $item.find('video');
        if ($video.length) {
          $video.css('transform', 'scale(1.05)');
        }
      });
      
      $item.on('mouseleave', () => {
        const $video = $item.find('video');
        if ($video.length) {
          $video.css('transform', 'scale(1)');
        }
      });
    });
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
    const skipLink = $(`
      <a href="#main" class="skip-link" style="
        position: absolute;
        top: -40px;
        left: 10px;
        background: #FB5256;
        color: white;
        padding: 8px 16px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10000;
        transition: top 0.3s ease;
        font-weight: 600;
      ">Skip to main content</a>
    `);
    
    skipLink.on('focus', function() {
      $(this).css('top', '10px');
    });
    
    skipLink.on('blur', function() {
      $(this).css('top', '-40px');
    });
    
    $('body').prepend(skipLink);
  };

  App.initFocusManagement = function() {
    $(document).on('focusin', 'a, button, video, [tabindex]', function() {
      $(this).css({
        'outline': '3px solid #FB5256',
        'outline-offset': '2px'
      });
    });
    
    $(document).on('focusout', 'a, button, video, [tabindex]', function() {
      $(this).css('outline', 'none');
    });
  };

  App.initKeyboardNavigation = function() {
    $(document).on('keydown', (e) => {
      // Space or Enter to activate focused videos
      if (e.key === ' ' || e.key === 'Enter') {
        const $focused = $(document.activeElement);
        if ($focused.is('video')) {
          e.preventDefault();
          $focused.trigger('click');
        }
      }
      
      // Escape to close overlays
      if (e.key === 'Escape') {
        const $overlay = $('#mboverlay');
        if ($overlay.length && $overlay.is(':visible')) {
          this.closeOverlay();
        }
      }
    });
  };

  App.announcePageContent = function() {
    const announcement = $(`
      <div aria-live="polite" aria-label="Page status" style="
        position: absolute;
        left: -10000px;
        width: 1px;
        height: 1px;
        overflow: hidden;
      "></div>
    `);
    
    $('body').append(announcement);
    
    setTimeout(() => {
      announcement.text('OLA Play CXC case study loaded');
    }, 1000);
  };

  // AOS Initialization (from original, enhanced)
  App.initAOS = function() {
    if (typeof AOS !== 'undefined' && !this.reducedMotion) {
      AOS.init({
        easing: 'ease-out-cubic',
        duration: 800,
        once: true,
        offset: 120,
        delay: 50
      });
    }
  };

  // Utility Functions
  App.showToast = function(message, duration = 2000) {
    const toast = $(`
      <div style="
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(251, 82, 86, 0.9);
        color: white;
        padding: 0.75rem 1.5rem;
        border-radius: 25px;
        font-weight: 600;
        z-index: 10000;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s ease;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
      ">${message}</div>
    `);
    
    $('body').append(toast);
    
    // Animate in
    setTimeout(() => toast.css('opacity', '1'), 10);
    
    // Remove after duration
    setTimeout(() => {
      toast.css('opacity', '0');
      setTimeout(() => toast.remove(), 300);
    }, duration);
  };

  App.closeOverlay = function() {
    const $overlay = $('#mboverlay');
    if ($overlay.length) {
      $overlay.css({
        'opacity': '0',
        'transform': 'scale(0.95)'
      });
      setTimeout(() => {
        $overlay.hide();
      }, 300);
    }
  };

  // Performance optimizations
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

  // Handle page visibility for performance
  $(document).on('visibilitychange', () => {
    if (document.hidden) {
      // Page hidden - pause all videos
      $('video').each(function() {
        this.pause();
      });
    }
  });

  // Error handling
  window.addEventListener('error', (e) => {
    console.error('OLA Play CXC Error:', e.error);
  });

  // Initialize the application
  App.init();

  // Export for global access
  window.OLAPlayCXC = {
    App,
    closeOverlay: App.closeOverlay.bind(App),
    showToast: App.showToast.bind(App)
  };

  // Original overlay functionality (from HTML)
  $('#mboverlay').on('click', '#warningbtnprim', function () {
    App.closeOverlay();
  });

})(jQuery);

// Add CSS animations
const animationStyles = `
<style>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounce {
  0%, 20%, 53%, 80%, 100% {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    transform: translate3d(0, 0, 0);
  }
  40%, 43% {
    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    transform: translate3d(0, -8px, 0);
  }
  70% {
    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    transform: translate3d(0, -4px, 0);
  }
  90% {
    transform: translate3d(0, -2px, 0);
  }
}

.animate-in {
  animation: fadeInUp 0.8s ease-out;
}

.fade-in-up {
  animation: fadeInUp 0.6s ease-out;
}

.animate-bounce {
  animation: bounce 1s ease-out;
}

/* Accessibility improvements */
@media (prefers-reduced-motion: reduce) {
  .animate-in,
  .fade-in-up,
  .animate-bounce {
    animation: none !important;
  }
}
</style>
`;

$(document).ready(() => {
  $('head').append(animationStyles);
  console.log('🎨 OLA Play CXC animations loaded');
});