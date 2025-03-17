import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import './Checkout.css';

const Checkout = ({ showToast }) => {
  const { cartItems, totalAmount, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  
  const [activeStep, setActiveStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'cod'
  });
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleNextStep = () => {
    if (activeStep === 1) {
      // Validate address form
      if (!formData.fullName || !formData.phone || !formData.address || !formData.city || !formData.state || !formData.pincode) {
        showToast('Please fill all required fields');
        return;
      }
    }
    
    setActiveStep(activeStep + 1);
  };
  
  const handlePrevStep = () => {
    setActiveStep(activeStep - 1);
  };
  
  const handlePlaceOrder = () => {
    // In a real app, you would send the order to a server
    showToast('Order placed successfully!');
    clearCart();
    navigate('/');
  };
  
  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }
  
  return (
    <div className="checkout-page">
      <div className="container">
        <h1 className="page-title">Checkout</h1>
        
        <div className="checkout-steps">
          <div className={`checkout-step ${activeStep >= 1 ? 'active' : ''}`}>
            <div className="step-number">1</div>
            <div className="step-title">Delivery Address</div>
          </div>
          <div className={`checkout-step ${activeStep >= 2 ? 'active' : ''}`}>
            <div className="step-number">2</div>
            <div className="step-title">Order Summary</div>
          </div>
          <div className={`checkout-step ${activeStep >= 3 ? 'active' : ''}`}>
            <div className="step-number">3</div>
            <div className="step-title">Payment</div>
          </div>
        </div>
        
        <div className="checkout-container">
          {activeStep === 1 && (
            <div className="checkout-address">
              <h2 className="section-title">Delivery Address</h2>
              
              <form className="address-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="fullName">Full Name *</label>
                    <input 
                      type="text" 
                      id="fullName" 
                      name="fullName" 
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number *</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group full-width">
                    <label htmlFor="address">Address (House No, Building, Street, Area) *</label>
                    <textarea 
                      id="address" 
                      name="address" 
                      rows="3"
                      value={formData.address}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="city">City *</label>
                    <input 
                      type="text" 
                      id="city" 
                      name="city" 
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="state">State *</label>
                    <input 
                      type="text" 
                      id="state" 
                      name="state" 
                      value={formData.state}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="pincode">Pincode *</label>
                    <input 
                      type="text" 
                      id="pincode" 
                      name="pincode" 
                      value={formData.pincode}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </form>
              
              <div className="form-actions">
                <button 
                  className="next-btn"
                  onClick={handleNextStep}
                >
                  Deliver to this Address
                </button>
              </div>
            </div>
          )}
          
          {activeStep === 2 && (
            <div className="checkout-summary">
              <h2 className="section-title">Order Summary</h2>
              
              <div className="order-items">
                {cartItems.map(item => (
                  <div key={item.id} className="order-item">
                    <div className="item-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="item-details">
                      <h3 className="item-title">{item.name}</h3>
                      <div className="item-meta">
                        <span className="item-seller">Seller: Ekart Retail</span>
                      </div>
                      <div className="item-price">
                        <span className="current-price">₹{item.price.toLocaleString()}</span>
                        <span className="original-price">₹{item.originalPrice.toLocaleString()}</span>
                        <span className="discount">{item.discount}% off</span>
                      </div>
                      <div className="item-quantity">
                        Quantity: {item.quantity}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="delivery-address">
                <h3 className="subsection-title">Deliver to:</h3>
                <div className="address-details">
                  <div className="address-name">{formData.fullName}</div>
                  <div className="address-text">
                    {formData.address}, {formData.city}, {formData.state} - {formData.pincode}
                  </div>
                  <div className="address-phone">Phone: {formData.phone}</div>
                </div>
              </div>
              
              <div className="price-details">
                <h3 className="subsection-title">Price Details</h3>
                <div className="price-row">
                  <span className="price-label">Price ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
                  <span className="price-value">₹{cartItems.reduce((acc, item) => acc + (item.originalPrice * item.quantity), 0).toLocaleString()}</span>
                </div>
                <div className="price-row">
                  <span className="price-label">Discount</span>
                  <span className="price-value discount-value">- ₹{cartItems.reduce((acc, item) => acc + ((item.originalPrice - item.price) * item.quantity), 0).toLocaleString()}</span>
                </div>
                <div className="price-row">
                  <span className="price-label">Delivery Charges</span>
                  <span className="price-value delivery-free">FREE</span>
                </div>
                <div className="price-total">
                  <span className="price-label">Total Amount</span>
                  <span className="price-value">₹{totalAmount.toLocaleString()}</span>
                </div>
                <div className="price-savings">
                  You will save ₹{cartItems.reduce((acc, item) => acc + ((item.originalPrice - item.price) * item.quantity), 0).toLocaleString()} on this order
                </div>
              </div>
              
              <div className="form-actions">
                <button 
                  className="back-btn"
                  onClick={handlePrevStep}
                >
                  Back
                </button>
                <button 
                  className="next-btn"
                  onClick={handleNextStep}
                >
                  Continue to Payment
                </button>
              </div>
            </div>
          )}
          
          {activeStep === 3 && (
            <div className="checkout-payment">
              <h2 className="section-title">Payment Options</h2>
              
              <div className="payment-methods">
                <div className="payment-method">
                  <input 
                    type="radio" 
                    id="cod" 
                    name="paymentMethod" 
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={handleChange}
                  />
                  <label htmlFor="cod">Cash on Delivery</label>
                </div>
                <div className="payment-method">
                  <input 
                    type="radio" 
                    id="card" 
                    name="paymentMethod" 
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={handleChange}
                  />
                  <label htmlFor="card">Credit / Debit Card</label>
                </div>
                <div className="payment-method">
                  <input 
                    type="radio" 
                    id="upi" 
                    name="paymentMethod" 
                    value="upi"
                    checked={formData.paymentMethod === 'upi'}
                    onChange={handleChange}
                  />
                  <label htmlFor="upi">UPI</label>
                </div>
                <div className="payment-method">
                  <input 
                    type="radio" 
                    id="netbanking" 
                    name="paymentMethod" 
                    value="netbanking"
                    checked={formData.paymentMethod === 'netbanking'}
                    onChange={handleChange}
                  />
                  <label htmlFor="netbanking">Net Banking</label>
                </div>
              </div>
              
              {formData.paymentMethod === 'cod' && (
                <div className="payment-info">
                  <p>Pay on delivery (Cash/Card/UPI)</p>
                </div>
              )}
              
              {formData.paymentMethod === 'card' && (
                <div className="payment-info">
                  <p>This is a demo. In a real application, you would enter card details here.</p>
                </div>
              )}
              
              {formData.paymentMethod === 'upi' && (
                <div className="payment-info">
                  <p>This is a demo. In a real application, you would enter UPI details here.</p>
                </div>
              )}
              
              {formData.paymentMethod === 'netbanking' && (
                <div className="payment-info">
                  <p>This is a demo. In a real application, you would select your bank here.</p>
                </div>
              )}
              
              <div className="order-summary">
                <div className="order-total">
                  <span className="total-label">Total:</span>
                  <span className="total-value">₹{totalAmount.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="form-actions">
                <button 
                  className="back-btn"
                  onClick={handlePrevStep}
                >
                  Back
                </button>
                <button 
                  className="place-order-btn"
                  onClick={handlePlaceOrder}
                >
                  Place Order
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;