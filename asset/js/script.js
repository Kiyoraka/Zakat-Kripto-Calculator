// Initialize Lucide icons
lucide.createIcons();

// Sample data - In a real application, this would come from your backend
const portfolioData = {
    totalValue: 25000.00,
    zakatAmount: 625.00, // 2.5% of total value
    nextDueDate: '2024-12-25'
};

// Update dashboard values
function updateDashboard() {
    document.getElementById('portfolioValue').textContent = 
        `$${portfolioData.totalValue.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
    
    document.getElementById('estimatedZakat').textContent = 
        `$${portfolioData.zakatAmount.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
    
    document.getElementById('nextZakat').textContent = 
        new Date(portfolioData.nextDueDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
}

// Add click event listeners to navigation items
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        // Remove active class from all links
        document.querySelectorAll('nav a').forEach(l => 
            l.classList.remove('bg-gray-100'));
        // Add active class to clicked link
        link.classList.add('bg-gray-100');
    });
});

// Initialize dashboard
updateDashboard();