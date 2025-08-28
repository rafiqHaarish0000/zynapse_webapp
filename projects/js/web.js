// Simple animation on scroll
$(document).ready(function() {
    $(window).scroll(function() {
        $('.animate__animated').each(function() {
            var position = $(this).offset().top;
            var scroll = $(window).scrollTop();
            var windowHeight = $(window).height();
            
            if (scroll > position - windowHeight + 100) {
                var animation = $(this).attr('data-animation');
                $(this).addClass(animation);
            }
        });
    });
    
    // Smooth scrolling for anchor links
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        
        var target = this.hash;
        var $target = $(target);
        
        $('html, body').animate({
            'scrollTop': $target.offset().top
        }, 800, 'swing', function() {
            window.location.hash = target;
        });
    });
    
    // Initialize tooltips
    $('[data-toggle="tooltip"]').tooltip();
    
    // Initialize popovers
    $('[data-toggle="popover"]').popover();
});
 document.addEventListener("DOMContentLoaded", () => {
    const footer = document.querySelector('.custom-footer');
    footer.classList.add('show'); // this will trigger the fade-in
  });