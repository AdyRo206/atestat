document.addEventListener('DOMContentLoaded', function() {
    const carouselImages = document.getElementById('carousel-images');
    const totalImages = carouselImages.children.length;
    let index = 0;
    let interval;

    function updateCarousel() {
        const width = carouselImages.clientWidth;
        carouselImages.style.transform = `translateX(${-index * width}px)`;
    }

    function startAutoSlide() {
        interval = setInterval(() => {
            index = (index + 1) % totalImages;
            updateCarousel();
        }, 4000); 
    }

    function resetInterval() {
        clearInterval(interval); 
        startAutoSlide(); 
    }

    document.getElementById('nextBtn').addEventListener('click', () => {
        index = (index + 1) % totalImages;
        updateCarousel();
        resetInterval(); 
    });

    document.getElementById('prevBtn').addEventListener('click', () => {
        index = (index - 1 + totalImages) % totalImages;
        updateCarousel();
        resetInterval(); 
    });

    window.addEventListener('resize', updateCarousel);
    startAutoSlide(); 
});
