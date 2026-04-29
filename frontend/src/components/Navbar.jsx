import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { FaSearch, FaShoppingCart, FaUser, FaHeart, FaHome, FaMoon, FaSun, FaTachometerAlt, FaHistory, FaBars, FaTimes, FaPhone, FaEnvelope, FaTruck } from 'react-icons/fa';
import { useState, useEffect } from 'react';

function Navbar() {
  const { getCartCount } = useCart();
  const { user, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) setMobileMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${searchTerm}`);
      setSearchTerm('');
      setMobileMenuOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Bar - Professional */}
      <div style={{ background: darkMode ? '#1a1a1a' : '#f8f8f8', padding: '8px 0', fontSize: '13px', borderBottom: '1px solid #e0e0e0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ display: 'flex', gap: '20px' }}>
            <span><FaPhone style={{ marginRight: '5px', color: '#ff6600' }} /> 0800 000 0000</span>
            <span><FaEnvelope style={{ marginRight: '5px', color: '#ff6600' }} /> help@markethub.com</span>
          </div>
          <div><FaTruck style={{ marginRight: '5px', color: '#28a745' }} /> Free Shipping on orders over ₦50,000</div>
        </div>
      </div>

      {/* Main Header */}
      <nav style={{ background: '#ffffff', padding: '15px 0', position: 'sticky', top: 0, zIndex: 1000, boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', flexWrap: 'wrap' }}>
          <Link to="/" style={{ fontSize: '26px', fontWeight: 'bold', color: '#ff6600', textDecoration: 'none' }}>MarketHub</Link>

          {!isMobile && (
            <form onSubmit={handleSearch} style={{ flex: 1, display: 'flex', maxWidth: '400px' }}>
              <input type="text" placeholder="Search products..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ flex: 1, padding: '12px', border: '1px solid #ddd', borderRadius: '5px 0 0 5px', fontSize: '14px', outline: 'none' }} />
              <button type="submit" style={{ background: '#ff6600', border: 'none', padding: '0 20px', borderRadius: '0 5px 5px 0', cursor: 'pointer', color: 'white' }}><FaSearch /></button>
            </form>
          )}

          {!isMobile && (
            <div style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
              <Link to="/" style={{ color: '#333', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}><FaHome /> Home</Link>
              <Link to="/wishlist" style={{ color: '#333', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}><FaHeart /> Wishlist</Link>
              <Link to="/cart" style={{ color: '#333', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', position: 'relative', fontSize: '14px' }}>
                <FaShoppingCart /> Cart
                {getCartCount() > 0 && <span style={{ position: 'absolute', top: '-10px', right: '-15px', background: '#ff6600', color: 'white', borderRadius: '50%', padding: '2px 6px', fontSize: '11px' }}>{getCartCount()}</span>}
              </Link>
              
              <button onClick={toggleDarkMode} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', color: '#666' }}>{darkMode ? <FaSun /> : <FaMoon />}</button>
              
              {user?.isAdmin && <Link to="/admin" style={{ color: '#333', textDecoration: 'none', fontSize: '14px' }}><FaTachometerAlt /> Admin</Link>}
              
              {user ? (
                <>
                  <Link to="/orders" style={{ color: '#333', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}><FaHistory /> Orders</Link>
                  <Link to="/account" style={{ color: '#333', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}><FaUser /> Account</Link>
                  <button onClick={handleLogout} style={{ background: '#ff6600', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '5px', cursor: 'pointer' }}>Logout</button>
                  <span style={{ color: '#ff6600', fontSize: '14px' }}>Hi, {user.name}</span>
                </>
              ) : (
                <>
                  <Link to="/login" style={{ color: '#333', textDecoration: 'none', fontSize: '14px' }}>Login</Link>
                  <Link to="/register" style={{ background: '#ff6600', color: 'white', padding: '8px 16px', borderRadius: '5px', textDecoration: 'none' }}>Sign Up</Link>
                </>
              )}
            </div>
          )}

          {isMobile && (
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '24px', color: '#333' }}>
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          )}
        </div>

        {isMobile && mobileMenuOpen && (
          <div style={{ background: 'white', padding: '20px', borderTop: '1px solid #eee', display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <form onSubmit={handleSearch} style={{ display: 'flex' }}>
              <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ flex: 1, padding: '10px', border: '1px solid #ddd', borderRadius: '5px 0 0 5px' }} />
              <button type="submit" style={{ background: '#ff6600', border: 'none', padding: '0 15px', borderRadius: '0 5px 5px 0', color: 'white' }}><FaSearch /></button>
            </form>
            <Link to="/" onClick={() => setMobileMenuOpen(false)} style={{ padding: '10px 0', color: '#333', textDecoration: 'none' }}>Home</Link>
            <Link to="/wishlist" onClick={() => setMobileMenuOpen(false)} style={{ padding: '10px 0', color: '#333', textDecoration: 'none' }}>Wishlist</Link>
            <Link to="/cart" onClick={() => setMobileMenuOpen(false)} style={{ padding: '10px 0', color: '#333', textDecoration: 'none' }}>Cart {getCartCount() > 0 && <span style={{ background: '#ff6600', color: 'white', padding: '2px 8px', borderRadius: '10px', marginLeft: '5px' }}>{getCartCount()}</span>}</Link>
            {user?.isAdmin && <Link to="/admin" onClick={() => setMobileMenuOpen(false)} style={{ padding: '10px 0', color: '#333', textDecoration: 'none' }}>Admin</Link>}
            {user ? (
              <>
                <Link to="/orders" onClick={() => setMobileMenuOpen(false)} style={{ padding: '10px 0', color: '#333', textDecoration: 'none' }}>Orders</Link>
                <Link to="/account" onClick={() => setMobileMenuOpen(false)} style={{ padding: '10px 0', color: '#333', textDecoration: 'none' }}>Account</Link>
                <button onClick={handleLogout} style={{ background: '#ff6600', color: 'white', border: 'none', padding: '10px', borderRadius: '5px' }}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)} style={{ padding: '10px 0', color: '#333', textDecoration: 'none' }}>Login</Link>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)} style={{ background: '#ff6600', color: 'white', padding: '10px', borderRadius: '5px', textAlign: 'center' }}>Sign Up</Link>
              </>
            )}
          </div>
        )}
      </nav>

      {/* Category Bar */}
      <div style={{ background: '#f8f8f8', borderBottom: '1px solid #eee', overflowX: 'auto' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', display: 'flex', gap: '25px' }}>
          <Link to="/products" style={{ padding: '12px 0', color: '#666', textDecoration: 'none', fontSize: '14px', whiteSpace: 'nowrap' }}>All Products</Link>
          <Link to="/products?category=Phones" style={{ padding: '12px 0', color: '#666', textDecoration: 'none', fontSize: '14px', whiteSpace: 'nowrap' }}>Phones</Link>
          <Link to="/products?category=Computers" style={{ padding: '12px 0', color: '#666', textDecoration: 'none', fontSize: '14px', whiteSpace: 'nowrap' }}>Computers</Link>
          <Link to="/products?category=Electronics" style={{ padding: '12px 0', color: '#666', textDecoration: 'none', fontSize: '14px', whiteSpace: 'nowrap' }}>Electronics</Link>
          <Link to="/products?category=Fashion" style={{ padding: '12px 0', color: '#666', textDecoration: 'none', fontSize: '14px', whiteSpace: 'nowrap' }}>Fashion</Link>
          <Link to="/products?category=Home" style={{ padding: '12px 0', color: '#666', textDecoration: 'none', fontSize: '14px', whiteSpace: 'nowrap' }}>Home</Link>
        </div>
      </div>
    </>
  );
}

export default Navbar;
