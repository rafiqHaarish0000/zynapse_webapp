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

 function scrollToSection(id) {
    const section = document.getElementById(id);
    if(section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Attach scrollToSection to all nav links
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
    link.addEventListener('click', function(e){
      e.preventDefault(); // Prevent default anchor jump
      const targetId = this.getAttribute('href').replace('#',''); // Get target section ID
      scrollToSection(targetId);
      
      // Close mobile menu if open
      const mobileMenu = document.querySelector('.mobile-menu');
      if(mobileMenu.classList.contains('active')){
        mobileMenu.classList.remove('active');
      }
    });
  });

  // Optional: toggle mobile menu button
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  mobileBtn.addEventListener('click', () => {
    document.querySelector('.mobile-menu').classList.toggle('active');
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

function scrollToSection(id) {
  const section = document.getElementById(id);
  if(section){
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

//  function splitLetters(selector) {
//       const element = document.querySelector(selector);
//       if (!element) return;

//       const text = element.innerText;
//       element.innerHTML = text
//         .split("")
//         .map((char) =>
//           char.trim()
//             ? `<span class="char">${char}</span>`
//             : `<span class="char">&nbsp;</span>`  
//         )
//         .join("");

//       // Assign index for staggered delay
//       element.querySelectorAll(".char").forEach((span, i) => {
//         span.style.setProperty("--char-index", i);
//       });
//     }

//     // Apply split to title and subtitle
//     splitLetters(".hero-title");
//     splitLetters(".hero-subtitle");
// // After all text animations, show button
// const heroBtn = document.querySelector(".hero-btn");
// setTimeout(() => {
//   heroBtn.classList.add("show");
// }, 3000); // adjust timing (ms) to match your text animation duration
//     // Example scroll function
//     function scrollToSection(id) {
//       document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
//     }
