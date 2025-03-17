import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import Cart from './pages/Cart/Cart';
import Checkout from './pages/Checkout/Checkout';
import LoginModal from './components/LoginModal/LoginModal';
import Toast from './components/Toast/Toast';
import './App.css';

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '' });

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => {
      setToast({ show: false, message: '' });
    }, 3000);
  };

  return (
    <div className="app">
      <Header setShowLoginModal={setShowLoginModal} />
      
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home showToast={showToast} />} />
          <Route path="/product/:id" element={<ProductDetails showToast={showToast} />} />
          <Route path="/cart" element={<Cart showToast={showToast} />} />
          <Route path="/checkout" element={<Checkout showToast={showToast} />} />
        </Routes>
      </main>
      
      <Footer />
      
      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
      {toast.show && <Toast message={toast.message} />}
    </div>
  );
}

export default App;