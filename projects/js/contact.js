// Create particles
const particlesContainer = document.getElementById('particles');
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

// Button background animation
const btnBg = document.getElementById('btnBg');
const ctaBtnBg = document.getElementById('ctaBtnBg');

function animateButtonBg(element) {
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

if (btnBg) animateButtonBg(btnBg);
if (ctaBtnBg) animateButtonBg(ctaBtnBg);

// Form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert("Message sent! We'll be in touch soon.");
        contactForm.reset();
    });
}

// Globe implementation
document.addEventListener('DOMContentLoaded', function() {
    // Wait for the DOM to be fully loaded before initializing the globe
    setTimeout(initGlobe, 100);
});

function initGlobe() {
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
    
    // Calculate center of all markers
    const lats = markers.map(m => m.lat);
    const lngs = markers.map(m => m.lng);
    const centerLat = lats.reduce((a, b) => a + b, 0) / lats.length;
    const centerLng = lngs.reduce((a, b) => a + b, 0) / lngs.length;
    
    // Create the Globe
    const globe = new ThreeGlobe()
        .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
        .htmlElementsData(markers)
        .htmlElement(d => {
            const el = document.createElement('div');
            el.innerHTML = `
                <div style="
                    width: 30px;
                    height: 30px;
                    background: #7375fe;
                    border-radius: 50%;
                    border: 2px solid white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-size: 12px;
                    cursor: pointer;
                    transform: scale(1);
                    transition: transform 0.2s ease;
                ">
                    📍
                </div>
            `;
            el.style.position = 'absolute';
            el.style.transformOrigin = 'center center';
            
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
    
    // Setup renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(1200, 600);
    renderer.setClearColor(0xffffff, 0);
    document.getElementById('globe').appendChild(renderer.domElement);
    
    // Setup scene
    const scene = new THREE.Scene();
    scene.add(globe);
    scene.add(new THREE.AmbientLight(0xcccccc));
    scene.add(new THREE.DirectionalLight(0xffffff, 0.8));
    
    // Setup camera
    const camera = new THREE.PerspectiveCamera();
    camera.aspect = 1200/600;
    camera.updateProjectionMatrix();
    
    // Set initial camera position
    globe.pointOfView({ lat: centerLat, lng: centerLng, altitude: 2.5 });
    
    // Add auto-rotation
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.3;
    controls.enableZoom = false;
    controls.enablePan = false;
    
    // Animation loop
    (function animate() {
        controls.update();
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    })();
    
    // Tooltip functions
    function showTooltip(data) {
        const tooltip = document.getElementById('markerTooltip');
        const title = document.getElementById('tooltipTitle');
        const address = document.getElementById('tooltipAddress');
        const phone = document.getElementById('tooltipPhone');
        const email = document.getElementById('tooltipEmail');
        
        title.textContent = data.label;
        address.textContent = data.address || `${data.lat.toFixed(4)}, ${data.lng.toFixed(4)}`;
        phone.textContent = data.phone || "+1 (555) 123-4567";
        email.textContent = data.email || "contact@example.com";
        
        tooltip.style.display = 'block';
        
        // Animate tooltip appearance
        tooltip.animate([
            { opacity: 0, transform: 'translateY(10px)' },
            { opacity: 1, transform: 'translateY(0)' }
        ], {
            duration: 300,
            easing: 'ease-out'
        });
    }
    
    function hideTooltip() {
        const tooltip = document.getElementById('markerTooltip');
        
        // Animate tooltip disappearance
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
    
    // Handle window resize
    window.addEventListener('resize', function() {
        camera.aspect = 1200/600;
        camera.updateProjectionMatrix();
        renderer.setSize(1200, 600);
    });
}