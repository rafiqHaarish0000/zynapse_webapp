// =============================
// Intersection Observer for animations
// =============================
document.addEventListener("DOMContentLoaded", function () {
  const animationObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = "running";
        }
      });
    },
    { threshold: 0.1 }
  );

  document
    .querySelectorAll(".floating, .fade-in-text")
    .forEach((el) => animationObserver.observe(el));
});

 document.addEventListener("DOMContentLoaded", () => {
    const contactLink = document.getElementById("about-link");
    if (contactLink) {
      contactLink.classList.add("active");
    }
  });

// =============================
// Sliding Panels (About Section)
// =============================
function handleSlidingPanels() {
  const aboutSection = document.getElementById("aboutContainer");
  const slideContainer = document.getElementById("slideContainer");
  const scrollPosition = window.scrollY;
  const triggerPoint = aboutSection.offsetTop - window.innerHeight * 0.6;

  if (scrollPosition >= triggerPoint) {
    slideContainer.classList.add("open");
  } else {
    slideContainer.classList.remove("open");
  }
}

// Intersection Observer for sliding panels (alternative trigger)
const slideObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const slideContainer = entry.target.querySelector("#slideContainer");
      if (entry.isIntersecting) {
        slideContainer.classList.add("open");
      } else {
        slideContainer.classList.remove("open");
      }
    });
  },
  { threshold: 0.3, rootMargin: "0px 0px -50px 0px" }
);

document.addEventListener("DOMContentLoaded", () => {
  const aboutSection = document.getElementById("aboutContainer");
  if (aboutSection) slideObserver.observe(aboutSection);
});

// =============================
// Scroll Handler (ALL effects combined)
// =============================
function handleScroll() {
  const scrollY = window.scrollY;

  // --- Hero fade ---
  const hero = document.querySelector(".hero");
  const heroContent = document.querySelector(".hero-content");
  if (hero && heroContent) {
    const heroHeight = hero.offsetHeight;
    const heroProgress = Math.min(scrollY / heroHeight, 1);

    heroContent.style.opacity = 1 - heroProgress;
    heroContent.style.transform = `translateY(${heroProgress * -50}px)`; // drift up
  }

  // --- About fade ---
  const aboutSection = document.getElementById("aboutContainer");
  if (aboutSection) {
    const sectionTop = aboutSection.offsetTop;
    const sectionHeight = aboutSection.offsetHeight;
    const progress = (scrollY - sectionTop) / sectionHeight;

    if (progress >= 0 && progress <= 1) {
      aboutSection.style.opacity = 1 - progress; // fade 1 → 0
      aboutSection.style.transform = `translateY(${progress * 50}px)`; // drift down
    } else if (progress < 0) {
      aboutSection.style.opacity = 1;
      aboutSection.style.transform = "translateY(0px)";
    } else {
      aboutSection.style.opacity = 0;
    }
  }

  // --- Panels ---
  handleSlidingPanels();
}

// Throttled scroll performance
let ticking = false;
window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      handleScroll();
      ticking = false;
    });
    ticking = true;
  }
});
window.addEventListener("load", handleScroll);
