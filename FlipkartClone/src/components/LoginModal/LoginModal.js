import React, { useState } from 'react';
import './LoginModal.css';

const LoginModal = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would handle authentication here
    alert(`${isLogin ? 'Login' : 'Signup'} successful!`);
    onClose();
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="login-modal-overlay" onClick={onClose}>
      <div className="login-modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-modal" onClick={onClose}>&times;</span>
        <div className="modal-body">
          <div className="modal-left">
            <h2>{isLogin ? 'Login' : 'Signup'}</h2>
            <p>Get access to your Orders, Wishlist and Recommendations</p>
            <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/login_img_c4a81e.png" alt="Login" />
          </div>
          <div className="modal-right">
            <form className="login-form" onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="form-group">
                  <input 
                    type="text" 
                    name="name" 
                    placeholder="Name" 
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}
              
              <div className="form-group">
                <input 
                  type="text" 
                  name="email" 
                  placeholder="Enter Email/Mobile number" 
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              {!isLogin && (
                <div className="form-group">
                  <input 
                    type="tel" 
                    name="phone" 
                    placeholder="Mobile Number" 
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}
              
              <div className="form-group">
                <input 
                  type="password" 
                  name="password" 
                  placeholder="Enter Password" 
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <p className="terms-text">
                By continuing, you agree to Ekart's <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a>.
              </p>
              
              <button type="submit" className="login-submit-btn">
                {isLogin ? 'Login' : 'Signup'}
              </button>
              
              {isLogin && (
                <>
                  <div className="or-divider">OR</div>
                  <button type="button" className="otp-btn">Request OTP</button>
                </>
              )}
              
              <div className="create-account">
                <a href="#" onClick={(e) => { e.preventDefault(); toggleForm(); }}>
                  {isLogin ? 'New to Ekart? Create an account' : 'Existing User? Log in'}
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;