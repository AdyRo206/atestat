document.addEventListener('DOMContentLoaded', function() {
    const carouselImages = document.getElementById('carousel-images');
    const images = carouselImages.children;
    const totalImages = images.length;
    let index = 0;
    let interval;

    const firstImageClone = images[0].cloneNode(true);
    carouselImages.appendChild(firstImageClone);

    function updateCarousel() {
        const width = carouselImages.clientWidth;
        carouselImages.style.transition = 'transform 0.5s ease-in-out';
        carouselImages.style.transform = `translateX(${-index * width}px)`;

        if (index === totalImages) {
            setTimeout(() => {
                carouselImages.style.transition = 'none';
                index = 0;
                carouselImages.style.transform = `translateX(0)`;
            }, 500); 
        }
    }

    function startAutoSlide() {
        interval = setInterval(() => {
            index++;
            updateCarousel();
        }, 4000); 
    }

    function resetInterval() {
        clearInterval(interval);
        startAutoSlide();
    }

    document.getElementById('nextBtn').addEventListener('click', () => {
        index++;
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


