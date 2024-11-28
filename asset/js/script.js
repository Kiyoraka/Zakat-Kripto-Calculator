// Initialize Lucide icons
lucide.createIcons();

// Carousel configuration
const carouselImages = [
    { src: 'img/dalil1.jpg', caption: 'Test 1' },
    { src: 'img/dalil2.jpg', caption: 'Test 2' },
    { src: 'img/dalil3.jpg', caption: 'Test 3' }
];

let currentImageIndex = 0;

// Initialize carousel
function initCarousel() {
    const carouselInner = document.querySelector('.carousel-inner');
    carouselImages.forEach((image, index) => {
        const div = document.createElement('div');
        div.className = 'carousel-item w-full flex-shrink-0';
        div.innerHTML = `
            <img src="${image.src}" alt="Dalil ${index + 1}" class="w-full h-64 object-cover">
            <div class="p-4 bg-white">
                <p class="text-gray-700">${image.caption}</p>
            </div>
        `;
        carouselInner.appendChild(div);
    });
    updateCarousel();
}

// Update carousel position
function updateCarousel() {
    const carouselInner = document.querySelector('.carousel-inner');
    carouselInner.style.transform = `translateX(-${currentImageIndex * 100}%)`;
}

// Carousel navigation
document.getElementById('prevBtn').addEventListener('click', () => {
    currentImageIndex = (currentImageIndex - 1 + carouselImages.length) % carouselImages.length;
    updateCarousel();
});

document.getElementById('nextBtn').addEventListener('click', () => {
    currentImageIndex = (currentImageIndex + 1) % carouselImages.length;
    updateCarousel();
});

// Page navigation
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const pageId = link.getAttribute('data-page');
        
        // Update active nav item
        document.querySelectorAll('nav a').forEach(l => 
            l.classList.remove('bg-gray-100'));
        link.classList.add('bg-gray-100');
        
        // Show selected page
        document.querySelectorAll('.page').forEach(page => 
            page.classList.add('hidden'));
        document.getElementById(`${pageId}-page`).classList.remove('hidden');
    });
});

// Zakat Calculator
document.getElementById('zakat-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const cryptoValue = parseFloat(document.getElementById('crypto-value').value);
    const zakatAmount = cryptoValue * 0.025; // 2.5% zakat rate
    
    const resultDiv = document.getElementById('result');
    const zakatAmountEl = document.getElementById('zakat-amount');
    
    resultDiv.classList.remove('hidden');
    zakatAmountEl.textContent = `$${zakatAmount.toFixed(2)}`;
});

// Initialize carousel on load
initCarousel();

// Show default page (Dalil Zakat)
document.querySelector('[data-page="dalil"]').classList.add('bg-gray-100');