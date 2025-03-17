import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import './Header.css';

const Header = ({ setShowLoginModal }) => {
  const { totalItems } = useContext(CartContext);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <header className="header">
      <div className="header-top">
        <div className="container">
          <div className="header-row">
            <div className="logo-container">
              <Link to="/" className="ekart-logo">
                <img src="/images/ekart-logo.png" alt="Ekart" />
                <div className="logo-explore">
                  <span>Explore</span>
                  <span className="plus-text">Plus</span>
                  <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/plus_aef861.png" alt="Plus" />
                </div>
              </Link>
            </div>
            
            <div className="search-container">
              <form className="search-form">
                <input 
                  type="text" 
                  placeholder="Search for products, brands and more" 
                />
                <button type="submit">
                  <i className="fa fa-search"></i>
                </button>
              </form>
            </div>
            
            <button 
              className="mobile-menu-btn"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              <i className={`fa ${showMobileMenu ? 'fa-times' : 'fa-bars'}`}></i>
            </button>
            
            <div className={`header-actions ${showMobileMenu ? 'active' : ''}`}>
              <div 
                className="login-btn"
                onClick={() => setShowLoginModal(true)}
              >
                Login
              </div>
              
              <div className="nav-link">Become a Seller</div>
              
              <div className="nav-link dropdown">
                More
                <i className="fa fa-angle-down"></i>
              </div>
              
              <Link to="/cart" className="cart-link">
                <i className="fa fa-shopping-cart"></i>
                <span>Cart</span>
                {totalItems > 0 && (
                  <span className="cart-count">{totalItems}</span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <nav className="category-nav">
        <div className="container">
          <ul className="category-list">
            <li className="category-item">
              <img src="https://rukminim1.flixcart.com/flap/128/128/image/f15c02bfeb02d15d.png?q=100" alt="Top Offers" />
              <span>Top Offers</span>
            </li>
            <li className="category-item">
              <img src="https://rukminim1.flixcart.com/flap/128/128/image/29327f40e9c4d26b.png?q=100" alt="Grocery" />
              <span>Grocery</span>
            </li>
            <li className="category-item">
              <img src="https://rukminim1.flixcart.com/flap/128/128/image/22fddf3c7da4c4f4.png?q=100" alt="Mobiles" />
              <span>Mobiles</span>
            </li>
            <li className="category-item">
              <img src="https://rukminim1.flixcart.com/flap/128/128/image/c12afc017e6f24cb.png?q=100" alt="Fashion" />
              <span>Fashion</span>
            </li>
            <li className="category-item">
              <img src="https://rukminim1.flixcart.com/flap/128/128/image/69c6589653afdb9a.png?q=100" alt="Electronics" />
              <span>Electronics</span>
            </li>
            <li className="category-item">
              <img src="https://rukminim1.flixcart.com/flap/128/128/image/ab7e2b022a4587dd.jpg?q=100" alt="Home" />
              <span>Home</span>
            </li>
            <li className="category-item">
              <img src="https://rukminim1.flixcart.com/flap/128/128/image/0ff199d1bd27eb98.png?q=100" alt="Appliances" />
              <span>Appliances</span>
            </li>
            <li className="category-item">
              <img src="https://rukminim1.flixcart.com/flap/128/128/image/71050627a56b4693.png?q=100" alt="Travel" />
              <span>Travel</span>
            </li>
            <li className="category-item">
              <img src="https://rukminim1.flixcart.com/flap/128/128/image/dff3f7adcf3a90c6.png?q=100" alt="Beauty, Toys & More" />
              <span>Beauty, Toys & More</span>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;