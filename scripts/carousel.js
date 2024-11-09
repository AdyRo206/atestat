document.addEventListener('DOMContentLoaded', function() {
    const carouselImages = document.getElementById('carousel-images');
    const images = carouselImages.children;
    const totalImages = images.length;
    let i = 0;
    let interval;

    const firstImageClone = images[0].cloneNode(true);
    carouselImages.appendChild(firstImageClone);

    function updateCarousel() {
        const width = carouselImages.clientWidth;
        carouselImages.style.transition = 'transform 0.5s ease-in-out';
        carouselImages.style.transform = `translateX(${-i * width}px)`;

        if (i === totalImages) {
            setTimeout(() => {
                carouselImages.style.transition = 'none';
                i = 0;
                carouselImages.style.transform = `translateX(0)`;
            }, 500); 
        }
    }

    function startAutoSlide() {
        interval = setInterval(() => {
            i++;
            updateCarousel();
        }, 4000); 
    }

    function resetInterval() {
        clearInterval(interval);
        startAutoSlide();
    }

    const videos = carouselImages.querySelectorAll('video');

    videos.forEach(video => {
        video.addEventListener('play', () => clearInterval(interval));
        video.addEventListener('pause', resetInterval);
        video.addEventListener('ended', resetInterval);
    });

    document.getElementById('nextBtn').addEventListener('click', () => {
        i++;
        updateCarousel();
        resetInterval();
    });

    document.getElementById('prevBtn').addEventListener('click', () => {
        i = (i - 1 + totalImages) % totalImages;
        updateCarousel();
        resetInterval();
    });

    window.addEventListener('resize', updateCarousel);
    startAutoSlide(); 
});
