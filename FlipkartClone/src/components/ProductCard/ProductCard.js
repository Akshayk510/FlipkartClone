import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product, onAddToCart }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { id, name, image, price, originalPrice, discount, rating, ratingCount } = product;
  
  return (
    <div 
      className="product-card-wrapper"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="product-card-container">
        <div className="product-image-container">
          <span className="discount-tag">{discount}% off</span>
          <Link to={`/product/${id}`}>
            <img src={image} alt={name} />
          </Link>
          <div className={`product-actions ${isHovered ? 'visible' : ''}`}>
            <button className="wishlist-btn">
              <i className="fa fa-heart"></i>
            </button>
            <button className="quick-view-btn">
              <i className="fa fa-eye"></i>
            </button>
          </div>
        </div>
        <div className="product-info">
          <Link to={`/product/${id}`} className="product-title-link">
            <h3 className="product-title">{name}</h3>
          </Link>
          <div className="product-rating">
            <span className="rating">
              {rating} <i className="fa fa-star"></i>
            </span>
            <span className="rating-count">({ratingCount.toLocaleString()})</span>
          </div>
          <div className="product-price">
            <span className="current-price">₹{price.toLocaleString()}</span>
            <span className="original-price">₹{originalPrice.toLocaleString()}</span>
          </div>
          <button 
            className="add-to-cart-btn"
            onClick={onAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;