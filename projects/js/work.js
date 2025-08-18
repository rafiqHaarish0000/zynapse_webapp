document.addEventListener('DOMContentLoaded', function() {
  // Video background animation
  const workVideo = document.querySelector('.work-bg');
  if (workVideo) {
    workVideo.classList.add('visible');
  }

  // Carousel items animation
  const carouselItems = document.querySelectorAll('.carousel-item');
  const carouselObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 150);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  });
  carouselItems.forEach(item => carouselObserver.observe(item));

  // Work content animation (image, heading, description one by one)
  const workContents = document.querySelectorAll('.work-content');
  const workContentObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const children = Array.from(entry.target.children); // image, heading, description
        children.forEach((child, index) => {
          setTimeout(() => {
            child.classList.add('visible');
          }, index * 200); // stagger by 200ms
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  workContents.forEach(content => workContentObserver.observe(content));
});
