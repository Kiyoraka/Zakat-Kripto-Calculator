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
    const navLinks = document.querySelectorAll('[data-page]');

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
            if (link.getAttribute('data-page') === pageId) {
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
            const pageId = link.getAttribute('data-page');
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

// Constants for Zakat Calculator

// Gold price fetching functionality
let GOLD_PRICE_PER_GRAM = 280; // Default value
let NISAB_THRESHOLD = GOLD_PRICE_PER_GRAM * 85;

async function fetchGoldPrice() {
    try {
        const response = await fetch('https://api.gold-api.com/price/XAU');
        
        if (!response.ok) {
            throw new Error('Failed to fetch gold price');
        }

        const data = await response.json();
        
        // The API returns price in USD per troy ounce
        // Convert to MYR per gram (approximate conversion rate: 1 USD = 4.70 MYR)
        // 1 troy ounce = 31.1034768 grams
        const priceInMYR = data.price * 4.70; // Convert USD to MYR
        GOLD_PRICE_PER_GRAM = priceInMYR / 31.1034768; // Convert per ounce to per gram
        
        // Update nisab threshold
        NISAB_THRESHOLD = GOLD_PRICE_PER_GRAM * 85;
        
        // Update UI
        updateGoldPriceDisplay();
        
        return GOLD_PRICE_PER_GRAM;
    } catch (error) {
        console.error('Error fetching gold price:', error);
        // Show error in UI
        document.getElementById('goldPriceIndicator').innerHTML = `
            <span class="text-yellow-800">
                Menggunakan harga emas default: RM ${GOLD_PRICE_PER_GRAM.toFixed(2)}/gram
            </span>
        `;
        return GOLD_PRICE_PER_GRAM;
    }
}

function updateGoldPriceDisplay() {
    const indicatorEl = document.getElementById('goldPriceIndicator');
    if (indicatorEl) {
        indicatorEl.innerHTML = `
            <span>Harga Emas Semasa: RM ${GOLD_PRICE_PER_GRAM.toFixed(2)}/gram</span>
            <span class="text-sm text-gray-600 ml-2">(Nisab: RM ${NISAB_THRESHOLD.toFixed(2)})</span>
        `;
    }

    // Update nisab display in info box if it exists
    const nisabEl = document.getElementById('currentNisab');
    if (nisabEl) {
        nisabEl.textContent = `RM ${NISAB_THRESHOLD.toFixed(2)} (85 gram emas)`;
    }
}



const ZAKAT_RATE = 0.025; // 2.5%
const MIN_HOLDING_DAYS = 365;

// Form handling
document.addEventListener('DOMContentLoaded', () => {
    // Add form submit handler
    document.getElementById('zakatForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        calculateZakat();
    });
});

function calculateZakat() {
    // Get form values
    const initialValue = parseFloat(document.getElementById('initialValue').value);
    const purchaseDate = new Date(document.getElementById('purchaseDate').value);
    const currentValue = parseFloat(document.getElementById('currentValue').value);
    
    // Calculate holding period
    const today = new Date();
    const holdingPeriod = Math.floor((today - purchaseDate) / (1000 * 60 * 60 * 24)); // Convert to days
    
    // Update payment date
    document.getElementById('paymentDate').value = today.toISOString().split('T')[0];
    
    // Calculate zakat amount
    let zakatAmount = 0;
    let isEligible = false;
    let statusMessage = '';
    let explanation = '';

    // Check holding period
    if (holdingPeriod < MIN_HOLDING_DAYS) {
        statusMessage = 'Belum Mencukupi Haul';
        explanation = `Tempoh pemegangan kripto anda adalah ${holdingPeriod} hari. Zakat hanya perlu dibayar selepas tempoh pemegangan melebihi 365 hari.`;
    }
    // Check nisab threshold
    else if (currentValue < NISAB_THRESHOLD) {
        statusMessage = 'Tidak Mencukupi Nisab';
        explanation = `Nilai semasa kripto anda (RM ${currentValue.toFixed(2)}) adalah kurang daripada nilai nisab semasa (RM ${NISAB_THRESHOLD.toFixed(2)}).`;
    }
    // Eligible for zakat
    else {
        isEligible = true;
        zakatAmount = currentValue * ZAKAT_RATE;
        statusMessage = 'Wajib Zakat';
        explanation = `Nilai semasa kripto anda telah mencapai nisab dan haul. Anda wajib membayar zakat sebanyak RM ${zakatAmount.toFixed(2)}.`;
    }

    // Update UI
    updateZakatInfo(isEligible, statusMessage, explanation, holdingPeriod, GOLD_PRICE_PER_GRAM, zakatAmount);
}

function updateZakatInfo(isEligible, status, explanation, holdingPeriod, GOLD_PRICE_PER_GRAM, zakatAmount) {
    // Update zakat amount field
    document.getElementById('zakatAmount').value = zakatAmount.toFixed(2);

    // Show info box
    const infoBox = document.getElementById('zakatInfo');
    infoBox.classList.remove('hidden');

    // Update status box styling and content
    const statusBox = document.getElementById('zakatStatusBox');
    statusBox.className = `p-4 rounded-lg ${isEligible ? 'bg-green-50' : 'bg-yellow-50'}`;
    
    document.getElementById('zakatStatus').textContent = status;
    document.getElementById('zakatStatus').className = `font-medium mb-2 ${isEligible ? 'text-green-800' : 'text-yellow-800'}`;
    
    document.getElementById('zakatExplanation').textContent = explanation;

    // Update calculation details
    document.getElementById('ownershipPeriod').textContent = `${holdingPeriod} hari`;
    document.getElementById('currentGoldPrice').textContent = `RM ${GOLD_PRICE_PER_GRAM}`;
    document.getElementById('currentNisab').textContent = `RM ${NISAB_THRESHOLD.toFixed(2)} (85 gram emas)`;
}

// Helper function to format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('ms-MY', {
        style: 'currency',
        currency: 'MYR'
    }).format(amount);
}