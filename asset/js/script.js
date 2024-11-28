// script.js

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
    if (!carouselInner) return;

    // Clear existing content
    carouselInner.innerHTML = '';

    // Add images
    carouselImages.forEach((image, index) => {
        const div = document.createElement('div');
        div.className = 'carousel-item w-full h-full flex-shrink-0';
        div.innerHTML = `
            <img 
                src="${image.src}" 
                alt="Dalil ${index + 1}" 
                class="w-full h-full object-cover"
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
    stopAutoplay();
    autoplayInterval = setInterval(() => {
        currentImageIndex = (currentImageIndex + 1) % carouselImages.length;
        updateCarousel();
    }, 5000);
}

function stopAutoplay() {
    if (autoplayInterval) {
        clearInterval(autoplayInterval);
    }
}

// Page navigation
function initializePageNavigation() {
    const pages = document.querySelectorAll('.page');
    const navLinks = document.querySelectorAll('[page]');

    function showPage(pageId) {
        // Hide all pages
        pages.forEach(page => {
            page.classList.add('hidden');
        });

        // Show selected page
        const selectedPage = document.getElementById(`${pageId}-page`);
        if (selectedPage) {
            selectedPage.classList.remove('hidden');
        }

        // Update navigation state
        navLinks.forEach(link => {
            if (link.getAttribute('page') === pageId) {
                link.classList.add('bg-green-50', 'text-green-700');
            } else {
                link.classList.remove('bg-green-50', 'text-green-700');
            }
        });
    }

    // Add click handlers to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = link.getAttribute('page');
            showPage(pageId);
        });
    });

    // Show default page
    showPage('dalil');
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    initCarousel();
    initializePageNavigation();
    
    // Carousel navigation buttons
    document.getElementById('prevBtn')?.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + carouselImages.length) % carouselImages.length;
        updateCarousel();
        stopAutoplay();
        startAutoplay();
    });

    document.getElementById('nextBtn')?.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % carouselImages.length;
        updateCarousel();
        stopAutoplay();
        startAutoplay();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            document.getElementById('prevBtn')?.click();
        } else if (e.key === 'ArrowRight') {
            document.getElementById('nextBtn')?.click();
        }
    });
});