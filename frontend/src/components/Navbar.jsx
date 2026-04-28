import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { FaSearch, FaShoppingCart, FaUser, FaHeart, FaHome, FaMoon, FaSun, FaTachometerAlt, FaHistory, FaBars, FaTimes } from 'react-icons/fa';
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
      if (window.innerWidth > 768) {
        setMobileMenuOpen(false);
      }
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

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <>
      {/* Top Bar */}
      <div style={{ background: darkMode ? '#2d2d2d' : '#f5f5f5', padding: '8px 0', fontSize: '12px', borderBottom: '1px solid #ddd' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 15px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
          <span>📞 0800 000 0000</span>
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
            <span>📧 help@markethub.com</span>
            <span>✓ Free Shipping on orders over ₦50,000</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <nav style={{ background: '#ff6600', padding: '12px 0', position: 'sticky', top: 0, zIndex: 1000, boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 15px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '15px', flexWrap: 'wrap' }}>
          {/* Logo */}
          <Link to="/" style={{ fontSize: 'clamp(20px, 5vw, 28px)', fontWeight: 'bold', color: 'white', textDecoration: 'none' }}>MarketHub</Link>

          {/* Search Bar - Hide on mobile */}
          {!isMobile && (
            <form onSubmit={handleSearch} style={{ flex: 1, display: 'flex', maxWidth: '400px', minWidth: '200px' }}>
              <input 
                type="text" 
                placeholder="Search products..." 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
                style={{ flex: 1, padding: '10px', border: 'none', borderRadius: '5px 0 0 5px', fontSize: '14px', outline: 'none' }} 
              />
              <button type="submit" style={{ background: '#333', border: 'none', padding: '0 15px', borderRadius: '0 5px 5px 0', cursor: 'pointer', color: 'white' }}>
                <FaSearch />
              </button>
            </form>
          )}

          {/* Desktop Navigation */}
          {!isMobile && (
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center', flexWrap: 'wrap' }}>
              <Link to="/" style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px' }}><FaHome /> Home</Link>
              <Link to="/wishlist" style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px' }}><FaHeart /> Wishlist</Link>
              <Link to="/cart" style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px', position: 'relative' }}>
                <FaShoppingCart /> Cart
                {getCartCount() > 0 && (
                  <span style={{ position: 'absolute', top: '-10px', right: '-15px', background: '#333', color: 'white', borderRadius: '50%', padding: '2px 6px', fontSize: '10px' }}>
                    {getCartCount()}
                  </span>
                )}
              </Link>
              
              <button onClick={toggleDarkMode} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', fontSize: '18px', display: 'flex', alignItems: 'center' }}>
                {darkMode ? <FaSun /> : <FaMoon />}
              </button>
              
              {user?.isAdmin && (
                <Link to="/admin" style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <FaTachometerAlt /> Admin
                </Link>
              )}
              
              {user ? (
                <>
                  <Link to="/orders" style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <FaHistory /> Orders
                  </Link>
                  <Link to="/account" style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <FaUser /> Account
                  </Link>
                  <button onClick={handleLogout} style={{ background: '#333', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '5px', cursor: 'pointer' }}>Logout</button>
                  <span style={{ color: '#ffd89b', fontSize: '13px' }}>Hi, {user.name}</span>
                </>
              ) : (
                <>
                  <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link>
                  <Link to="/register" style={{ background: 'white', color: '#ff6600', padding: '6px 12px', borderRadius: '5px', textDecoration: 'none', fontWeight: 'bold' }}>Sign Up</Link>
                </>
              )}
            </div>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', fontSize: '24px' }}>
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          )}
        </div>

        {/* Mobile Menu - Slide down */}
        {isMobile && mobileMenuOpen && (
          <div style={{ 
            background: '#ff6600', 
            padding: '20px 15px', 
            borderTop: '1px solid rgba(255,255,255,0.2)',
            display: 'flex',
            flexDirection: 'column',
            gap: '15px'
          }}>
            {/* Search in mobile menu */}
            <form onSubmit={handleSearch} style={{ display: 'flex', width: '100%' }}>
              <input 
                type="text" 
                placeholder="Search products..." 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
                style={{ flex: 1, padding: '10px', border: 'none', borderRadius: '5px 0 0 5px', fontSize: '14px', outline: 'none' }} 
              />
              <button type="submit" style={{ background: '#333', border: 'none', padding: '0 15px', borderRadius: '0 5px 5px 0', cursor: 'pointer', color: 'white' }}>
                <FaSearch />
              </button>
            </form>
            
            <Link to="/" onClick={closeMenu} style={{ color: 'white', textDecoration: 'none', padding: '8px 0' }}>🏠 Home</Link>
            <Link to="/wishlist" onClick={closeMenu} style={{ color: 'white', textDecoration: 'none', padding: '8px 0' }}>❤️ Wishlist</Link>
            <Link to="/cart" onClick={closeMenu} style={{ color: 'white', textDecoration: 'none', padding: '8px 0', position: 'relative' }}>
              🛒 Cart {getCartCount() > 0 && <span style={{ background: '#333', color: 'white', borderRadius: '50%', padding: '2px 8px', marginLeft: '5px' }}>{getCartCount()}</span>}
            </Link>
            
            <button onClick={toggleDarkMode} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', fontSize: '16px', textAlign: 'left', padding: '8px 0' }}>
              {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </button>
            
            {user?.isAdmin && (
              <Link to="/admin" onClick={closeMenu} style={{ color: 'white', textDecoration: 'none', padding: '8px 0' }}>👑 Admin</Link>
            )}
            
            {user ? (
              <>
                <Link to="/orders" onClick={closeMenu} style={{ color: 'white', textDecoration: 'none', padding: '8px 0' }}>📦 My Orders</Link>
                <Link to="/account" onClick={closeMenu} style={{ color: 'white', textDecoration: 'none', padding: '8px 0' }}>👤 Account</Link>
                <button onClick={handleLogout} style={{ background: 'white', color: '#ff6600', border: 'none', padding: '8px 12px', borderRadius: '5px', cursor: 'pointer', marginTop: '5px' }}>Logout</button>
                <span style={{ color: '#ffd89b', fontSize: '13px', marginTop: '5px' }}>Hi, {user.name}</span>
              </>
            ) : (
              <>
                <Link to="/login" onClick={closeMenu} style={{ color: 'white', textDecoration: 'none', padding: '8px 0' }}>🔐 Login</Link>
                <Link to="/register" onClick={closeMenu} style={{ background: 'white', color: '#ff6600', padding: '8px 12px', borderRadius: '5px', textDecoration: 'none', fontWeight: 'bold', textAlign: 'center' }}>Sign Up</Link>
              </>
            )}
          </div>
        )}
      </nav>

      {/* Category Menu Bar - Responsive scroll */}
      <div style={{ background: darkMode ? '#2d2d2d' : 'white', borderBottom: '1px solid #ddd', overflowX: 'auto', whiteSpace: 'nowrap' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 15px', display: 'flex', gap: '15px' }}>
          <Link to="/products" style={{ padding: '12px 0', color: darkMode ? '#fff' : '#333', textDecoration: 'none', fontSize: '14px', display: 'inline-block' }}>All Products</Link>
          <Link to="/products?category=Phones" style={{ padding: '12px 0', color: darkMode ? '#fff' : '#333', textDecoration: 'none', fontSize: '14px', display: 'inline-block' }}>Phones</Link>
          <Link to="/products?category=Computers" style={{ padding: '12px 0', color: darkMode ? '#fff' : '#333', textDecoration: 'none', fontSize: '14px', display: 'inline-block' }}>Computers</Link>
          <Link to="/products?category=Electronics" style={{ padding: '12px 0', color: darkMode ? '#fff' : '#333', textDecoration: 'none', fontSize: '14px', display: 'inline-block' }}>Electronics</Link>
          <Link to="/products?category=Fashion" style={{ padding: '12px 0', color: darkMode ? '#fff' : '#333', textDecoration: 'none', fontSize: '14px', display: 'inline-block' }}>Fashion</Link>
          <Link to="/products?category=Home" style={{ padding: '12px 0', color: darkMode ? '#fff' : '#333', textDecoration: 'none', fontSize: '14px', display: 'inline-block' }}>Home & Kitchen</Link>
        </div>
      </div>
    </>
  );
}

export default Navbar;
