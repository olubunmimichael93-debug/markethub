import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

function FlashSales() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState({ hours: 12, minutes: 0, seconds: 0 });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://markethub-aj3o.onrender.com/api/products');
        // Get products with discount > 10%
        const discounted = response.data.filter(p => p.discount > 10);
        setProducts(discounted);
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

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

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) stars.push(<FaStar key={i} style={{ color: '#ffc107', fontSize: '12px' }} />);
      else if (i - 0.5 <= rating) stars.push(<FaStarHalfAlt key={i} style={{ color: '#ffc107', fontSize: '12px' }} />);
      else stars.push(<FaRegStar key={i} style={{ color: '#ffc107', fontSize: '12px' }} />);
    }
    return stars;
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '80px' }}>Loading flash deals...</div>;
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
      {/* Header with Timer */}
      <div style={{
        background: 'linear-gradient(135deg, #ff6600, #ff9933)',
        borderRadius: '12px',
        padding: '30px',
        textAlign: 'center',
        marginBottom: '30px',
        color: 'white'
      }}>
        <h1 style={{ fontSize: '36px', marginBottom: '10px' }}>⚡ FLASH SALES</h1>
        <p style={{ fontSize: '16px', marginBottom: '20px' }}>Limited time offers! Hurry while stocks last!</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
          <div style={{ background: 'rgba(0,0,0,0.7)', padding: '10px 20px', borderRadius: '8px' }}>
            <span style={{ fontSize: '28px', fontWeight: 'bold' }}>{timeLeft.hours}</span>
            <span> Hours</span>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.7)', padding: '10px 20px', borderRadius: '8px' }}>
            <span style={{ fontSize: '28px', fontWeight: 'bold' }}>{timeLeft.minutes}</span>
            <span> Minutes</span>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.7)', padding: '10px 20px', borderRadius: '8px' }}>
            <span style={{ fontSize: '28px', fontWeight: 'bold' }}>{timeLeft.seconds}</span>
            <span> Seconds</span>
          </div>
        </div>
      </div>

      {products.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px', background: 'white', borderRadius: '12px' }}>
          <h2>No flash deals at the moment</h2>
          <p>Check back soon for exclusive discounts!</p>
          <Link to="/products">
            <button style={{ marginTop: '20px', padding: '10px 25px', background: '#ff6600', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
              Browse All Products
            </button>
          </Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '25px' }}>
          {products.map(product => (
            <div key={product._id} style={{
              background: 'white',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              position: 'relative',
              transition: 'transform 0.3s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}>
              {/* Discount Badge */}
              <div style={{
                position: 'absolute',
                top: '10px',
                left: '10px',
                background: '#ff4444',
                color: 'white',
                padding: '4px 12px',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: 'bold',
                zIndex: 1
              }}>
                -{product.discount}%
              </div>

              {/* Flash Badge */}
              <div style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: '#ff6600',
                color: 'white',
                padding: '4px 12px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: 'bold',
                zIndex: 1
              }}>
                ⚡ FLASH
              </div>

              <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
                <div style={{ padding: '20px', textAlign: 'center', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fafafa' }}>
                  <img src={product.image} alt={product.name} style={{ maxWidth: '100%', maxHeight: '150px', objectFit: 'contain' }} />
                </div>
                <div style={{ padding: '15px' }}>
                  <h3 style={{ fontSize: '16px', marginBottom: '8px', color: '#333' }}>{product.name}</h3>
                  <p style={{ color: '#666', fontSize: '12px', marginBottom: '8px' }}>{product.brand || 'MarketHub'}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '8px' }}>
                    {renderStars(product.rating || 4)}
                    <span style={{ fontSize: '11px', color: '#666' }}>({product.reviews || 0})</span>
                  </div>
                  <div>
                    <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#ff6600' }}>₦{product.price.toLocaleString()}</span>
                    {product.originalPrice && (
                      <span style={{ fontSize: '13px', color: '#999', textDecoration: 'line-through', marginLeft: '8px' }}>
                        ₦{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: '11px', color: '#28a745', marginTop: '8px' }}>{product.sold || 0}+ sold</p>
                </div>
              </Link>
              <div style={{ padding: '12px 15px 15px', borderTop: '1px solid #f0f0f0' }}>
                <button
                  onClick={() => {
                    for (let i = 0; i < 1; i++) addToCart(product);
                    alert(`${product.name} added to cart!`);
                  }}
                  style={{
                    width: '100%',
                    background: '#ff6600',
                    color: 'white',
                    border: 'none',
                    padding: '10px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  🛒 Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FlashSales;
