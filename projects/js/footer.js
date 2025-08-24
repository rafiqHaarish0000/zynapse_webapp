// Newsletter specific animations
function initNewsletterAnimations() {
  // Slow-reveal on scroll
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    })
  }, { threshold: 0.2 })

  document.querySelectorAll('.reveal').forEach(el=>io.observe(el))

  // Gentle floating/parallax for the globe (very subtle, slow)
  const globe = document.querySelector('.globe');
  let t = 0;
  function animate(){
    t += 0.002; // slow motion
    const y = Math.sin(t) * 6; // px
    const x = Math.cos(t*0.8) * 4;
    if (globe) {
      globe.style.transform = `translate(${x}px, calc(-50% + ${y}px))`;
    }
    requestAnimationFrame(animate);
  }
  if(globe) requestAnimationFrame(animate);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initNewsletterAnimations();
});