import { db } from "./firebase.js";
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
const particlesContainer = document.getElementById('particles');

const form = document.getElementById("projectForm");
const nameEl   = document.getElementById("name");    
const emailEl  = document.getElementById("email");
const phoneEl  = document.getElementById("phone");
const addrEl   = document.getElementById("address");

  document.addEventListener("DOMContentLoaded", () => {
    const contactLink = document.getElementById("contact-link");
    if (contactLink) {
      contactLink.classList.add("active");
    }
  });

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const payload = {
    name:   nameEl?.value?.trim()   || "",
    email:  emailEl?.value?.trim()  || "",
    phone:  phoneEl?.value?.trim()  || "",
    address:addrEl?.value?.trim()   || "",
    createdAt: serverTimestamp()
  };

  try {
    await addDoc(collection(db, "contacts"), payload);
    alert("✅ Your message has been sent!");
    form.reset();
  } catch (err) {
    // show the real reason
    console.error("[Firestore write error]", err);
    alert(`❌ Failed: ${err.code || ""} ${err.message || err}`);
  }
});


if (particlesContainer) {
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const size = Math.random() * 5 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.background = `rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1})`;
        particle.style.borderRadius = '50%';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Animation
        const keyframes = [
            { 
                opacity: 0.1,
                transform: 'translate(0, 0)'
            },
            { 
                opacity: 0.8,
                transform: `translate(${(Math.random() - 0.5) * 100}px, ${(Math.random() - 0.5) * 100}px)`
            },
            { 
                opacity: 0.1,
                transform: `translate(${(Math.random() - 0.5) * 100}px, ${(Math.random() - 0.5) * 100}px)`
            }
        ];
        
        const options = {
            duration: Math.random() * 10000 + 10000,
            iterations: Infinity,
            easing: 'linear'
        };
        
        particle.animate(keyframes, options);
        particlesContainer.appendChild(particle);
    }
}

// Button background animation
function animateButtonBg(element) {
    if (!element) return;
    
    const keyframes = [
        { opacity: 0 },
        { opacity: 1 },
        { opacity: 0 }
    ];
    
    const options = {
        duration: 3000,
        iterations: Infinity
    };
    
    element.animate(keyframes, options);
}

animateButtonBg(document.getElementById('btnBg'));
animateButtonBg(document.getElementById('ctaBtnBg'));

// Form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert("Message sent! We'll be in touch soon.");
        contactForm.reset();
    });
}

// Main DOM ready handler
document.addEventListener('DOMContentLoaded', function() {
    // Initialize globe after a short delay
    setTimeout(initGlobe, 100);
    
    // Dialog functionality
    const projectBtn = document.querySelector('.cta-btn');
    const dialogOverlay = document.getElementById('dialogOverlay');
    const dialogContainer = document.getElementById('dialogContainer');
    const closeBtn = document.getElementById('closeBtn');
    const projectForm = document.getElementById('projectForm');
    const mainHeader = document.querySelector('nav'); // Get the nav header
    
    if (projectBtn && dialogOverlay) {
        // Open dialog
        projectBtn.addEventListener('click', function(e) {
            e.preventDefault();
            dialogOverlay.style.display = 'flex';
            if (mainHeader) mainHeader.classList.add('hidden');
            
            setTimeout(() => {
                dialogOverlay.classList.add('show');
                dialogContainer.classList.add('show');
            }, 10);
        });
        
        // Close dialog
        function closeDialog() {
            dialogContainer.classList.remove('show');
            setTimeout(() => {
                dialogOverlay.classList.remove('show');
                setTimeout(() => {
                    dialogOverlay.style.display = 'none';
                    if (mainHeader) mainHeader.classList.remove('hidden');
                }, 500);
            }, 500);
        }
        
        closeBtn.addEventListener('click', closeDialog);
        dialogOverlay.addEventListener('click', function(e) {
            if (e.target === dialogOverlay) closeDialog();
        });
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && dialogOverlay.classList.contains('show')) {
                closeDialog();
            }
        });
        
        if (projectForm) {
            projectForm.addEventListener('submit', function(e) {
                e.preventDefault();
                alert('Form submitted successfully!');
                closeDialog();
            });
        }
    }
});

// Globe implementation - NOTE: Requires Three.js and ThreeGlobe to be loaded first
function initGlobe() {
    // Check if required libraries are available
    if (typeof THREE === 'undefined' || typeof ThreeGlobe === 'undefined') {
        console.warn('Three.js or ThreeGlobe not loaded - skipping globe initialization');
        return;
    }

    const markers = [
        {
            lat: 37.0902,
            lng: -95.7129,
            label: "USA Office - New York, USA",
            address: "New York, USA",
            phone: "+1 (212) 555-7890",
            email: "ny@company.com"
        },
        {
            lat: 56.1304,
            lng: -106.3468,
            label: "Canada Office - Toronto, Canada",
            address: "Toronto, Canada",
            phone: "+44 20 7946 0958",
            email: "london@company.com"
        },
        {
            lat: 20.5937,
            lng: 78.9629,
            label: "India Office - New Delhi, India",
            address: "New Delhi, India",
            phone: "+91 87-90-8769-97",
            email: "india@company.com"
        }
    ];
    
    const globe = new ThreeGlobe()
        .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
        .htmlElementsData(markers)
        .htmlElement(d => {
            const el = document.createElement('div');
            el.innerHTML = `<div class="globe-marker">📍</div>`;
            el.style.position = 'absolute';
            
            el.addEventListener('mouseover', () => {
                el.style.transform = 'scale(1.5)';
                showTooltip(d);
            });
            
            el.addEventListener('mouseout', () => {
                el.style.transform = 'scale(1)';
                hideTooltip();
            });
            
            return el;
        })
        .htmlLat(d => d.lat)
        .htmlLng(d => d.lng);
    
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(1200, 600);
    renderer.setClearColor(0xffffff, 0);
    
    const globeContainer = document.getElementById('globe');
    if (globeContainer) {
        globeContainer.appendChild(renderer.domElement);
        
        const scene = new THREE.Scene();
        scene.add(globe);
        scene.add(new THREE.AmbientLight(0xcccccc));
        scene.add(new THREE.DirectionalLight(0xffffff, 0.8));
        
        const camera = new THREE.PerspectiveCamera();
        camera.aspect = 1200/600;
        camera.updateProjectionMatrix();
        
        // Calculate center of all markers
        const centerLat = markers.reduce((sum, m) => sum + m.lat, 0) / markers.length;
        const centerLng = markers.reduce((sum, m) => sum + m.lng, 0) / markers.length;
        globe.pointOfView({ lat: centerLat, lng: centerLng, altitude: 2.5 });
        
        const controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.3;
        controls.enableZoom = false;
        controls.enablePan = false;
        
        (function animate() {
            controls.update();
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        })();
    }
}

// Helper functions for tooltip (make sure you have these elements in your HTML)
function showTooltip(data) {
    const tooltip = document.getElementById('markerTooltip');
    if (!tooltip) return;
    
    // Update tooltip content here
    tooltip.style.display = 'block';
    tooltip.animate([
        { opacity: 0, transform: 'translateY(10px)' },
        { opacity: 1, transform: 'translateY(0)' }
    ], { duration: 300, easing: 'ease-out' });
}

function hideTooltip() {
    const tooltip = document.getElementById('markerTooltip');
    if (!tooltip) return;
    
    tooltip.animate([
        { opacity: 1, transform: 'translateY(0)' },
        { opacity: 0, transform: 'translateY(10px)' }
    ], { 
        duration: 200, 
        easing: 'ease-in' 
    }).onfinish = () => {
        tooltip.style.display = 'none';
    };
}
document.addEventListener('DOMContentLoaded', function () {
    const nav = document.querySelector('nav');
    const dialog = document.getElementById('dialogContainer');
    let lastScrollTop = 0;
    const delta = 5;
    let ticking = false;

    function updateNavVisibility() {
        const st = window.pageYOffset || document.documentElement.scrollTop;

        // Hide nav if dialog is visible
        if (dialog && dialogOverlay.classList.contains('show')) {
            nav.style.transform = 'translateY(-100%)';
            nav.style.transition = 'transform 0.3s ease';
            lastScrollTop = st;
            return;
        }

        if (Math.abs(st - lastScrollTop) > delta) {
            if (st > lastScrollTop) {
                // Scroll Down → hide nav
                nav.style.transform = 'translateY(-100%)';
            } else {
                // Scroll Up → show nav
                nav.style.transform = 'translateY(0)';
            }
            nav.style.transition = 'transform 0.3s ease';
            lastScrollTop = st <= 0 ? 0 : st;
        }
    }

    window.addEventListener('scroll', function () {
        if (!ticking) {
            window.requestAnimationFrame(function () {
                updateNavVisibility();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Also watch dialog open/close to hide/show nav immediately
    const observer = new MutationObserver(updateNavVisibility);
    if (dialog) {
        observer.observe(dialog, { attributes: true, attributeFilter: ['style', 'class'] });
    }
});
