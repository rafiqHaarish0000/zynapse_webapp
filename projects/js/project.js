class ScrollImageMerger {  
  constructor() {
    this.stickyWrapper = document.getElementById("stickyWrapper");
    this.images = [
      document.getElementById("img3"),
      document.getElementById("img4"),
      document.getElementById("img5"),
      document.getElementById("img6")
    ];
    this.centerText = document.getElementById("centerText");

    this.bindEvents();
  }

  bindEvents() {
    window.addEventListener("scroll", () => this.updateAnimation());
  }

  updateAnimation() {
    const rect = this.stickyWrapper.getBoundingClientRect();
    const sectionHeight = this.stickyWrapper.offsetHeight - window.innerHeight;

    let scrollProgress = 0;

    if (rect.top <= 0 && Math.abs(rect.top) <= sectionHeight) {
      scrollProgress = Math.min(Math.abs(rect.top) / sectionHeight, 1);
    } else if (rect.top > 0) {
      scrollProgress = 0;
    } else if (Math.abs(rect.top) > sectionHeight) {
      scrollProgress = 1;
    }

    // Define when center text should appear
    const centerTextThreshold = 0.6;

    // Stop expansion once threshold is reached
    const effectiveProgress = Math.min(scrollProgress, centerTextThreshold);

    const offsetX = (window.innerWidth / 2) * effectiveProgress;
    const offsetY = (window.innerHeight / 2) * effectiveProgress;

    const sizes = [
      { w: 350, h: 150 },
      { w: 350, h: 150 },
      { w: 550, h: 150 },
      { w: 550, h: 150 }
    ];

    this.images.forEach((img, i) => {
      const baseW = 200;
      const baseH = 300;

      const newW = baseW + (sizes[i].w - baseW) * effectiveProgress;
      const newH = baseH + (sizes[i].h - baseH) * effectiveProgress;

      img.style.width = `${newW}px`;
      img.style.height = `${newH}px`;
    });

    // Position the 4 cards (2 on top, 2 on bottom)
    this.images[0].style.transform = `translate(${-offsetX}px, ${-offsetY}px)`; // Top-left
    this.images[1].style.transform = `translate(${offsetX}px, ${-offsetY}px)`;  // Top-right
    this.images[2].style.transform = `translate(${-offsetX}px, ${offsetY}px)`;  // Bottom-left
    this.images[3].style.transform = `translate(${offsetX}px, ${offsetY}px)`;   // Bottom-right

    // Show center text
    if (scrollProgress >= centerTextThreshold) {
      this.centerText.classList.add("show");
    } else {
      this.centerText.classList.remove("show");
    }
  }
}
// Tilt effect for each image card
document.querySelectorAll('.image-wrapper').forEach(wrapper => {
  const img = wrapper.querySelector('img');

  wrapper.addEventListener('mousemove', (e) => {
    const rect = wrapper.getBoundingClientRect();
    const x = e.clientX - rect.left; // mouse X inside
    const y = e.clientY - rect.top;  // mouse Y inside
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * 10; // max 10deg
    const rotateY = ((x - centerX) / centerX) * 10;

    img.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  });

  wrapper.addEventListener('mouseleave', () => {
    img.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`; // reset
  });
});

const hiddenElements = document.querySelectorAll('.hidden');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target); // animate only once
      }
    });
  }, { threshold: 0.2 });

  hiddenElements.forEach(el => observer.observe(el));

  
  document.getElementById('img6').addEventListener('click', function() {
    window.location.href = 'target-page.html'; // Replace with your page
  });

  document.addEventListener("DOMContentLoaded", () => {
    const currentPage = window.location.pathname.split("/").pop(); 
    const productsLink = document.getElementById("products-link");

    if (currentPage === "project.html") {
      productsLink.classList.add("active");
    }
  });

new ScrollImageMerger();
