import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { products } from '../../data/products';
import './ProductDetails.css';

const ProductDetails = ({ showToast }) => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  
  useEffect(() => {
    // In a real app, you would fetch the product from an API
    const foundProduct = products.find(p => p.id === parseInt(id));
    
    if (foundProduct) {
      setProduct(foundProduct);
    }
    
    setLoading(false);
  }, [id]);
  
  const handleAddToCart = () => {
    if (product) {
      // Add product with selected quantity
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
      showToast(`${product.name} added to cart!`);
    }
  };
  
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= 10) {
      setQuantity(value);
    }
  };
  
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading product details...</p>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="container">
        <div className="product-not-found">
          <h2>Product Not Found</h2>
          <p>The product you are looking for does not exist.</p>
          <Link to="/" className="back-to-home-btn">Back to Home</Link>
        </div>
      </div>
    );
  }
  
  // Generate similar products (in a real app, these would be fetched from an API)
  const similarProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
  
  return (
    <div className="product-details-page">
      <div className="container">
        <div className="breadcrumb">
          <Link to="/">Home</Link> &gt; 
          <Link to="/">{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</Link> &gt; 
          <span>{product.name}</span>
        </div>
        
        <div className="product-details-container">
          <div className="product-images">
            <div className="image-gallery">
              {product.gallery && product.gallery.map((img, index) => (
                <div 
                  key={index} 
                  className={`gallery-item ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={img} alt={`${product.name} - ${index + 1}`} />
                </div>
              ))}
            </div>
            <div className="main-image">
              <img 
                src={product.gallery ? product.gallery[selectedImage] : product.image} 
                alt={product.name} 
              />
            </div>
            <div className="product-actions">
              <button 
                className="add-to-cart-btn"
                onClick={handleAddToCart}
              >
                <i className="fa fa-shopping-cart"></i> ADD TO CART
              </button>
              <button className="buy-now-btn">
                <i className="fa fa-bolt"></i> BUY NOW
              </button>
            </div>
          </div>
          
          <div className="product-info">
            <h1 className="product-title">{product.name}</h1>
            
            <div className="product-rating">
              <span className="rating">
                {product.rating} <i className="fa fa-star"></i>
              </span>
              <span className="rating-count">{product.ratingCount.toLocaleString()} Ratings & Reviews</span>
            </div>
            
            <div className="product-price">
              <span className="special-price">Special Price</span>
              <div className="price-container">
                <span className="current-price">₹{product.price.toLocaleString()}</span>
                <span className="original-price">₹{product.originalPrice.toLocaleString()}</span>
                <span className="discount">{product.discount}% off</span>
              </div>
            </div>
            
            <div className="product-offers">
              <h3>Available offers</h3>
              <ul className="offers-list">
                <li>
                  <i className="fa fa-tag offer-icon"></i>
                  <span>Bank Offer 5% Unlimited Cashback on Ekart Axis Bank Credit Card</span>
                </li>
                <li>
                  <i className="fa fa-tag offer-icon"></i>
                  <span>Bank Offer 10% Off on Bank of Baroda Mastercard debit card first time transaction</span>
                </li>
                <li>
                  <i className="fa fa-tag offer-icon"></i>
                  <span>Special Price Get extra ₹{Math.round(product.price * 0.1).toLocaleString()} off (price inclusive of discount)</span>
                </li>
              </ul>
            </div>
            
            <div className="delivery-options">
              <div className="delivery-row">
                <span className="delivery-label">Delivery</span>
                <div className="delivery-input">
                  <input type="text" placeholder="Enter delivery pincode" />
                  <button>Check</button>
                </div>
              </div>
              
              <div className="delivery-row">
                <span className="delivery-label">Quantity</span>
                <div className="quantity-selector">
                  <button 
                    className="quantity-btn minus"
                    onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  >
                    <i className="fa fa-minus"></i>
                  </button>
                  <input 
                    type="number" 
                    className="quantity-input" 
                    value={quantity}
                    onChange={handleQuantityChange}
                    min="1"
                    max="10"
                  />
                  <button 
                    className="quantity-btn plus"
                    onClick={() => quantity < 10 && setQuantity(quantity + 1)}
                  >
                    <i className="fa fa-plus"></i>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="product-details">
              <h3>Product Details</h3>
              <div className="details-content">
                <p>{product.description || 'No description available for this product.'}</p>
              </div>
            </div>
            
            <div className="product-specs">
              <h3>Specifications</h3>
              <div className="specs-content">
                <div className="spec-group">
                  <h4>General</h4>
                  <table className="spec-table">
                    <tbody>
                      <tr>
                        <td>Brand</td>
                        <td>{product.brand}</td>
                      </tr>
                      <tr>
                        <td>Model</td>
                        <td>{product.model || 'N/A'}</td>
                      </tr>
                      <tr>
                        <td>Category</td>
                        <td>{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            
            <div className="product-seller">
              <h3>Seller</h3>
              <div className="seller-info">
                <span className="seller-name">Ekart Retail</span>
                <div className="seller-rating">
                  <span className="rating">4.8 <i className="fa fa-star"></i></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {similarProducts.length > 0 && (
          <div className="similar-products">
            <h2 className="section-title">Similar Products</h2>
            <div className="product-grid">
              {similarProducts.map(product => (
                <div key={product.id} className="product-card-wrapper">
                  <div className="product-card-container">
                    <div className="product-image-container">
                      <span className="discount-tag">{product.discount}% off</span>
                      <Link to={`/product/${product.id}`}>
                        <img src={product.image} alt={product.name} />
                      </Link>
                    </div>
                    <div className="product-info">
                      <Link to={`/product/${product.id}`} className="product-title-link">
                        <h3 className="product-title">{product.name}</h3>
                      </Link>
                      <div className="product-rating">
                        <span className="rating">
                          {product.rating} <i className="fa fa-star"></i>
                        </span>
                        <span className="rating-count">({product.ratingCount.toLocaleString()})</span>
                      </div>
                      <div className="product-price">
                        <span className="current-price">₹{product.price.toLocaleString()}</span>
                        <span className="original-price">₹{product.originalPrice.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;