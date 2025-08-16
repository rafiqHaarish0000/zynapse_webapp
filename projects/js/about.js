const doorLeft = document.querySelector('.door-left');
const doorRight = document.querySelector('.door-right');
const aboutContent = document.querySelector('#about .section-content');
const stackGrid = document.querySelector('.stack-grid');

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

window.addEventListener('scroll', () => {
  const aboutSection = document.getElementById('about');
  const scrollTop = window.scrollY;
  const triggerPoint = aboutSection.offsetTop - window.innerHeight / 1.5;

  if (scrollTop > triggerPoint) {
    doorLeft.style.transform = 'rotateY(-90deg)';
    doorRight.style.transform = 'rotateY(90deg)';
    aboutContent.style.opacity = 1;
    aboutContent.style.transform = 'translateY(0)';
    stackGrid.classList.add('show');
  } else {
    doorLeft.style.transform = 'rotateY(0deg)';
    doorRight.style.transform = 'rotateY(0deg)';
    aboutContent.style.opacity = 0;
    aboutContent.style.transform = 'translateY(50px)';
    stackGrid.classList.remove('show');
  }
});
