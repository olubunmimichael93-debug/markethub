import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

function Footer() {
  return (
    <footer style={{ background: '#1a1a1a', color: '#999', marginTop: '50px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px', marginBottom: '30px' }}>
          <div><h3 style={{ color: 'white', marginBottom: '15px' }}>MarketHub</h3><p>Nigeria's #1 Online Marketplace</p></div>
          <div><h3 style={{ color: 'white', marginBottom: '15px' }}>Customer Service</h3><p>Help Center<br />Returns & Refunds<br />Contact Us</p></div>
          <div><h3 style={{ color: 'white', marginBottom: '15px' }}>Quick Links</h3><Link to="/account" style={{ color: '#999', textDecoration: 'none', display: 'block', marginBottom: '5px' }}>My Account</Link><Link to="/orders" style={{ color: '#999', textDecoration: 'none', display: 'block' }}>My Orders</Link></div>
          <div><h3 style={{ color: 'white', marginBottom: '15px' }}>Follow Us</h3><div style={{ display: 'flex', gap: '15px' }}><FaFacebook /><FaTwitter /><FaInstagram /><FaYoutube /></div></div>
        </div>
        <div style={{ textAlign: 'center', paddingTop: '20px', borderTop: '1px solid #333' }}>© 2025 MarketHub. All rights reserved.</div>
      </div>
    </footer>
  );
}

export default Footer;