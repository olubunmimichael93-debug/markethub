import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

function Footer() {
  return (
    <footer style={{ background: '#1a1a1a', color: '#999', marginTop: '60px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '50px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', marginBottom: '40px' }}>
          <div>
            <h3 style={{ color: 'white', marginBottom: '20px', fontSize: '18px' }}>MarketHub</h3>
            <p style={{ fontSize: '14px', lineHeight: '1.6' }}>Nigeria's #1 Online Marketplace for quality products at best prices.</p>
            <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
              <FaFacebook style={{ color: '#999', cursor: 'pointer' }} />
              <FaTwitter style={{ color: '#999', cursor: 'pointer' }} />
              <FaInstagram style={{ color: '#999', cursor: 'pointer' }} />
              <FaYoutube style={{ color: '#999', cursor: 'pointer' }} />
            </div>
          </div>
          
          <div>
            <h3 style={{ color: 'white', marginBottom: '20px', fontSize: '16px' }}>Customer Service</h3>
            <p style={{ fontSize: '13px', marginBottom: '10px' }}>Help Center</p>
            <p style={{ fontSize: '13px', marginBottom: '10px' }}>Returns & Refunds</p>
            <p style={{ fontSize: '13px', marginBottom: '10px' }}>Contact Us</p>
            <p style={{ fontSize: '13px' }}>FAQ</p>
          </div>
          
          <div>
            <h3 style={{ color: 'white', marginBottom: '20px', fontSize: '16px' }}>Quick Links</h3>
            <Link to="/account" style={{ color: '#999', textDecoration: 'none', display: 'block', marginBottom: '10px', fontSize: '13px' }}>My Account</Link>
            <Link to="/orders" style={{ color: '#999', textDecoration: 'none', display: 'block', marginBottom: '10px', fontSize: '13px' }}>My Orders</Link>
            <Link to="/wishlist" style={{ color: '#999', textDecoration: 'none', display: 'block', marginBottom: '10px', fontSize: '13px' }}>Wishlist</Link>
            <Link to="/products" style={{ color: '#999', textDecoration: 'none', display: 'block', fontSize: '13px' }}>All Products</Link>
          </div>
          
          <div>
            <h3 style={{ color: 'white', marginBottom: '20px', fontSize: '16px' }}>Contact Info</h3>
            <p style={{ fontSize: '13px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}><FaPhone style={{ color: '#ff6600' }} /> 0800 000 0000</p>
            <p style={{ fontSize: '13px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}><FaEnvelope style={{ color: '#ff6600' }} /> help@markethub.com</p>
            <p style={{ fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}><FaMapMarkerAlt style={{ color: '#ff6600' }} /> Lagos, Nigeria</p>
          </div>
        </div>
        
        <div style={{ textAlign: 'center', paddingTop: '30px', borderTop: '1px solid #333', fontSize: '13px' }}>
          <p>&copy; {new Date().getFullYear()} MarketHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
