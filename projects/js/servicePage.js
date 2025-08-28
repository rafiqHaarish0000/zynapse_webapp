// Add some interactive animations
document.addEventListener('DOMContentLoaded', function() {
    // Animate tech stack image on scroll
    const techStackImage = document.querySelector('.tech-stack-image');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    });

    if (techStackImage) {
        observer.observe(techStackImage);
    }

    // Add click animation to CTA button
    const ctaButton = document.querySelector('.cta-button');
    ctaButton.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });

    // Add hover effects to cards
    const cards = document.querySelectorAll('.solution-card, .domain-card, .brand-logo');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });

    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add parallax effect to hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero-section');
        const techIcons = document.querySelector('.tech-icons');
        
        if (heroSection && techIcons) {
            techIcons.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    });
});
document.addEventListener("DOMContentLoaded", function() {
  const statNumbers = document.querySelectorAll('.stat-number');

  function animateStatNumber(element, duration = 3000, interval = 150) {
    const defaultText = element.getAttribute('data-default') || '3+';
    const startTime = performance.now();

    const roll = () => {
      const elapsed = performance.now() - startTime;

      if (elapsed < duration) {
        // Random number between 1 and 9
        const randomNum = Math.floor(Math.random() * 9) + 1;
        element.textContent = randomNum + '+';
        setTimeout(roll, interval);
      } else {
        element.textContent = defaultText; // stop at default
      }
    };

    roll();
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateStatNumber(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(num => observer.observe(num));
});