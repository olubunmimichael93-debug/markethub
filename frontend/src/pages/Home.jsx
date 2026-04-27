import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => {
        setProducts(res.data.slice(0, 4));
        setFeatured(res.data.slice(0, 4));
      })
      .catch(err => console.log(err));
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

  return (
    <div>
      {/* Hero */}
      <div style={{ textAlign: 'center', padding: '40px 20px', background: '#fff', borderBottom: '1px solid #eee' }}>
        <h1>Welcome to MarketHub</h1>
        <p>Nigeria's #1 Online Marketplace</p>
        <button onClick={() => navigate('/products')} style={{ padding: '12px 30px', background: '#ff6600', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Shop Now →</button>
      </div>

      {/* Flash Sales */}
      <div style={{ maxWidth: '1200px', margin: '20px auto', padding: '0 20px' }}>
        <div style={{ background: '#fff', borderRadius: '8px', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '2px solid #ff6600', paddingBottom: '10px' }}>
            <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#ff6600' }}>⚡ FLASH SALES</span>
            <div style={{ display: 'flex', gap: '10px' }}>
              <span style={{ background: '#333', color: 'white', padding: '5px 10px', borderRadius: '5px' }}>{timeLeft.hours}h</span>
              <span>:</span>
              <span style={{ background: '#333', color: 'white', padding: '5px 10px', borderRadius: '5px' }}>{timeLeft.minutes}m</span>
              <span>:</span>
              <span style={{ background: '#333', color: 'white', padding: '5px 10px', borderRadius: '5px' }}>{timeLeft.seconds}s</span>
            </div>
            <Link to="/products" style={{ color: '#ff6600' }}>View All →</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px' }}>
            {products.map(p => (
              <Link key={p._id} to={`/product/${p._id}`} style={{ textDecoration: 'none', textAlign: 'center' }}>
                <div style={{ background: '#fafafa', padding: '15px', borderRadius: '8px' }}>
                  <img src={p.image} alt={p.name} style={{ width: '120px', height: '120px', objectFit: 'contain' }} />
                  <div><span style={{ background: '#ff4444', color: 'white', padding: '2px 6px', borderRadius: '3px', fontSize: '11px' }}>-{p.discount || 10}%</span></div>
                  <h4 style={{ fontSize: '13px', marginTop: '10px', color: '#333' }}>{p.name}</h4>
                  <div style={{ color: '#ff6600', fontWeight: 'bold' }}>₦{p.price.toLocaleString()}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Categories */}
      <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
        <h2 style={{ textAlign: 'center' }}>Shop by Category</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '15px', marginTop: '20px' }}>
          {['Phones', 'Computers', 'Electronics', 'Fashion', 'Home', 'Sports'].map(cat => (
            <div key={cat} onClick={() => navigate(`/products?category=${cat}`)} style={{ background: '#fff', padding: '25px', textAlign: 'center', borderRadius: '8px', cursor: 'pointer', border: '1px solid #eee' }}>
              <div style={{ fontSize: '40px' }}>{cat === 'Phones' ? '📱' : cat === 'Computers' ? '💻' : cat === 'Electronics' ? '📺' : cat === 'Fashion' ? '👗' : cat === 'Home' ? '🏠' : '⚽'}</div>
              <div>{cat}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured */}
      <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
        <h2 style={{ textAlign: 'center' }}>Featured Products</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginTop: '20px' }}>
          {featured.map(p => (
            <div key={p._id} onClick={() => navigate(`/product/${p._id}`)} style={{ background: '#fff', padding: '20px', textAlign: 'center', borderRadius: '8px', cursor: 'pointer', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <img src={p.image} alt={p.name} style={{ width: '120px', height: '120px', objectFit: 'contain' }} />
              <h3 style={{ fontSize: '14px', margin: '10px 0' }}>{p.name}</h3>
              <div style={{ color: '#ff6600', fontWeight: 'bold' }}>₦{p.price.toLocaleString()}</div>
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
