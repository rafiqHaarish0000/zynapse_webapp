(function ($) {
  "use strict";

  // Navigation Functions
  var navigationHandlers = function() {
    // Back button functionality
    $('.back-btn').click(function(e) {
      e.preventDefault();
      if (window.history.length > 1) {
        history.back();
      } else {
        window.location.href = 'home.html';
      }
    });

    // Burger menu functionality
    $('.burger').click(function(e) {
      e.preventDefault();
      $(window).scrollTop(0);
      if(!$('.burger').hasClass('active')) {
        $('.burger').addClass('active');
      } else {
        $('.burger').removeClass('active');
      }
    });
  };

  // Lottie Animation Management
  var lottieAnimations = function() {
    var animations = [];
    
    // Initialize all Lottie players
    $('lottie-player').each(function(index) {
      var $player = $(this);
      var player = this;
      
      // Add loading state
      $player.closest('.anim-wrap').addClass('loading-animation loading');
      
      // Handle player ready
      player.addEventListener('ready', function() {
        $player.closest('.anim-wrap').removeClass('loading');
        animations.push(player);
      });
      
      // Handle player error
      player.addEventListener('error', function() {
        $player.closest('.anim-wrap').removeClass('loading');
        console.warn('Lottie animation failed to load:', $player.attr('src'));
      });
    });

    // Intersection Observer for performance
    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          var $player = $(entry.target).find('lottie-player');
          var player = $player[0];
          
          if (entry.isIntersecting) {
            if (player && typeof player.play === 'function') {
              player.play();
            }
          } else {
            if (player && typeof player.pause === 'function') {
              player.pause();
            }
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '50px'
      });

      $('.anim-wrap').each(function() {
        observer.observe(this);
      });
    }
  };

  // Video Management
  var videoHandlers = function() {
    var videos = $('video');
    
    videos.each(function() {
      var video = this;
      var $video = $(this);
      
      // Add loading state
      $video.closest('.FRM-UImock, .FRM-UImock-w, .mw-img-wrap').addClass('loading-animation loading');
      
      // Handle video loaded
      video.addEventListener('loadeddata', function() {
        $video.closest('.loading-animation').removeClass('loading');
      });
      
      // Handle video error
      video.addEventListener('error', function() {
        $video.closest('.loading-animation').removeClass('loading');
        console.warn('Video failed to load:', $video.find('source').attr('src'));
      });
    });

    // Intersection Observer for video performance
    if ('IntersectionObserver' in window) {
      var videoObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          var video = entry.target;
          
          if (entry.isIntersecting) {
            if (video.paused) {
              video.play().catch(function(error) {
                console.log('Video autoplay failed:', error);
              });
            }
          } else {
            if (!video.paused) {
              video.pause();
            }
          }
        });
      }, {
        threshold: 0.25
      });

      videos.each(function() {
        videoObserver.observe(this);
      });
    }
  };

  // Mobile Overlay Handlers
  var mobileOverlayHandlers = function() {
    // Close overlay on warning button click
    $('#mboverlay').on('click', '#warningbtnprim', function () {
      document.getElementById("mboverlay").style.display = "none";
    });

    // Handle mobile-specific interactions
    if (window.innerWidth <= 768) {
      // Reduce animation complexity on mobile
      $('lottie-player').each(function() {
        var player = this;
        if (player && typeof player.setSpeed === 'function') {
          player.setSpeed(0.8); // Slower animations on mobile
        }
      });
    }
  };

  // Smooth Scrolling
  var smoothScrolling = function() {
    $('a[href^="#"]').on('click', function(event) {
      var target = $(this.getAttribute('href'));
      if (target.length) {
        event.preventDefault();
        $('html, body').stop().animate({
          scrollTop: target.offset().top - 100
        }, 1000, 'easeInOutExpo');
      }
    });
  };

  // Performance Optimizations
  var performanceOptimizations = function() {
    // Throttle scroll events
    var throttle = function(func, wait, options) {
      var context, args, result;
      var timeout = null;
      var previous = 0;
      if (!options) options = {};
      var later = function() {
        previous = options.leading === false ? 0 : Date.now();
        timeout = null;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      };
      return function() {
        var now = Date.now();
        if (!previous && options.leading === false) previous = now;
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0 || remaining > wait) {
          if (timeout) {
            clearTimeout(timeout);
            timeout = null;
          }
          previous = now;
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        } else if (!timeout && options.trailing !== false) {
          timeout = setTimeout(later, remaining);
        }
        return result;
      };
    };

    // Optimize scroll performance
    var optimizedScroll = throttle(function() {
      // Add scroll-based optimizations here if needed
    }, 100);

    $(window).scroll(optimizedScroll);
  };

  // Animation Timeline Management
  var animationTimeline = function() {
    // Stagger animations for better visual flow
    $('.course-item').each(function(index) {
      var $item = $(this);
      $item.attr('data-aos-delay', (index * 100).toString());
    });

    $('.morework-item').each(function(index) {
      var $item = $(this);
      $item.attr('data-aos-delay', (index * 150).toString());
    });
  };

  // Accessibility Enhancements
  var accessibilityEnhancements = function() {
    // Add keyboard navigation support
    $('.item-wrap, .tool-list-item').on('keydown', function(e) {
      if (e.keyCode === 13 || e.keyCode === 32) { // Enter or Space
        e.preventDefault();
        window.location.href = $(this).attr('href');
      }
    });

    // Add focus indicators
    $('.item-wrap, .tool-list-item').attr('tabindex', '0');

    // Pause animations on reduced motion preference
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      $('lottie-player').each(function() {
        var player = this;
        if (player && typeof player.pause === 'function') {
          player.pause();
        }
      });
      
      $('video').each(function() {
        this.pause();
      });
    }
  };

  // Error Handling
  var errorHandling = function() {
    window.addEventListener('error', function(event) {
      console.error('JavaScript error:', event.error);
    });

    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', function(event) {
      console.error('Unhandled promise rejection:', event.reason);
    });
  };

  // Initialize AOS with custom settings
  var initAOS = function() {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        easing: 'ease-out-cubic',
        duration: 800,
        offset: 50,
        delay: 100,
        once: true,
        mirror: false,
        disable: function() {
          return window.innerWidth < 768; // Disable on mobile for performance
        }
      });
    }
  };

  // Preload critical resources
  var preloadResources = function() {
    // Preload critical Lottie animations
    var criticalAnimations = [
      'https://raw.githubusercontent.com/hemanthravindran/hemanthravindran.github.io/main/img/articles/frmotion/lotties/frlogo.json'
    ];

    criticalAnimations.forEach(function(src) {
      var link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'fetch';
      link.crossOrigin = 'anonymous';
      link.href = src;
      document.head.appendChild(link);
    });
  };

  // Main initialization
  var init = function() {
    navigationHandlers();
    mobileOverlayHandlers();
    smoothScrolling();
    performanceOptimizations();
    animationTimeline();
    accessibilityEnhancements();
    errorHandling();
    preloadResources();
    initAOS();
  };

  // Document ready
  $(document).ready(function() {
    init();
  });

  // Window load
  $(window).on('load', function() {
    lottieAnimations();
    videoHandlers();
    
    // Hide loading states after everything is loaded
    setTimeout(function() {
      $('.loading-animation').removeClass('loading');
    }, 1000);
  });

  // Handle window resize
  $(window).on('resize', throttle(function() {
    // Reinitialize AOS on resize
    if (typeof AOS !== 'undefined') {
      AOS.refresh();
    }
  }, 250));

})(jQuery);

// Utility function for smooth scroll with easing
if (!jQuery.easing.easeInOutExpo) {
  jQuery.easing.easeInOutExpo = function (x, t, b, c, d) {
    if (t === 0) return b;
    if (t === d) return b + c;
    if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
    return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
  };
}