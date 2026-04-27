import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function FlashSales() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 12,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const flashProducts = [
    { id: 1, name: 'iPhone 14 Pro', price: 650000, original: 950000, discount: 32, image: '📱', sold: 245 },
    { id: 2, name: 'Samsung Galaxy S23', price: 550000, original: 850000, discount: 35, image: '📱', sold: 189 },
    { id: 3, name: 'MacBook Air M2', price: 1200000, original: 1700000, discount: 29, image: '💻', sold: 67 },
    { id: 4, name: 'Wireless Earbuds', price: 25000, original: 50000, discount: 50, image: '🎧', sold: 512 },
  ];

  return (
    <div style={{
      background: '#fff',
      borderRadius: '8px',
      margin: '20px auto',
      maxWidth: '1200px',
      padding: '20px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginBottom: '20px',
        borderBottom: '2px solid #ff6600',
        paddingBottom: '10px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#ff6600' }}>⚡ FLASH SALES</span>
          <div style={{ display: 'flex', gap: '10px' }}>
            <span style={{ background: '#333', color: 'white', padding: '5px 10px', borderRadius: '5px' }}>{timeLeft.hours}h</span>
            <span>:</span>
            <span style={{ background: '#333', color: 'white', padding: '5px 10px', borderRadius: '5px' }}>{timeLeft.minutes}m</span>
            <span>:</span>
            <span style={{ background: '#333', color: 'white', padding: '5px 10px', borderRadius: '5px' }}>{timeLeft.seconds}s</span>
          </div>
        </div>
        <Link to="/flash-sales" style={{ color: '#ff6600', textDecoration: 'none' }}>View All →</Link>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '15px'
      }}>
        {flashProducts.map(product => (
          <div key={product.id} style={{ position: 'relative' }}>
            <div style={{
              position: 'absolute',
              top: '5px',
              left: '5px',
              background: '#ff4444',
              color: 'white',
              padding: '2px 6px',
              borderRadius: '3px',
              fontSize: '11px',
              fontWeight: 'bold'
            }}>
              -{product.discount}%
            </div>
            <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
              <div style={{ textAlign: 'center', padding: '15px', background: '#fafafa', borderRadius: '8px' }}>
                <div style={{ fontSize: '50px' }}>{product.image}</div>
                <h4 style={{ fontSize: '13px', marginTop: '10px', color: '#333' }}>{product.name}</h4>
                <div style={{ color: '#ff6600', fontWeight: 'bold' }}>₦{product.price.toLocaleString()}</div>
                <div style={{ fontSize: '11px', color: '#999', textDecoration: 'line-through' }}>₦{product.original.toLocaleString()}</div>
                <div style={{ fontSize: '11px', color: '#28a745' }}>{product.sold}+ sold</div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FlashSales;