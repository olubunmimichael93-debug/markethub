import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaTrash, FaShoppingCart, FaArrowLeft } from 'react-icons/fa';

function Wishlist() {
  const navigate = useNavigate();
  const { wishlist, removeFromWishlist, user } = useAuth();

  const handleRemove = async (productId) => {
    await removeFromWishlist(productId);
  };

  const handleBuyNow = (productId) => {
    navigate(`/product/${productId}`);
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  if (wishlist.length === 0) {
    return (
      <div style={{ maxWidth: '1200px', margin: '80px auto', padding: '0 20px', textAlign: 'center' }}>
        <div style={{ marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => navigate('/products')} style={{ display: 'flex', alignItems: 'center', gap: '5px', background: '#28a745', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>
            Continue Shopping
          </button>
          <button onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', gap: '5px', background: '#666', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>
            <FaArrowLeft /> Go Back
          </button>
        </div>
        <h1>My Wishlist</h1>
        <p style={{ marginTop: '20px', color: '#666' }}>Your wishlist is empty</p>
        <button onClick={() => navigate('/products')} style={{ marginTop: '30px', padding: '12px 30px', background: '#ff6600', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Start Shopping</button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
      <div style={{ marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '15px', flexWrap: 'wrap' }}>
        <button onClick={() => navigate('/products')} style={{ display: 'flex', alignItems: 'center', gap: '5px', background: '#28a745', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>
          Continue Shopping
        </button>
        <button onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', gap: '5px', background: '#666', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>
          <FaArrowLeft /> Go Back
        </button>
      </div>

      <h1>My Wishlist ({wishlist.length})</h1>
      
      <div style={{ display: 'grid', gap: '20px', marginTop: '20px' }}>
        {wishlist.map((item) => (
          <div key={item.product._id} style={{ 
            background: 'white', 
            padding: '20px', 
            borderRadius: '12px', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '20px', 
            flexWrap: 'wrap',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '60px' }}>{item.product.image || '📦'}</div>
            <div style={{ flex: 1 }}>
              <h3>{item.product.name}</h3>
              <p style={{ color: '#666' }}>{item.product.brand || 'MarketHub'}</p>
              <div>
                <span style={{ color: '#ff6600', fontWeight: 'bold', fontSize: '20px' }}>
                  ₦{item.product.price.toLocaleString()}
                </span>
                {item.product.originalPrice && (
                  <span style={{ textDecoration: 'line-through', color: '#999', marginLeft: '10px' }}>
                    ₦{item.product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              {item.product.discount > 0 && (
                <p style={{ color: '#ff4444', fontSize: '12px', marginTop: '5px' }}>-{item.product.discount}% off</p>
              )}
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                onClick={() => handleBuyNow(item.product._id)} 
                style={{ 
                  padding: '10px 20px', 
                  background: '#ff6600', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '5px', 
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}
              >
                <FaShoppingCart /> Buy Now
              </button>
              <button 
                onClick={() => handleRemove(item.product._id)} 
                style={{ 
                  padding: '10px 20px', 
                  background: 'white', 
                  border: '1px solid #ff4444', 
                  borderRadius: '5px', 
                  cursor: 'pointer', 
                  color: '#ff4444' 
                }}
              >
                <FaTrash /> Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;