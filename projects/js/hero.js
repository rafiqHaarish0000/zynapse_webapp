// =========================
// Mobile Menu Toggle
// =========================
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

// Smooth scroll to section
function scrollToSection(id) {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

// Attach smooth scroll to nav + mobile menu links
// Attach smooth scroll to nav + mobile menu links
document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');

    // If it's an in-page anchor (starts with #), do smooth scroll
    if (href.startsWith('#') || this.getAttribute('onclick')) {
      e.preventDefault();
      const targetId = href.replace('#','');
      scrollToSection(targetId);
    } 
    // else (like contact.html), allow normal navigation (no preventDefault)

    // Close mobile menu if open
    if (mobileMenu.classList.contains('active')) {
      mobileMenu.classList.remove('active');
      mobileMenuBtn.querySelector('svg').innerHTML = '<path d="M3 12h18M3 6h18M3 18h18"></path>';
    }
  });
});


// =========================
// Hero parallax effect
// =========================
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

// =========================
// Smart Sticky Header
// Hide on scroll down, show on scroll up
// =========================
const nav = document.querySelector('nav');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
  let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

  if (currentScroll > lastScrollTop) {
    // scrolling down → hide nav
    nav.classList.add('hide');
  } else {
    // scrolling up → show nav
    nav.classList.remove('hide');
  }

  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section[id], div[id].research-section"); 
  const navLinks = document.querySelectorAll(".nav-links a, .mobile-menu a");

  function activateMenu() {
    let scrollPos = window.scrollY + window.innerHeight / 2;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute("id");

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove("active");
          if (link.getAttribute("onclick")?.includes(id) || link.getAttribute("href")?.includes(id)) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", activateMenu);
  activateMenu(); // run on load
});

function handleProductClick(event) {
  const isLandingPage = window.location.pathname.endsWith("index.html") || window.location.pathname === "/" ;

  if (isLandingPage) {
    event.preventDefault(); // prevent navigation
    const section = document.getElementById('work');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

// Highlight active link
document.addEventListener("DOMContentLoaded", function() {
  const desktopLink = document.getElementById('products-link');
  const mobileLink = document.getElementById('products-link-mobile');

  const links = [desktopLink, mobileLink];

  // On products page, mark active
  if (window.location.pathname.includes("products/project.html")) {
    links.forEach(link => link.classList.add('active-link'));
  } else {
    // On landing page, highlight when scrolling to #work
    const section = document.getElementById('work');
    window.addEventListener('scroll', () => {
      const rect = section.getBoundingClientRect();
      const active = rect.top <= 150 && rect.bottom >= 150;
      links.forEach(link => {
        if (active) link.classList.add('active-link');
        else link.classList.remove('active-link');
      });
    });
  }
});
  document.addEventListener("DOMContentLoaded", () => {
    const aboutLink = document.getElementById("about-link");

    // Check if we are on index.html or root "/"
    const currentPage = window.location.pathname.split("/").pop();
    if (aboutLink && (currentPage === "" || currentPage === "index.html")) {
      aboutLink.classList.add("active");
    }
  });
