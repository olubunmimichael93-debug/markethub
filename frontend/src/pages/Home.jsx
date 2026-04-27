import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
    { name: 'Phones', icon: '📱', link: 'Phones' },
    { name: 'Computers', icon: '💻', link: 'Computers' },
    { name: 'Electronics', icon: '📺', link: 'Electronics' },
    { name: 'Fashion', icon: '👗', link: 'Fashion' },
    { name: 'Home', icon: '🏠', link: 'Home' },
    { name: 'Sports', icon: '⚽', link: 'Sports' }
  ];

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '80px' }}>Loading...</div>;
  }

  return (
    <div>
      {/* Hero Section */}
      <div style={{ textAlign: 'center', padding: '60px 20px', background: '#fff', borderBottom: '1px solid #eee' }}>
        <h1 style={{ fontSize: 'clamp(24px, 5vw, 32px)', marginBottom: '10px' }}>Welcome to MarketHub</h1>
        <p style={{ fontSize: 'clamp(14px, 4vw, 16px)', color: '#666' }}>Nigeria's #1 Online Marketplace</p>
        <button onClick={() => navigate('/products')} style={{ marginTop: '20px', padding: '12px 30px', background: '#ff6600', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Shop Now →</button>
      </div>

      {/* Flash Sales */}
      <div style={{ maxWidth: '1200px', margin: '20px auto', padding: '0 15px' }}>
        <div style={{ background: '#fff', borderRadius: '8px', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', marginBottom: '20px', borderBottom: '2px solid #ff6600', paddingBottom: '10px' }}>
            <span style={{ fontSize: 'clamp(16px, 4vw, 20px)', fontWeight: 'bold', color: '#ff6600' }}>⚡ FLASH SALES</span>
            <div style={{ display: 'flex', gap: '8px' }}>
              <span style={{ background: '#333', color: 'white', padding: '5px 10px', borderRadius: '5px' }}>{timeLeft.hours}h</span>
              <span>:</span>
              <span style={{ background: '#333', color: 'white', padding: '5px 10px', borderRadius: '5px' }}>{timeLeft.minutes}m</span>
              <span>:</span>
              <span style={{ background: '#333', color: 'white', padding: '5px 10px', borderRadius: '5px' }}>{timeLeft.seconds}s</span>
            </div>
            <Link to="/products" style={{ color: '#ff6600', textDecoration: 'none' }}>View All →</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '15px' }}>
            {products.map(p => (
              <Link key={p._id} to={`/product/${p._id}`} style={{ textDecoration: 'none', textAlign: 'center' }}>
                <div style={{ background: '#fafafa', padding: '15px', borderRadius: '8px' }}>
                  <img src={p.image} alt={p.name} style={{ width: '100%', maxWidth: '120px', height: 'auto', margin: '0 auto' }} />
                  <div><span style={{ background: '#ff4444', color: 'white', padding: '2px 6px', borderRadius: '3px', fontSize: '11px' }}>-{p.discount || 10}%</span></div>
                  <h4 style={{ fontSize: '13px', marginTop: '10px', color: '#333' }}>{p.name}</h4>
                  <div style={{ color: '#ff6600', fontWeight: 'bold' }}>₦{p.price.toLocaleString()}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Categories - Mobile Responsive Grid */}
      <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 15px' }}>
        <h2 style={{ textAlign: 'center', fontSize: 'clamp(18px, 5vw, 22px)' }}>Shop by Category</h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', 
          gap: '15px', 
          marginTop: '20px' 
        }}>
          {categories.map(cat => (
            <div key={cat.name} onClick={() => navigate(`/products?category=${cat.link}`)} style={{ background: '#fff', padding: '25px 15px', textAlign: 'center', borderRadius: '8px', cursor: 'pointer', border: '1px solid #eee', transition: 'transform 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
              <div style={{ fontSize: 'clamp(30px, 8vw, 40px)' }}>{cat.icon}</div>
              <div style={{ fontSize: 'clamp(12px, 3vw, 14px)' }}>{cat.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Products - Mobile Responsive Grid */}
      <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 15px' }}>
        <h2 style={{ textAlign: 'center', fontSize: 'clamp(18px, 5vw, 22px)' }}>Featured Products</h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
          gap: '20px', 
          marginTop: '20px' 
        }}>
          {featured.map(p => (
            <div key={p._id} onClick={() => navigate(`/product/${p._id}`)} style={{ background: '#fff', padding: '20px', textAlign: 'center', borderRadius: '8px', cursor: 'pointer', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', transition: 'transform 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}>
              <img src={p.image} alt={p.name} style={{ width: '100%', maxWidth: '150px', height: 'auto', margin: '0 auto' }} />
              <h3 style={{ fontSize: 'clamp(12px, 4vw, 14px)', margin: '10px 0' }}>{p.name}</h3>
              <div style={{ color: '#ff6600', fontWeight: 'bold', fontSize: 'clamp(14px, 4vw, 16px)' }}>₦{p.price.toLocaleString()}</div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <button onClick={() => navigate('/products')} style={{ padding: '10px 25px', border: '1px solid #ff6600', background: '#fff', color: '#ff6600', borderRadius: '5px', cursor: 'pointer' }}>View All Products →</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
