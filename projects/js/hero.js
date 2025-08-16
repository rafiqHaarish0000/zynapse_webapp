// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('active');
  const icon = mobileMenuBtn.querySelector('svg');
  if (mobileMenu.classList.contains('active')) {
    icon.innerHTML = '<path d="M6 18L18 6M6 6l12 12"></path>';
  } else {
    icon.innerHTML = '<path d="M3 12h18M3 6h18M3 18h18"></path>';
  }
});

document.querySelectorAll('.mobile-menu a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    mobileMenuBtn.querySelector('svg').innerHTML = '<path d="M3 12h18M3 6h18M3 18h18"></path>';
  });
});

// Scroll to section
function scrollToSection(sectionId) {
  document.getElementById(sectionId).scrollIntoView({behavior:'smooth'});
}

// Hero parallax
const heroBg = document.querySelector('.hero-bg');
const heroSection = document.querySelector('.hero');

window.addEventListener('scroll', () => {
  const scrollPosition = window.pageYOffset;
  const heroHeight = heroSection.offsetHeight;

  if (scrollPosition < heroHeight) {
    const scale = 1 + scrollPosition * 0.0005;
    const opacity = 1 - scrollPosition * 0.002;
    heroBg.style.transform = `scale(${scale})`;
    heroBg.style.opacity = opacity;
  }
});
