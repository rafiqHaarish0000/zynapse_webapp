// Fade-in contact form on scroll
const contactForm = document.querySelector('.contact-form');

function showContactForm() {
  const triggerPoint = window.innerHeight * 0.9;
  const formTop = contactForm.getBoundingClientRect().top;

  if(formTop < triggerPoint){
    contactForm.style.opacity = 1;
    contactForm.style.transform = 'translateY(0)';
  } else {
    contactForm.style.opacity = 0;
    contactForm.style.transform = 'translateY(50px)';
  }
}

window.addEventListener('scroll', showContactForm);
document.addEventListener('DOMContentLoaded', showContactForm);
