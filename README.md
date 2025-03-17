# Ekart - E-commerce Website

Ekart is a modern e-commerce website built with React.js, inspired by Flipkart's design and functionality.

## Features

- **Responsive Design**: Works on all devices (desktop, tablet, mobile)
- **Product Listings**: Browse products by category
- **Product Details**: View detailed information about products
- **Shopping Cart**: Add/remove items, update quantities
- **Checkout Process**: Multi-step checkout with address and payment options
- **User Authentication**: Login/signup functionality
- **Search Functionality**: Search for products
- **Smooth Scrolling**: Enhanced user experience

## Technologies Used

- **React.js**: Frontend library for building user interfaces
- **React Router**: For navigation between pages
- **Context API**: For state management (cart, user authentication)
- **CSS3**: For styling components
- **React Slick**: For carousels and sliders
- **Font Awesome**: For icons

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/ekart.git
   cd ekart
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Project Structure

```
ekart/
├── public/
│   ├── images/
│   │   └── ekart-logo.png
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── Footer/
│   │   ├── Header/
│   │   ├── LoginModal/
│   │   ├── ProductCard/
│   │   └── Toast/
│   ├── context/
│   │   └── CartContext.js
│   ├── data/
│   │   └── products.js
│   ├── pages/
│   │   ├── Cart/
│   │   ├── Checkout/
│   │   ├── Home/
│   │   └── ProductDetails/
│   ├── App.css
│   ├── App.js
│   ├── index.css
│   └── index.js
├── package.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Design inspired by Flipkart
- Product images and data are for demonstration purposes only
