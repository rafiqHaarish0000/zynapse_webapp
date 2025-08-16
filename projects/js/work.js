// Select all cards
const projectCards = document.querySelectorAll('.project-card');
const carouselItems = document.querySelectorAll('.carousel-item');
const workVideo = document.querySelector('.work-bg');


function showProjectsOnScroll() {
  const triggerPoint = window.innerHeight * 0.85;

  projectCards.forEach(card => {
    const cardTop = card.getBoundingClientRect().top;

    if (cardTop < triggerPoint) {
      card.classList.add('visible');
    } else {
      card.classList.remove('visible'); // optional: remove if you want "one-time reveal"
    }
  });
}

function showVideoOnScroll() {
  const triggerPoint = window.innerHeight * 0.2;
  const videoTop = workVideo.getBoundingClientRect().top;

  if (videoTop < triggerPoint) {
    workVideo.classList.add('visible');
  } else {
    workVideo.classList.remove('visible'); // remove this line if you want one-time reveal
  }
}

function checkVisibility() {
  const windowHeight = window.innerHeight;
  const revealPoint = 150;
  
  carouselItems.forEach((item, index) => {
    const itemTop = item.getBoundingClientRect().top;
    
    if (itemTop < windowHeight - revealPoint) {
      setTimeout(() => {
        item.classList.add('visible');
      }, index * 150); // Staggered delay
    }
  });
}

function setupCarousel() {
  // No initial transform needed since we're using the visible class
}

// Run on scroll & load
window.addEventListener('scroll', showProjectsOnScroll);
document.addEventListener('DOMContentLoaded', showProjectsOnScroll);
window.addEventListener('scroll', showVideoOnScroll);
document.addEventListener('DOMContentLoaded', showVideoOnScroll);
// Run on scroll & load
window.addEventListener('scroll', checkVisibility);
document.addEventListener('DOMContentLoaded', () => {
  setupCarousel();
  checkVisibility(); // Check on load in case items are already visible
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const item = entry.target;
      const index = Array.from(carouselItems).indexOf(item);
      setTimeout(() => {
        item.classList.add('visible');
      }, index * 150);
    }
  });
}, {threshold: 0.1});

// Observe each item
carouselItems.forEach(item => {
  observer.observe(item);
});
