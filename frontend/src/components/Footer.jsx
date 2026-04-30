import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCcVisa, FaCcMastercard, FaCcPaypal, FaApplePay, FaGooglePay } from 'react-icons/fa';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ background: '#0a0a0a', color: '#888', marginTop: '60px' }}>
      {/* Payment Methods Bar */}
      <div style={{ background: '#111', padding: '15px 0', borderBottom: '1px solid #222' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }}>
          <FaCcVisa style={{ fontSize: '40px', color: '#1a1f71' }} />
          <FaCcMastercard style={{ fontSize: '40px', color: '#eb001b' }} />
          <FaCcPaypal style={{ fontSize: '40px', color: '#003087' }} />
          <FaApplePay style={{ fontSize: '40px', color: '#555' }} />
          <FaGooglePay style={{ fontSize: '40px', color: '#555' }} />
        </div>
      </div>

      {/* Main Footer */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '50px 20px 30px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px' }}>
          
          {/* Brand Column */}
          <div>
            <h3 style={{ color: '#fff', fontSize: '22px', marginBottom: '20px', fontWeight: 'bold' }}>MarketHub</h3>
            <p style={{ fontSize: '13px', lineHeight: '1.6', marginBottom: '20px', color: '#888' }}>
              Nigeria's #1 Online Marketplace for quality products at the best prices.
            </p>
            <div style={{ display: 'flex', gap: '15px' }}>
              <a href="#" style={{ background: '#222', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888', transition: 'all 0.3s' }} onMouseEnter={(e) => { e.currentTarget.style.background = '#1877f2'; e.currentTarget.style.color = 'white'; }} onMouseLeave={(e) => { e.currentTarget.style.background = '#222'; e.currentTarget.style.color = '#888'; }}><FaFacebookF /></a>
              <a href="#" style={{ background: '#222', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888', transition: 'all 0.3s' }} onMouseEnter={(e) => { e.currentTarget.style.background = '#1da1f2'; e.currentTarget.style.color = 'white'; }} onMouseLeave={(e) => { e.currentTarget.style.background = '#222'; e.currentTarget.style.color = '#888'; }}><FaTwitter /></a>
              <a href="#" style={{ background: '#222', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888', transition: 'all 0.3s' }} onMouseEnter={(e) => { e.currentTarget.style.background = '#e4405f'; e.currentTarget.style.color = 'white'; }} onMouseLeave={(e) => { e.currentTarget.style.background = '#222'; e.currentTarget.style.color = '#888'; }}><FaInstagram /></a>
              <a href="#" style={{ background: '#222', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888', transition: 'all 0.3s' }} onMouseEnter={(e) => { e.currentTarget.style.background = '#ff0000'; e.currentTarget.style.color = 'white'; }} onMouseLeave={(e) => { e.currentTarget.style.background = '#222'; e.currentTarget.style.color = '#888'; }}><FaYoutube /></a>
            </div>
          </div>

          {/* Customer Service Column - With working links */}
          <div>
            <h3 style={{ color: '#fff', fontSize: '16px', marginBottom: '20px', fontWeight: '600' }}>Customer Service</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '12px' }}><a href="#" style={{ color: '#888', textDecoration: 'none', fontSize: '13px' }}>Help Center</a></li>
              <li style={{ marginBottom: '12px' }}><a href="#" style={{ color: '#888', textDecoration: 'none', fontSize: '13px' }}>Returns & Refunds</a></li>
              <li style={{ marginBottom: '12px' }}><a href="#" style={{ color: '#888', textDecoration: 'none', fontSize: '13px' }}>Shipping Info</a></li>
              <li style={{ marginBottom: '12px' }}><Link to="/contact" style={{ color: '#888', textDecoration: 'none', fontSize: '13px' }}>Contact Us</Link></li>
              <li><Link to="/faq" style={{ color: '#888', textDecoration: 'none', fontSize: '13px' }}>FAQ</Link></li>
            </ul>
          </div>

          {/* Quick Links Column - With working links */}
          <div>
            <h3 style={{ color: '#fff', fontSize: '16px', marginBottom: '20px', fontWeight: '600' }}>Quick Links</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '12px' }}><Link to="/account" style={{ color: '#888', textDecoration: 'none', fontSize: '13px' }}>My Account</Link></li>
              <li style={{ marginBottom: '12px' }}><Link to="/orders" style={{ color: '#888', textDecoration: 'none', fontSize: '13px' }}>My Orders</Link></li>
              <li style={{ marginBottom: '12px' }}><Link to="/wishlist" style={{ color: '#888', textDecoration: 'none', fontSize: '13px' }}>Wishlist</Link></li>
              <li style={{ marginBottom: '12px' }}><Link to="/products" style={{ color: '#888', textDecoration: 'none', fontSize: '13px' }}>All Products</Link></li>
              <li><Link to="/flash-sales" style={{ color: '#888', textDecoration: 'none', fontSize: '13px' }}>Flash Sales</Link></li>
            </ul>
          </div>

          {/* Contact Info Column */}
          <div>
            <h3 style={{ color: '#fff', fontSize: '16px', marginBottom: '20px', fontWeight: '600' }}>Get in Touch</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '15px' }}>
              <FaPhone style={{ color: '#ff6600', fontSize: '14px' }} />
              <span style={{ fontSize: '13px', color: '#888' }}>0800 000 0000</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '15px' }}>
              <FaEnvelope style={{ color: '#ff6600', fontSize: '14px' }} />
              <span style={{ fontSize: '13px', color: '#888' }}>help@markethub.com</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '15px' }}>
              <FaMapMarkerAlt style={{ color: '#ff6600', fontSize: '14px' }} />
              <span style={{ fontSize: '13px', color: '#888' }}>Lagos, Nigeria</span>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div style={{ marginTop: '50px', paddingTop: '30px', borderTop: '1px solid #222', textAlign: 'center' }}>
          <h3 style={{ color: '#fff', fontSize: '18px', marginBottom: '15px' }}>Subscribe to Our Newsletter</h3>
          <p style={{ fontSize: '13px', color: '#888', marginBottom: '20px' }}>Get the latest updates on new products and upcoming sales</p>
          <div style={{ display: 'flex', maxWidth: '450px', margin: '0 auto', gap: '10px' }}>
            <input type="email" placeholder="Your email address" style={{ flex: 1, padding: '12px 15px', background: '#1a1a1a', border: '1px solid #333', borderRadius: '8px', color: 'white', outline: 'none' }} />
            <button style={{ padding: '12px 25px', background: '#ff6600', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Subscribe</button>
          </div>
        </div>

        {/* Copyright */}
        <div style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #222', textAlign: 'center', fontSize: '12px', color: '#666' }}>
          <p>&copy; {currentYear} MarketHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
