# Zakat Crypto Calculator

A web-based application for calculating Zakat on cryptocurrency holdings according to Islamic principles. This calculator helps Muslims determine their Zakat obligations for cryptocurrency investments by considering the current gold price, holding period, and nisab threshold.

## Features

- Real-time gold price fetching for accurate nisab calculation
- Automatic calculation of Zakat eligibility based on:
  - Holding period (Haul - 365 days)
  - Minimum threshold (Nisab - equivalent to 85 grams of gold)
- Multi-page interface with:
  - Dalil (Evidence) from Islamic sources
  - Syarat (Requirements) for Zakat
  - Calculator interface
  - FAQ/Help section
- Interactive carousel for educational content
- Responsive design for all devices

## Technical Stack

- HTML5
- CSS3 with Tailwind CSS
- Vanilla JavaScript
- Lucide Icons for UI elements

## Prerequisites

- Web server with HTTP support
- Modern web browser with JavaScript enabled
- Internet connection for gold price API

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/zakat-crypto-calculator.git
```

2. Navigate to the project directory:
```bash
cd zakat-crypto-calculator
```

3. Open index.html in a web browser or deploy to your web server.

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

## Usage

1. Navigate to the Calculator page
2. Enter your cryptocurrency details:
   - Initial purchase value
   - Purchase date
   - Current value
3. Click "Kira Zakat" to calculate
4. View detailed results including:
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

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Disclaimer

This calculator is for reference purposes only. Users should consult with their local Zakat authorities for official guidance on Zakat calculations.

## Support

For support, please open an issue in the GitHub repository 

---

