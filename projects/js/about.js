// const doorLeft = document.querySelector('.door-left');
// const doorRight = document.querySelector('.door-right');
const aboutContent = document.querySelector('#about .section-content');
// const stackGrid = document.querySelector('.stack-grid');

  // Trigger animations when element is in viewport
  document.addEventListener('DOMContentLoaded', function() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running';
        }
      });
    }, {threshold: 0.1});
    
    document.querySelectorAll('.floating, .fade-in-text').forEach(el => {
      observer.observe(el);
    });
  });

          // JavaScript for Sliding Panels Effect
        
        // Function to handle scroll-triggered animation
        function handleSlidingPanels() {
            const aboutSection = document.getElementById('aboutContainer');
            const slideContainer = document.getElementById('slideContainer');
            const scrollPosition = window.scrollY;
            const triggerPoint = aboutSection.offsetTop - window.innerHeight * 0.6;
            
            if (scrollPosition >= triggerPoint) {
                slideContainer.classList.add('open');
            } else {
                slideContainer.classList.remove('open');
            }
        }

        // Throttled scroll handler for better performance
        let ticking = false;
        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(() => {
                    handleSlidingPanels();
                    ticking = false;
                });
                ticking = true;
            }
        }

        // Event listeners
        window.addEventListener('scroll', requestTick);
        window.addEventListener('load', handleSlidingPanels);

        // Alternative: Using Intersection Observer for better performance
        const observerOptions = {
            threshold: 0.3,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const slideContainer = entry.target.querySelector('#slideContainer');
                if (entry.isIntersecting) {
                    slideContainer.classList.add('open');
                } else {
                    slideContainer.classList.remove('open');
                }
            });
        }, observerOptions);

        // Start observing when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            const aboutSection = document.getElementById('aboutContainer');
            observer.observe(aboutSection);
        });

window.addEventListener("scroll", () => {
  const hero = document.querySelector(".hero");
  const heroContent = document.querySelector(".hero-content");

  if (!hero || !heroContent) return;

  const heroHeight = hero.offsetHeight;
  const scrollY = window.scrollY;

  // Calculate how far we’ve scrolled into the hero section
  const progress = Math.min(scrollY / heroHeight, 1);

  // Apply fading based on progress (same way bg disappears)
  heroContent.style.opacity = 1 - progress;
  heroContent.style.transform = `translateY(${progress * -50}px)`; // drift up
});



