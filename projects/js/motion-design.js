// Motion Design Portfolio - JavaScript

(function($) {
  'use strict';

  // Initialize everything when document is ready
  $(document).ready(function() {
    initNavigation();
    initAnimations();
    initVideoHandlers();
    initMobileHandlers();
    initAOS();
  });

  // Navigation handlers
  function initNavigation() {
    // Back button functionality
    $('.back-btn').on('click', function(e) {
      e.preventDefault();
      if (window.history.length > 1) {
        history.back();
      } else {
        window.location.href = 'home.html';
      }
    });

    // Burger menu toggle
    $('.burger').on('click', function(e) {
      e.preventDefault();
      $(this).toggleClass('active');
      $('body').toggleClass('menu-open');
    });
  }

  // Animation management
  function initAnimations() {
    // Handle Lottie animations with intersection observer for performance
    if ('IntersectionObserver' in window) {
      const animationObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          const player = entry.target.querySelector('lottie-player');
          if (player) {
            if (entry.isIntersecting) {
              player.play();
            } else {
              player.pause();
            }
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '50px'
      });

      // Observe all animation wrappers
      document.querySelectorAll('.anim-wrap').forEach(function(element) {
        animationObserver.observe(element);
      });
    }

    // Add loading states for Lottie players
    $('lottie-player').each(function() {
      const $player = $(this);
      const $wrapper = $player.closest('.anim-wrap');
      
      // Add loading overlay
      $wrapper.append('<div class="loading-overlay active"><div class="loading-spinner"></div></div>');
      
      // Handle player ready
      this.addEventListener('ready', function() {
        $wrapper.find('.loading-overlay').removeClass('active');
      });
      
      // Handle player error
      this.addEventListener('error', function() {
        $wrapper.find('.loading-overlay').removeClass('active');
        console.warn('Lottie animation failed to load');
      });
    });
  }

  // Video handlers
  function initVideoHandlers() {
    const videos = document.querySelectorAll('video');
    
    // Intersection observer for video performance
    if ('IntersectionObserver' in window) {
      const videoObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          const video = entry.target;
          
          if (entry.isIntersecting) {
            video.play().catch(function(error) {
              console.log('Video autoplay failed:', error);
            });
          } else {
            video.pause();
          }
        });
      }, {
        threshold: 0.25
      });

      videos.forEach(function(video) {
        videoObserver.observe(video);
      });
    }

    // Add loading states for videos
    videos.forEach(function(video) {
      const $video = $(video);
      const $wrapper = $video.closest('.FRM-UImock, .FRM-UImock-w, .mw-img-wrap');
      
      // Add loading overlay
      $wrapper.append('<div class="loading-overlay active"><div class="loading-spinner"></div></div>');
      
      video.addEventListener('loadeddata', function() {
        $wrapper.find('.loading-overlay').removeClass('active');
      });
      
      video.addEventListener('error', function() {
        $wrapper.find('.loading-overlay').removeClass('active');
        console.warn('Video failed to load');
      });
    });
  }

  // Mobile specific handlers
  function initMobileHandlers() {
    // Close mobile overlay
    $('#mboverlay').on('click', '#warningbtnprim', function() {
      $('#mboverlay').hide();
    });

    // Optimize animations on mobile
    if (window.innerWidth <= 768) {
      $('lottie-player').each(function() {
        if (this.setSpeed) {
          this.setSpeed(0.7); // Slower animations on mobile
        }
      });
    }

    // Handle reduced motion preference
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      $('lottie-player').each(function() {
        if (this.pause) {
          this.pause();
        }
      });
      
      $('video').each(function() {
        this.pause();
      });
    }
  }

  // Initialize AOS (Animate On Scroll)
  function initAOS() {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        offset: 100,
        once: true,
        disable: function() {
          return window.innerWidth < 768;
        }
      });
    }
  }

  // Smooth scrolling for internal links
  $('a[href^="#"]').on('click', function(e) {
    const target = $(this.getAttribute('href'));
    if (target.length) {
      e.preventDefault();
      $('html, body').animate({
        scrollTop: target.offset().top - 80
      }, 800);
    }
  });

  // Throttle function for performance
  function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Window resize handler
  $(window).on('resize', throttle(function() {
    // Refresh AOS on resize
    if (typeof AOS !== 'undefined') {
      AOS.refresh();
    }
  }, 250));

  // Keyboard navigation support
  $('.item-wrap').on('keydown', function(e) {
    if (e.keyCode === 13 || e.keyCode === 32) { // Enter or Space
      e.preventDefault();
      const href = $(this).attr('href');
      if (href) {
        window.location.href = href;
      }
    }
  });

  // Add focus indicators
  $('.item-wrap').attr('tabindex', '0');

  // Error handling
  window.addEventListener('error', function(event) {
    console.error('JavaScript error:', event.error);
  });

  // Performance monitoring
  $(window).on('load', function() {
    // Remove all loading overlays after page load
    setTimeout(function() {
      $('.loading-overlay').removeClass('active');
    }, 1000);
  });

  // Preload critical animations
  function preloadAnimations() {
    const criticalAnimations = [
      'https://raw.githubusercontent.com/hemanthravindran/hemanthravindran.github.io/main/img/articles/frmotion/lotties/frlogo.json',
      'https://raw.githubusercontent.com/hemanthravindran/hemanthravindran.github.io/main/img/articles/frmotion/lotties/frmotionhero3.json'
    ];

    criticalAnimations.forEach(function(src) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'fetch';
      link.crossOrigin = 'anonymous';
      link.href = src;
      document.head.appendChild(link);
    });
  }

  // Initialize preloading
  preloadAnimations();

})(jQuery);