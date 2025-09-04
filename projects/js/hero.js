// =========================
// Mobile Menu Toggle
// =========================
console.log("Screen width:", window.innerWidth);
console.log("Screen height:", window.innerHeight);

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

  document.addEventListener("DOMContentLoaded", () => {
    const contactLink = document.getElementById("about-link");
    if (contactLink) {
      contactLink.classList.add("active");
    }
  });


// =========================
// Navigation Handler
// =========================
function handleNavigation(e, link) {
  const href = link.getAttribute('href');
  

  
  // Close mobile menu if open
  if (mobileMenu.classList.contains('active')) {
    mobileMenu.classList.remove('active');
    mobileMenuBtn.querySelector('svg').innerHTML = '<path d="M3 12h18M3 6h18M3 18h18"></path>';
  }
}

// Attach navigation handlers to all nav links
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      handleNavigation(e, link);
    });
  });
});

// =========================
// Hero parallax effect
// =========================


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

// =========================
// Scroll-based Navigation Highlighting
// =========================
document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname;
  const isIndexPage = currentPage.endsWith('index.html') || currentPage === '/' || currentPage.endsWith('/');
  
  // Only run scroll highlighting on index page
  if (!isIndexPage) return;
  
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a[data-section], .mobile-menu a[data-section]");

  function activateMenu() {
    let scrollPos = window.scrollY + 100; // Offset for better triggering
    let activeSection = null;

    // Find which section is currently in view
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");

      if (scrollPos >= top && scrollPos < top + height) {
        activeSection = id;
      }
    });

    // Update active nav links
    navLinks.forEach(link => {
      link.classList.remove("active");
      const linkSection = link.getAttribute("data-section");
      
      if (linkSection === activeSection) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", activateMenu);
  activateMenu(); // run on load
});

// =========================
// Page-specific Navigation Highlighting
// =========================
document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname;
  const navLinks = document.querySelectorAll(".nav-links a, .mobile-menu a");
  
  // Remove active class from all links first
  navLinks.forEach(link => link.classList.remove("active"));
  
  // Add active class to current page links
  navLinks.forEach(link => {
    const href = link.getAttribute("href");
    
    if (currentPage.includes("project.html") && href.includes("project.html")) {
      link.classList.add("active");
    } else if (currentPage.includes("service.html") && href.includes("service.html")) {
      link.classList.add("active");
    } else if (currentPage.includes("research.html") && href.includes("research.html")) {
      link.classList.add("active");
    } else if (currentPage.includes("contact.html") && href.includes("contact.html")) {
      link.classList.add("active");
    } else if ((currentPage.endsWith("index.html") || currentPage === "/" || currentPage.endsWith("/")) && href.includes("index.html")) {
      link.classList.add("active");
    }
  });
});

// =========================
// Legacy function handlers (keeping for compatibility)
// =========================
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
