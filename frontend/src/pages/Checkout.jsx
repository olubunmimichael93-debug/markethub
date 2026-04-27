import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import PaystackPayment from '../components/PaystackPayment';
import axios from 'axios';

function Checkout() {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { createOrder, user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [productImages, setProductImages] = useState({});
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: '',
    city: '',
  });

  // Fetch product images from database
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCashOrder = async () => {
    if (!formData.address || !formData.city) {
      alert('Please enter your delivery address');
      return;
    }
    
    setLoading(true);
    
    const orderData = {
      items: cartItems.map(item => ({
        product: item._id || item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image || productImages[item.name]
      })),
      totalAmount: getCartTotal(),
      shippingAddress: {
        fullName: formData.fullName,
        address: formData.address,
        city: formData.city,
        phone: formData.phone
      },
      paymentMethod: 'cash'
    };
    
    const result = await createOrder(orderData);
    
    if (result.success) {
      clearCart();
      navigate('/order-confirmation', { state: { order: result.order } });
    } else {
      alert(result.error || 'Failed to place order');
    }
    
    setLoading(false);
  };

  const handlePaystackSuccess = async (response) => {
    const orderData = {
      items: cartItems.map(item => ({
        product: item._id || item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image || productImages[item.name]
      })),
      totalAmount: getCartTotal(),
      shippingAddress: {
        fullName: formData.fullName,
        address: formData.address,
        city: formData.city,
        phone: formData.phone
      },
      paymentMethod: 'card',
      paymentReference: response.reference
    };
    
    const result = await createOrder(orderData);
    
    if (result.success) {
      clearCart();
      navigate('/order-confirmation', { state: { order: result.order } });
    } else {
      alert('Payment successful but order failed. Contact support.');
    }
  };

  const subtotal = getCartTotal();
  const delivery = subtotal > 50000 ? 0 : 5000;
  const total = subtotal + delivery;

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  // Get image for a product
  const getProductImage = (item) => {
    if (item.image) return item.image;
    if (productImages[item.name]) return productImages[item.name];
    return null;
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '0 20px' }}>
      <h1 style={{ marginBottom: '30px' }}>Checkout</h1>
      
      <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
        {/* LEFT COLUMN - Shipping Form */}
        <div style={{ flex: 1, minWidth: '280px' }}>
          <div style={{ background: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h2 style={{ marginBottom: '20px', fontSize: '18px' }}>Delivery Address</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Full Name</label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '5px' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '5px' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Phone</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '5px' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Street Address</label>
                <input type="text" name="address" placeholder="House number, street name" value={formData.address} onChange={handleChange} required style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '5px' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>City</label>
                <input type="text" name="city" value={formData.city} onChange={handleChange} required style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '5px' }} />
              </div>
            </div>
            
            <h2 style={{ margin: '25px 0 15px', fontSize: '18px' }}>Payment Method</h2>
            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', border: paymentMethod === 'cash' ? '2px solid #ff6600' : '1px solid #ddd', borderRadius: '8px', cursor: 'pointer', flex: 1 }}>
                <input type="radio" value="cash" checked={paymentMethod === 'cash'} onChange={(e) => setPaymentMethod(e.target.value)} />
                <div><strong>💰 Cash on Delivery</strong><p style={{ fontSize: '11px', margin: 0 }}>Pay when you receive</p></div>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', border: paymentMethod === 'card' ? '2px solid #ff6600' : '1px solid #ddd', borderRadius: '8px', cursor: 'pointer', flex: 1 }}>
                <input type="radio" value="card" checked={paymentMethod === 'card'} onChange={(e) => setPaymentMethod(e.target.value)} />
                <div><strong>💳 Card Payment</strong><p style={{ fontSize: '11px', margin: 0 }}>Pay with card</p></div>
              </label>
            </div>
            
            {paymentMethod === 'cash' ? (
              <button onClick={handleCashOrder} disabled={loading} style={{ width: '100%', marginTop: '25px', padding: '15px', background: '#ff6600', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
                {loading ? 'Placing Order...' : 'Place Order (Cash on Delivery)'}
              </button>
            ) : (
              <div style={{ marginTop: '25px' }}>
                <PaystackPayment 
                  email={formData.email}
                  amount={total}
                  onSuccess={handlePaystackSuccess}
                  onClose={() => {}}
                  customerName={formData.fullName}
                />
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN - Order Summary WITH PRODUCT IMAGES */}
        <div style={{ width: '350px' }}>
          <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', position: 'sticky', top: '20px' }}>
            <h2 style={{ marginBottom: '15px', fontSize: '18px' }}>Order Summary</h2>
            
            {/* Product List - Shows EACH product with IMAGE, NAME, QTY, PRICE */}
            <div style={{ marginBottom: '15px', maxHeight: '400px', overflowY: 'auto' }}>
              {cartItems.map(item => {
                const imageUrl = getProductImage(item);
                return (
                  <div key={item.id} style={{ display: 'flex', gap: '12px', marginBottom: '15px', paddingBottom: '12px', borderBottom: '1px solid #f0f0f0' }}>
                    {/* PRODUCT IMAGE */}
                    <div style={{ width: '55px', height: '55px', background: '#f5f5f5', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {imageUrl ? (
                        <img src={imageUrl} alt={item.name} style={{ width: '50px', height: '50px', objectFit: 'contain' }} />
                      ) : (
                        <span style={{ fontSize: '30px' }}>📦</span>
                      )}
                    </div>
                    {/* PRODUCT DETAILS */}
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '14px', fontWeight: 'bold' }}>{item.name}</div>
                      <div style={{ fontSize: '12px', color: '#666' }}>Quantity: {item.quantity}</div>
                    </div>
                    {/* PRODUCT PRICE */}
                    <div style={{ fontWeight: 'bold', fontSize: '14px', color: '#ff6600' }}>
                      ₦{(item.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                );
              })}
            </div>
            
            <hr />
            
            <div style={{ marginTop: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span>Subtotal ({cartItems.reduce((a, b) => a + b.quantity, 0)} items):</span>
                <span>₦{subtotal.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span>Delivery:</span>
                <span>{delivery === 0 ? 'Free' : `₦${delivery.toLocaleString()}`}</span>
              </div>
              {delivery > 0 && (
                <div style={{ fontSize: '11px', color: '#666', marginBottom: '10px' }}>
                  ✨ Add ₦{(50000 - subtotal).toLocaleString()} more for free delivery
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', paddingTop: '10px', borderTop: '1px solid #ddd', fontWeight: 'bold', fontSize: '18px' }}>
                <span>Total:</span>
                <span style={{ color: '#ff6600' }}>₦{total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
