# Zakat Crypto Calculator

A web-based application for calculating Zakat on cryptocurrency holdings according to Islamic principles. This calculator helps Muslims determine their Zakat obligations for cryptocurrency investments by considering the current gold price, holding period, and nisab threshold.

## Live Demo

Visit the live application at: [Zakat Kripto Calculator](https://kiyoraka.github.io/Zakat-Kripto-Calculator/)

## Features

- Real-time gold price fetching for accurate nisab calculation
- Automatic calculation of Zakat eligibility based on:
  - Holding period (Haul - 365 days)
  - Minimum threshold (Nisab - equivalent to 85 grams of gold)
- Multi-page interface with:
  - Dalil (Evidence) from Islamic sources with Arabic text
  - Syarat (Requirements) for Zakat
  - Calculator interface
  - FAQ/Help section
- Interactive carousel with Islamic references
- Responsive design for all devices
- Bilingual interface (Malay)

## Technical Stack

- HTML5
- CSS3 with Tailwind CSS for styling
- Vanilla JavaScript
- Lucide Icons for UI elements
- GitHub Pages for hosting

## Local Development

### Prerequisites

- Modern web browser with JavaScript enabled
- Internet connection for gold price API
- Basic understanding of HTML, CSS, and JavaScript

### Installation

1. Clone the repository:
```bash
git clone https://github.com/kiyoraka/Zakat-Kripto-Calculator.git
```

2. Navigate to the project directory:
```bash
cd Zakat-Kripto-Calculator
```

3. Open index.html in a web browser or use a local server.

## Project Structure

```
├── index.html              # Main application file
├── assets/
│   ├── css/
│   │   ├── styles.css     # Custom styles
│   ├── js/
│   │   ├── script.js      # Application logic
│   └── img/               # Image assets
│       ├── Dalil1.jpg
│       ├── Dalil2.jpg
│       └── Dalil3.jpg
├── .github/
│   └── workflows/         # GitHub Actions workflows
└── README.md
```

## Key Components

### Gold Price API

The system uses an external API to fetch current gold prices:
- Default fallback price: RM 410/gram
- Automatic conversion from USD/troy ounce to MYR/gram
- Error handling with fallback to default values

### Zakat Calculation

The calculator considers several factors:
- Initial purchase value
- Current cryptocurrency value
- Holding period (minimum 365 days)
- Current gold price for nisab calculation
- Standard Zakat rate of 2.5%

## Usage Guide

1. Visit the [Zakat Kripto Calculator](https://kiyoraka.github.io/Zakat-Kripto-Calculator/)
2. Navigate to "Kalkulator Zakat" page
3. Enter your cryptocurrency details:
   - Initial purchase value in MYR
   - Purchase date
   - Current value in MYR
4. Click "Kira Zakat" to calculate
5. View detailed results including:
   - Eligibility status
   - Required Zakat amount (if eligible)
   - Holding period
   - Current gold price
   - Nisab threshold

## Maintenance

### Updating Gold Price

The default gold price can be updated in script.js:
```javascript
let GOLD_PRICE_PER_GRAM = 410; // Update this value
```

### API Configuration

Gold price API settings can be modified in the fetchGoldPrice function:
```javascript
const usdToMYR = 4.70; // Update exchange rate as needed
```

## Deployment

The application is deployed using GitHub Pages. Any push to the main branch will automatically trigger a deployment through GitHub Actions.

To deploy your own version:
1. Fork this repository
2. Enable GitHub Pages in your repository settings
3. Configure GitHub Actions using the provided workflow
4. Push changes to your main branch

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/NewFeature`)
3. Commit your changes (`git commit -m 'Add some NewFeature'`)
4. Push to the branch (`git push origin feature/NewFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Disclaimer

This calculator is for reference purposes only. Users should consult with their local Zakat authorities for official guidance on Zakat calculations.

## Support

For support, please open an issue in the [GitHub repository](https://github.com/kiyoraka/Zakat-Kripto-Calculator/issues)

---

Created with ❤️ for the Muslim Ummah