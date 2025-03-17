import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { CartContext } from '../../context/CartContext';
import ProductCard from '../../components/ProductCard/ProductCard';
import { products } from '../../data/products';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Home.css';

const Home = ({ showToast }) => {
  const { addToCart } = useContext(CartContext);
  const [timeLeft, setTimeLeft] = useState({
    hours: 19,
    minutes: 12,
    seconds: 36
  });
  
  // Banner slider settings
  const bannerSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true
  };
  
  // Product carousel settings
  const productSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };
  
  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          clearInterval(timer);
          return { hours: 0, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Handle add to cart
  const handleAddToCart = (product) => {
    addToCart(product);
    showToast(`${product.name} added to cart!`);
  };
  
  // Filter products by category
  const electronicsProducts = products.filter(product => product.category === 'electronics');
  const fashionProducts = products.filter(product => product.category === 'fashion');
  const mobileProducts = products.filter(product => product.category === 'mobiles');
  
  return (
    <div className="home-page">
      {/* Banner Slider */}
      <section className="banner-slider">
        <Slider {...bannerSettings}>
          <div className="banner-slide">
            <img src="https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/d05c680ac525e382.jpg?q=20" alt="Banner 1" />
          </div>
          <div className="banner-slide">
            <img src="https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/7fd0e4ab26429926.jpg?q=20" alt="Banner 2" />
          </div>
          <div className="banner-slide">
            <img src="https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/352e6f0f8034fab5.jpg?q=20" alt="Banner 3" />
          </div>
        </Slider>
      </section>
      
      {/* Deals of the Day */}
      <section className="deals-section">
        <div className="container">
          <div className="section-header">
            <h2>Deals of the Day</h2>
            <div className="timer">
              <i className="fa fa-clock"></i>
              <span>
                {String(timeLeft.hours).padStart(2, '0')}h {String(timeLeft.minutes).padStart(2, '0')}m {String(timeLeft.seconds).padStart(2, '0')}s Left
              </span>
            </div>
            <Link to="/" className="view-all-btn">VIEW ALL</Link>
          </div>
          
          <div className="product-carousel">
            <Slider {...productSettings}>
              {electronicsProducts.map(product => (
                <div key={product.id} className="carousel-item">
                  <div className="product-card">
                    <div className="product-image">
                      <img src={product.image} alt={product.name} />
                    </div>
                    <h3 className="product-title">{product.name}</h3>
                    <div className="product-price">From ₹{product.price.toLocaleString()}</div>
                    <div className="product-discount">{product.brand}</div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>
      
      {/* Featured Categories */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header">
            <h2>Featured Categories</h2>
          </div>
          <div className="categories-grid">
            <div className="category-card">
              <div className="category-image">
                <img src="https://rukminim1.flixcart.com/flap/128/128/image/22fddf3c7da4c4f4.png?q=100" alt="Mobiles" />
              </div>
              <h3>Mobiles</h3>
              <p>Up to 40% Off</p>
              <Link to="/" className="category-btn">View All</Link>
            </div>
            <div className="category-card">
              <div className="category-image">
                <img src="https://rukminim1.flixcart.com/flap/128/128/image/69c6589653afdb9a.png?q=100" alt="Electronics" />
              </div>
              <h3>Electronics</h3>
              <p>Up to 50% Off</p>
              <Link to="/" className="category-btn">View All</Link>
            </div>
            <div className="category-card">
              <div className="category-image">
                <img src="https://rukminim1.flixcart.com/flap/128/128/image/c12afc017e6f24cb.png?q=100" alt="Fashion" />
              </div>
              <h3>Fashion</h3>
              <p>50-80% Off</p>
              <Link to="/" className="category-btn">View All</Link>
            </div>
            <div className="category-card">
              <div className="category-image">
                <img src="https://rukminim1.flixcart.com/flap/128/128/image/ab7e2b022a4587dd.jpg?q=100" alt="Home" />
              </div>
              <h3>Home & Furniture</h3>
              <p>Up to 60% Off</p>
              <Link to="/" className="category-btn">View All</Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Mobile Products */}
      <section className="trending-products">
        <div className="container">
          <div className="section-header">
            <h2>Top Mobile Phones</h2>
            <Link to="/" className="view-all-btn">VIEW ALL</Link>
          </div>
          <div className="product-grid">
            {mobileProducts.slice(0, 4).map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={() => handleAddToCart(product)}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Fashion Products */}
      <section className="trending-products">
        <div className="container">
          <div className="section-header">
            <h2>Fashion Trending Now</h2>
            <Link to="/" className="view-all-btn">VIEW ALL</Link>
          </div>
          <div className="product-grid">
            {fashionProducts.slice(0, 4).map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={() => handleAddToCart(product)}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Offers Banner */}
      <section className="offers-banner">
        <div className="container">
          <div className="banner-grid">
            <div className="banner-item">
              <img src="https://rukminim1.flixcart.com/fk-p-flap/480/480/image/5c5697a29a479d1b.jpg?q=50" alt="Offer 1" />
            </div>
            <div className="banner-item">
              <img src="https://rukminim1.flixcart.com/fk-p-flap/480/480/image/9e4acc1d8929e372.jpg?q=50" alt="Offer 2" />
            </div>
            <div className="banner-item">
              <img src="https://rukminim1.flixcart.com/fk-p-flap/480/480/image/99fae2c9734a32a4.jpg?q=50" alt="Offer 3" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;