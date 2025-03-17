import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import './Cart.css';

const Cart = ({ showToast }) => {
  const { cartItems, totalAmount, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  
  const handleQuantityChange = (id, newQuantity) => {
    updateQuantity(id, newQuantity);
  };
  
  const handleRemoveItem = (id, name) => {
    removeFromCart(id);
    showToast(`${name} removed from cart`);
  };
  
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      showToast('Your cart is empty');
      return;
    }
    navigate('/checkout');
  };
  
  return (
    <div className="cart-page">
      <div className="container">
        <h1 className="page-title">Shopping Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">
              <i className="fa fa-shopping-cart"></i>
            </div>
            <h2>Your cart is empty!</h2>
            <p>Looks like you haven't added anything to your cart yet.</p>
            <Link to="/" className="continue-shopping-btn">Continue Shopping</Link>
          </div>
        ) : (
          <div className="cart-container">
            <div className="cart-items">
              <div className="cart-header">
                <div className="cart-header-item product-col">Product</div>
                <div className="cart-header-item price-col">Price</div>
                <div className="cart-header-item quantity-col">Quantity</div>
                <div className="cart-header-item total-col">Total</div>
                <div className="cart-header-item action-col">Action</div>
              </div>
              
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="product-col">
                    <div className="product-info">
                      <div className="product-image">
                        <img src={item.image} alt={item.name} />
                      </div>
                      <div className="product-details">
                        <h3 className="product-title">{item.name}</h3>
                        <div className="product-meta">
                          <span className="product-seller">Seller: Ekart Retail</span>
                          <div className="product-rating">
                            <span className="rating">
                              {item.rating} <i className="fa fa-star"></i>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="price-col">
                    <div className="product-price">
                      <span className="current-price">₹{item.price.toLocaleString()}</span>
                      <span className="original-price">₹{item.originalPrice.toLocaleString()}</span>
                      <span className="discount">{item.discount}% off</span>
                    </div>
                  </div>
                  
                  <div className="quantity-col">
                    <div className="quantity-selector">
                      <button 
                        className="quantity-btn minus"
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <i className="fa fa-minus"></i>
                      </button>
                      <input 
                        type="number" 
                        className="quantity-input" 
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                        min="1"
                        max="10"
                      />
                      <button 
                        className="quantity-btn plus"
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        disabled={item.quantity >= 10}
                      >
                        <i className="fa fa-plus"></i>
                      </button>
                    </div>
                  </div>
                  
                  <div className="total-col">
                    <span className="item-total">₹{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                  
                  <div className="action-col">
                    <button 
                      className="remove-btn"
                      onClick={() => handleRemoveItem(item.id, item.name)}
                    >
                      <i className="fa fa-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="cart-summary">
              <h2 className="summary-title">Order Summary</h2>
              
              <div className="summary-row">
                <span className="summary-label">Items ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})</span>
                <span className="summary-value">₹{totalAmount.toLocaleString()}</span>
              </div>
              
              <div className="summary-row">
                <span className="summary-label">Delivery Charges</span>
                <span className="summary-value delivery-free">FREE</span>
              </div>
              
              <div className="summary-total">
                <span className="summary-label">Total Amount</span>
                <span className="summary-value">₹{totalAmount.toLocaleString()}</span>
              </div>
              
              <div className="summary-savings">
                You will save ₹{cartItems.reduce((acc, item) => acc + ((item.originalPrice - item.price) * item.quantity), 0).toLocaleString()} on this order
              </div>
              
              <button 
                className="checkout-btn"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </button>
              
              <Link to="/" className="continue-shopping-link">
                <i className="fa fa-arrow-left"></i> Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;