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

    // Debug: Check if all elements exist
    console.log('Sticky Wrapper:', this.stickyWrapper);
    console.log('Images found:', this.images.filter(img => img).length);
    console.log('Center Text:', this.centerText);

    this.bindEvents();
    this.checkTitles(); // Debug function
  }

  // Debug function to check if titles exist
  checkTitles() {
    const allTitles = document.querySelectorAll('.card-title');
    console.log('Found', allTitles.length, 'card titles');
    allTitles.forEach((title, i) => {
      console.log(`Title ${i + 1}: "${title.textContent}"`);
    });
  }

  bindEvents() {
    window.addEventListener("scroll", () => this.updateAnimation());
  }

  updateAnimation() {
    if (!this.stickyWrapper) return;

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

    // Define thresholds
    const centerTextThreshold = 0.6;
    const titleThreshold = 0.25; // Earlier threshold for better visibility

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

    // Debug scroll progress (remove after testing)
    if (scrollProgress > 0) {
      console.log(`Scroll Progress: ${scrollProgress.toFixed(2)} | Title Threshold: ${titleThreshold}`);
    }

    this.images.forEach((img, i) => {
      if (!img) return; // Safety check

      const baseW = 200;
      const baseH = 300;

      const newW = baseW + (sizes[i].w - baseW) * effectiveProgress;
      const newH = baseH + (sizes[i].h - baseH) * effectiveProgress;

      img.style.width = `${newW}px`;
      img.style.height = `${newH}px`;

      // Show/hide titles based on scroll progress
      if (scrollProgress >= titleThreshold) {
        if (!img.classList.contains("show-title")) {
          img.classList.add("show-title");
          console.log(`✅ Adding show-title to ${img.id}`);
        }
      } else {
        if (img.classList.contains("show-title")) {
          img.classList.remove("show-title");
          console.log(`❌ Removing show-title from ${img.id}`);
        }
      }
    });

    // Position the 4 cards (2 on top, 2 on bottom)
    if (this.images[0]) this.images[0].style.transform = `translate(${-offsetX}px, ${-offsetY}px)`; // Top-left (img3)
    if (this.images[1]) this.images[1].style.transform = `translate(${offsetX}px, ${-offsetY}px)`;  // Top-right (img4)
    if (this.images[2]) this.images[2].style.transform = `translate(${-offsetX}px, ${offsetY}px)`;  // Bottom-left (img5)
    if (this.images[3]) this.images[3].style.transform = `translate(${offsetX}px, ${offsetY}px)`;   // Bottom-right (img6)

    // Show center text
    if (scrollProgress >= centerTextThreshold) {
      this.centerText?.classList.add("show");
    } else {
      this.centerText?.classList.remove("show");
    }
  }
}

// Tilt effect for each image card
document.querySelectorAll('.image-wrapper').forEach(wrapper => {
  const img = wrapper.querySelector('img');
  if (!img) return;

  wrapper.addEventListener('mousemove', (e) => {
    const rect = wrapper.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * 10;
    const rotateY = ((x - centerX) / centerX) * 10;

    img.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  });

  wrapper.addEventListener('mouseleave', () => {
    img.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;
  });
});

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  // Initialize the scroll merger
  new ScrollImageMerger();
  
  // Debug: Force show titles after 3 seconds for testing (REMOVE AFTER DEBUGGING)
  setTimeout(() => {
    console.log('🔧 DEBUG: Force showing all titles for 5 seconds');
    document.querySelectorAll('.image-wrapper').forEach((wrapper, i) => {
      wrapper.classList.add('show-title');
      console.log(`Force showing title for ${wrapper.id}`);
    });
    
    // Remove forced titles after 5 seconds
    setTimeout(() => {
      console.log('🔧 DEBUG: Removing forced titles');
      document.querySelectorAll('.image-wrapper').forEach(wrapper => {
        wrapper.classList.remove('show-title');
      });
    }, 5000);
  }, 3000);

  // Check if titles exist and log their positions
  const titles = document.querySelectorAll('.card-title');
  console.log(`Found ${titles.length} card titles`);
  
  titles.forEach((title, i) => {
    console.log(`Title ${i + 1}: "${title.textContent}"`);
    const rect = title.getBoundingClientRect();
    console.log(`Position: top=${rect.top}, bottom=${rect.bottom}, visible=${rect.top < window.innerHeight && rect.bottom > 0}`);
  });
});

// Other existing functionality
const hiddenElements = document.querySelectorAll('.hidden');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

hiddenElements.forEach(el => observer.observe(el));

// Navigation highlighting
document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname.split("/").pop(); 
  const productsLink = document.getElementById("products-link");

  if (currentPage === "project.html") {
    productsLink?.classList.add("active");
  }
});

// Animate image functionality
document.addEventListener("DOMContentLoaded", () => {
  const image = document.querySelector(".animate-image");

  if (image) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          image.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    observer.observe(image);
  }
});

// Additional navigation highlighting
document.addEventListener("DOMContentLoaded", () => {
  const researchLink = document.getElementById("products-link");
  if (researchLink) {
    researchLink.classList.add("active");
  }
});

// Additional debug function - click anywhere to show/hide titles
document.addEventListener('click', (e) => {
  if (e.ctrlKey) { // Ctrl+Click to toggle titles
    document.querySelectorAll('.image-wrapper').forEach(wrapper => {
      wrapper.classList.toggle('show-title');
    });
    console.log('🔧 DEBUG: Toggled all card titles');
  }
});