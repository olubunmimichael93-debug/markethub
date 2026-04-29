import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaStar, FaStarHalfAlt, FaRegStar, FaShoppingCart, FaHeart, FaRegHeart } from 'react-icons/fa';

function Home() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://markethub-aj3o.onrender.com/api/products')
      .then(res => {
        setProducts(res.data.slice(0, 4));
        setFeatured(res.data.slice(0, 4));
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const [timeLeft, setTimeLeft] = useState({ hours: 12, minutes: 0, seconds: 0 });
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { hours: prev.hours, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const categories = [
    { name: 'Phones', icon: <FaMobileAlt />, link: 'Phones', color: '#ff6600' },
    { name: 'Computers', icon: <FaLaptop />, link: 'Computers', color: '#17a2b8' },
    { name: 'Electronics', icon: <FaHeadphones />, link: 'Electronics', color: '#28a745' },
    { name: 'Fashion', icon: <FaTshirt />, link: 'Fashion', color: '#e83e8c' },
    { name: 'Home', icon: <FaHome />, link: 'Home', color: '#6f42c1' },
    { name: 'Sports', icon: <FaFutbol />, link: 'Sports', color: '#fd7e14' }
  ];

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) stars.push(<FaStar key={i} style={{ color: '#ffc107', fontSize: '12px' }} />);
      else if (i - 0.5 <= rating) stars.push(<FaStarHalfAlt key={i} style={{ color: '#ffc107', fontSize: '12px' }} />);
      else stars.push(<FaRegStar key={i} style={{ color: '#ffc107', fontSize: '12px' }} />);
    }
    return stars;
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '80px' }}>Loading...</div>;

  return (
    <div>
      {/* Hero Section - Clean */}
      <div style={{ textAlign: 'center', padding: '80px 20px', background: 'linear-gradient(135deg, #f5f5f5 0%, #fff 100%)', borderBottom: '1px solid #eee' }}>
        <h1 style={{ fontSize: 'clamp(28px, 6vw, 42px)', marginBottom: '15px', color: '#333' }}>Welcome to MarketHub</h1>
        <p style={{ fontSize: 'clamp(16px, 4vw, 18px)', color: '#666', marginBottom: '30px' }}>Nigeria's #1 Online Marketplace</p>
        <button onClick={() => navigate('/products')} style={{ padding: '14px 35px', background: '#ff6600', color: 'white', border: 'none', borderRadius: '30px', cursor: 'pointer', fontWeight: 'bold' }}>Shop Now →</button>
      </div>

      {/* Flash Sales */}
      <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
        <div style={{ background: '#fff', borderRadius: '12px', padding: '25px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', marginBottom: '20px', paddingBottom: '15px', borderBottom: '2px solid #ff6600' }}>
            <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#ff6600' }}>⚡ Flash Sales</span>
            <div style={{ display: 'flex', gap: '10px' }}>
              <span style={{ background: '#333', color: 'white', padding: '8px 12px', borderRadius: '8px', fontWeight: 'bold' }}>{timeLeft.hours}h</span>
              <span style={{ fontSize: '18px' }}>:</span>
              <span style={{ background: '#333', color: 'white', padding: '8px 12px', borderRadius: '8px', fontWeight: 'bold' }}>{timeLeft.minutes}m</span>
              <span style={{ fontSize: '18px' }}>:</span>
              <span style={{ background: '#333', color: 'white', padding: '8px 12px', borderRadius: '8px', fontWeight: 'bold' }}>{timeLeft.seconds}s</span>
            </div>
            <Link to="/products" style={{ color: '#ff6600', textDecoration: 'none' }}>View All →</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
            {products.map(p => (
              <Link key={p._id} to={`/product/${p._id}`} style={{ textDecoration: 'none' }}>
                <div style={{ background: '#fafafa', padding: '20px', borderRadius: '10px', textAlign: 'center', transition: 'transform 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}>
                  <img src={p.image} alt={p.name} style={{ width: '100%', maxWidth: '120px', height: 'auto', margin: '0 auto' }} />
                  <div style={{ marginTop: '10px' }}><span style={{ background: '#ff4444', color: 'white', padding: '3px 8px', borderRadius: '20px', fontSize: '11px' }}>-{p.discount || 10}%</span></div>
                  <h4 style={{ fontSize: '14px', marginTop: '10px', color: '#333' }}>{p.name}</h4>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '5px', marginBottom: '5px' }}>{renderStars(p.rating || 4)}</div>
                  <div style={{ color: '#ff6600', fontWeight: 'bold' }}>₦{p.price.toLocaleString()}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Categories - Professional Grid */}
      <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
        <h2 style={{ textAlign: 'center', fontSize: '24px', marginBottom: '30px', color: '#333' }}>Shop by Category</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '20px' }}>
          {categories.map(cat => (
            <div key={cat.name} onClick={() => navigate(`/products?category=${cat.link}`)} style={{ background: '#fff', padding: '25px', textAlign: 'center', borderRadius: '12px', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', transition: 'all 0.3s', border: '1px solid #f0f0f0' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)'; }}>
              <div style={{ fontSize: '40px', color: cat.color, marginBottom: '10px' }}>{cat.icon}</div>
              <div style={{ fontSize: '14px', color: '#555', fontWeight: '500' }}>{cat.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
        <h2 style={{ textAlign: 'center', fontSize: '24px', marginBottom: '30px', color: '#333' }}>Featured Products</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '25px' }}>
          {featured.map(p => (
            <div key={p._id} onClick={() => navigate(`/product/${p._id}`)} style={{ background: '#fff', borderRadius: '12px', overflow: 'hidden', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', transition: 'all 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <div style={{ padding: '20px', textAlign: 'center', background: '#fafafa' }}>
                <img src={p.image} alt={p.name} style={{ width: '100%', maxWidth: '150px', height: 'auto', margin: '0 auto' }} />
              </div>
              <div style={{ padding: '15px' }}>
                <h3 style={{ fontSize: '15px', marginBottom: '8px', color: '#333' }}>{p.name}</h3>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '5px', marginBottom: '8px' }}>{renderStars(p.rating || 4)}</div>
                <div style={{ color: '#ff6600', fontWeight: 'bold', fontSize: '18px' }}>₦{p.price.toLocaleString()}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <button onClick={() => navigate('/products')} style={{ padding: '12px 30px', border: '1px solid #ff6600', background: 'white', color: '#ff6600', borderRadius: '30px', cursor: 'pointer', fontWeight: 'bold' }}>View All Products →</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
