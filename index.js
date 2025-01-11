document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.testimonial-card');
    const carouselControls = document.querySelector('.carousel-controls');
    let currentSlide = 0;
    let isMobile = window.innerWidth <= 768;

    // Create carousel dots
    function createDots() {
        carouselControls.innerHTML = '';
        cards.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('carousel-dot');
            if (index === currentSlide) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            carouselControls.appendChild(dot);
        });
    }

    // Show specific slide
    function goToSlide(index) {
        if (!isMobile) return;
        
        cards.forEach(card => card.classList.remove('active'));
        const dots = document.querySelectorAll('.carousel-dot');
        dots.forEach(dot => dot.classList.remove('active'));
        
        cards[currentSlide].classList.remove('active');
        cards[index].classList.add('active');
        dots[index].classList.add('active');
        
        currentSlide = index;
    }

    // Auto-advance slides
    function autoAdvance() {
        if (!isMobile) return;
        
        const nextSlide = (currentSlide + 1) % cards.length;
        goToSlide(nextSlide);
    }

    // Initialize carousel for mobile
    function initCarousel() {
        isMobile = window.innerWidth <= 768;
        if (isMobile) {
            createDots();
            goToSlide(0);
            // Start auto-advance
            setInterval(autoAdvance, 5000);
        } else {
            // Reset for desktop view
            cards.forEach(card => card.classList.remove('active'));
            carouselControls.innerHTML = '';
        }
    }

    // Handle window resize
    window.addEventListener('resize', initCarousel);

    // Initial setup
    initCarousel();
});