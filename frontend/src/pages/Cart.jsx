import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaStore, FaArrowLeft } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [productImages, setProductImages] = useState({});

  // Fetch product images from database to ensure they show in cart
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('https://markethub-aj3o.onrender.com/api/products');
        const images = {};
        response.data.forEach(product => {
          images[product.name] = product.image;
        });
        setProductImages(images);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };
    fetchImages();
  }, []);

  // Get image for a product
  const getProductImage = (item) => {
    if (item.image) return item.image;
    if (productImages[item.name]) return productImages[item.name];
    return null;
  };

  if (cartItems.length === 0) {
    return (
      <div style={{ maxWidth: '600px', margin: '80px auto', padding: '0 20px', textAlign: 'center' }}>
        <button onClick={() => navigate('/products')} style={{ background: '#28a745', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>
          <FaStore /> Continue Shopping
        </button>
        <h1 style={{ marginTop: '30px' }}>Your Cart is Empty 🛒</h1>
        <button onClick={() => navigate('/products')} style={{ marginTop: '30px', padding: '12px 30px', background: '#ff6600', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Start Shopping →</button>
      </div>
    );
  }

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const delivery = total > 50000 ? 0 : 5000;
  const finalTotal = total + delivery;

  return (
    <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '0 20px' }}>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '15px' }}>
        <button onClick={() => navigate('/products')} style={{ background: '#28a745', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '5px', cursor: 'pointer' }}><FaStore /> Continue Shopping</button>
        <button onClick={() => navigate(-1)} style={{ background: '#666', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '5px', cursor: 'pointer' }}><FaArrowLeft /> Go Back</button>
      </div>

      <h1 style={{ marginBottom: '20px' }}>Shopping Cart ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})</h1>

      {/* Show each product clearly - LIST VIEW */}
      {cartItems.map((item, index) => {
        const imageUrl = getProductImage(item);
        return (
          <div key={item.id} style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            background: 'white', 
            padding: '15px', 
            borderRadius: '8px', 
            marginBottom: '10px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            {/* Product Image */}
            <div style={{ width: '80px', height: '80px', background: '#f5f5f5', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {imageUrl ? (
                <img src={imageUrl} alt={item.name} style={{ width: '70px', height: '70px', objectFit: 'contain' }} />
              ) : (
                <span style={{ fontSize: '40px' }}>📦</span>
              )}
            </div>
            
            {/* Product Info */}
            <div style={{ flex: 1, marginLeft: '15px' }}>
              <div style={{ fontWeight: 'bold', fontSize: '16px' }}>{item.name}</div>
              <div style={{ color: '#ff6600', fontWeight: 'bold', fontSize: '18px', marginTop: '5px' }}>₦{item.price.toLocaleString()}</div>
            </div>
            
            {/* Quantity Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ width: '32px', height: '32px', background: '#f0f0f0', border: '1px solid #ddd', borderRadius: '5px', cursor: 'pointer', fontSize: '18px' }}>-</button>
              <span style={{ fontSize: '18px', fontWeight: 'bold', minWidth: '35px', textAlign: 'center' }}>{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ width: '32px', height: '32px', background: '#f0f0f0', border: '1px solid #ddd', borderRadius: '5px', cursor: 'pointer', fontSize: '18px' }}>+</button>
            </div>
            
            {/* Item Total */}
            <div style={{ fontWeight: 'bold', fontSize: '18px', color: '#ff6600', minWidth: '100px', textAlign: 'right' }}>
              ₦{(item.price * item.quantity).toLocaleString()}
            </div>
            
            {/* Remove Button */}
            <button onClick={() => removeFromCart(item.id)} style={{ background: 'none', border: 'none', color: '#ff4444', cursor: 'pointer', marginLeft: '10px' }}>
              <FaTrash size={18} />
            </button>
          </div>
        );
      })}

      {/* Order Summary */}
      <div style={{ background: 'white', padding: '20px', borderRadius: '8px', marginTop: '20px' }}>
        <div style={{ maxWidth: '300px', marginLeft: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span>Subtotal ({cartItems.reduce((a, b) => a + b.quantity, 0)} items):</span>
            <span>₦{total.toLocaleString()}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span>Delivery Fee:</span>
            <span>{delivery === 0 ? 'Free' : `₦${delivery.toLocaleString()}`}</span>
          </div>
          {delivery > 0 && (
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '10px' }}>
              ✨ Add ₦{(50000 - total).toLocaleString()} more for free delivery
            </div>
          )}
          <hr style={{ margin: '15px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '20px', fontWeight: 'bold' }}>
            <span>Total:</span>
            <span style={{ color: '#ff6600' }}>₦{finalTotal.toLocaleString()}</span>
          </div>
          <button onClick={() => navigate('/checkout')} style={{ width: '100%', marginTop: '20px', padding: '15px', background: '#ff6600', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}>
            Proceed to Checkout →
          </button>
          <button onClick={clearCart} style={{ width: '100%', marginTop: '10px', padding: '10px', background: 'transparent', color: '#ff6600', border: '1px solid #ff6600', borderRadius: '5px', cursor: 'pointer' }}>
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
