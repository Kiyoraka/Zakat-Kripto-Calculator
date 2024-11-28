// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', () => {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});

// Carousel configuration
const carouselImages = [
    { src: '/asset/img/Dalil1.jpg' },
    { src: '/asset/img/Dalil2.jpg' },
    { src: '/asset/img/Dalil3.jpg' }
];

let currentImageIndex = 0;
let autoplayInterval;

// Initialize carousel
function initCarousel() {
    const carouselInner = document.querySelector('.carousel-inner');
    if (!carouselInner) return; // Guard clause if element doesn't exist

    // Clear existing content
    carouselInner.innerHTML = '';

    // Add images
    carouselImages.forEach((image, index) => {
        const div = document.createElement('div');
        div.className = 'carousel-item w-full h-full flex-shrink-0 relative';
        div.innerHTML = `
            <img 
                src="${image.src}" 
                alt="Dalil ${index + 1}" 
                class="w-full h-full object-contain"
                onerror="this.src='asset/img/placeholder.jpg';"
            >
        `;
        carouselInner.appendChild(div);
    });

    updateCarousel();
    startAutoplay();
    updateProgressBar();
}

// Update carousel position
function updateCarousel() {
    const carouselInner = document.querySelector('.carousel-inner');
    if (!carouselInner) return;
    
    carouselInner.style.transform = `translateX(-${currentImageIndex * 100}%)`;
    updateProgressBar();
}

// Update progress bar
function updateProgressBar() {
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        const progress = ((currentImageIndex + 1) / carouselImages.length) * 100;
        progressBar.style.width = `${progress}%`;
    }
}

// Autoplay functionality
function startAutoplay() {
    stopAutoplay(); // Clear any existing interval
    autoplayInterval = setInterval(() => {
        currentImageIndex = (currentImageIndex + 1) % carouselImages.length;
        updateCarousel();
    }, 5000); // Change slide every 5 seconds
}

function stopAutoplay() {
    if (autoplayInterval) {
        clearInterval(autoplayInterval);
    }
}

// Event Listeners
document.getElementById('prevBtn')?.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex - 1 + carouselImages.length) % carouselImages.length;
    updateCarousel();
    stopAutoplay();
    startAutoplay(); // Reset autoplay timer
});

document.getElementById('nextBtn')?.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex + 1) % carouselImages.length;
    updateCarousel();
    stopAutoplay();
    startAutoplay(); // Reset autoplay timer
});

// Handle keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        document.getElementById('prevBtn')?.click();
    } else if (e.key === 'ArrowRight') {
        document.getElementById('nextBtn')?.click();
    }
});

// Initialize everything else...
// (Your existing page navigation and calculator code here)

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initCarousel();
    // Show default page (Dalil Zakat)
    document.querySelector('[data-page="dalil"]')?.classList.add('bg-gray-100');
});