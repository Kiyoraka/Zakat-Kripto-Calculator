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

// Page Navigation
function initializePageNavigation() {
    const pages = document.querySelectorAll('.page');
    const navLinks = document.querySelectorAll('[data-page]');  // Updated selector

    function showPage(pageId) {
        // Hide all pages
        pages.forEach(page => {
            page.classList.add('hidden');
            page.classList.remove('active');
        });

        // Show selected page
        const selectedPage = document.getElementById(`${pageId}-page`);
        if (selectedPage) {
            selectedPage.classList.remove('hidden');
            selectedPage.classList.add('active');
        }

        // Update navigation state
        navLinks.forEach(link => {
            if (link.getAttribute('data-page') === pageId) {  // Updated attribute check
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
            const pageId = link.getAttribute('data-page');  // Updated attribute
            showPage(pageId);
        });
    });

    // Show default page on load
    showPage('dalil');
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    initCarousel();
    initializePageNavigation();  // Initialize page navigation

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
});