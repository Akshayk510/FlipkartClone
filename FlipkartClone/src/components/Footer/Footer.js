import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-columns">
            <div className="footer-column">
              <h4>ABOUT</h4>
              <ul>
                <li><Link to="/">Contact Us</Link></li>
                <li><Link to="/">About Us</Link></li>
                <li><Link to="/">Careers</Link></li>
                <li><Link to="/">Ekart Stories</Link></li>
                <li><Link to="/">Press</Link></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>HELP</h4>
              <ul>
                <li><Link to="/">Payments</Link></li>
                <li><Link to="/">Shipping</Link></li>
                <li><Link to="/">Cancellation & Returns</Link></li>
                <li><Link to="/">FAQ</Link></li>
                <li><Link to="/">Report Infringement</Link></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>POLICY</h4>
              <ul>
                <li><Link to="/">Return Policy</Link></li>
                <li><Link to="/">Terms Of Use</Link></li>
                <li><Link to="/">Security</Link></li>
                <li><Link to="/">Privacy</Link></li>
                <li><Link to="/">Sitemap</Link></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>SOCIAL</h4>
              <ul>
                <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
                <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
                <li><a href="https://youtube.com" target="_blank" rel="noopener noreferrer">YouTube</a></li>
                <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              </ul>
            </div>
            <div className="footer-column address-column">
              <h4>Mail Us:</h4>
              <p>Ekart Internet Private Limited,<br />
                 Buildings Alyssa, Begonia &<br />
                 Clove Embassy Tech Village,<br />
                 Outer Ring Road, Devarabeesanahalli Village,<br />
                 Bengaluru, 560103,<br />
                 Karnataka, India</p>
            </div>
            <div className="footer-column address-column">
              <h4>Registered Office Address:</h4>
              <p>Ekart Internet Private Limited,<br />
                 Buildings Alyssa, Begonia &<br />
                 Clove Embassy Tech Village,<br />
                 Outer Ring Road, Devarabeesanahalli Village,<br />
                 Bengaluru, 560103,<br />
                 Karnataka, India<br />
                 CIN: U51109KA2012PTC066107<br />
                 Telephone: <a href="tel:18002089898">1800 208 9898</a></p>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-row">
            <div className="footer-bottom-item">
              <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/payment-method_69e7ec.svg" alt="Payment Methods" />
            </div>
            <div className="footer-bottom-item">
              <p>&copy; 2007-{new Date().getFullYear()} Ekart.com</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;