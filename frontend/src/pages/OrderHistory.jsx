import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

function OrderHistory() {
  const { orders, fetchOrders, token } = useAuth();
  const { addToCart } = useCart();
  const [cancelling, setCancelling] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const getStatusColor = (status) => {
    switch(status) {
      case 'delivered': return '#28a745';
      case 'shipped': return '#17a2b8';
      case 'processing': return '#ffc107';
      case 'cancelled': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const getStatusStep = (status) => {
    const steps = ['pending', 'processing', 'shipped', 'delivered'];
    const currentIndex = steps.indexOf(status);
    return currentIndex >= 0 ? currentIndex : 0;
  };

  const canCancel = (order) => {
    if (order.status === 'cancelled' || order.status === 'delivered') return false;
    // Check if order is within 30 minutes of being placed
    const orderDate = new Date(order.createdAt);
    const now = new Date();
    const minutesDiff = (now - orderDate) / (1000 * 60);
    return minutesDiff < 30 && order.status !== 'shipped';
  };

  const handleReorder = async (order) => {
    for (const item of order.items) {
      // Add each item back to cart
      const product = {
        _id: item.product,
        id: item.product,
        name: item.name,
        price: item.price,
        image: item.image || '📦',
        quantity: item.quantity
      };
      for (let i = 0; i < item.quantity; i++) {
        addToCart(product);
      }
    }
    setMessage('Items added to cart!');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to cancel this order?')) return;
    
    setCancelling(orderId);
    try {
      const response = await fetch(`http://localhost:5000/api/orders/${orderId}/cancel`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setMessage('Order cancelled successfully!');
        fetchOrders(); // Refresh orders
      } else {
        setMessage(data.message || 'Cannot cancel this order');
      }
    } catch (error) {
      setMessage('Error cancelling order');
    }
    setCancelling(null);
    setTimeout(() => setMessage(''), 3000);
  };

  if (orders.length === 0) {
    return (
      <div style={{ maxWidth: '1200px', margin: '80px auto', padding: '0 20px', textAlign: 'center' }}>
        <h1>No Orders Yet</h1>
        <p style={{ marginTop: '20px' }}>You haven't placed any orders yet.</p>
        <Link to="/products">
          <button style={{ marginTop: '30px', padding: '12px 30px', background: '#ff6600', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Start Shopping →
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
      <h1 style={{ marginBottom: '30px' }}>My Orders</h1>
      
      {message && (
        <div style={{ background: '#28a745', color: 'white', padding: '10px', borderRadius: '5px', marginBottom: '20px', textAlign: 'center' }}>
          {message}
        </div>
      )}
      
      {orders.map(order => {
        const canCancelOrder = canCancel(order);
        const statusStep = getStatusStep(order.status);
        
        return (
          <div key={order._id} style={{ border: '1px solid #eee', borderRadius: '8px', padding: '20px', marginBottom: '20px', background: 'white' }}>
            {/* Order Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid #eee' }}>
              <div>
                <strong>Order #{order._id.slice(-8)}</strong>
                <p style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ background: getStatusColor(order.status), color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '12px' }}>
                  {order.status?.toUpperCase() || 'PENDING'}
                </span>
                <p style={{ fontWeight: 'bold', marginTop: '5px' }}>₦{order.totalAmount.toLocaleString()}</p>
              </div>
            </div>
            
            {/* Order Items */}
            <div style={{ marginBottom: '15px' }}>
              {order.items.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '10px 0', borderBottom: idx !== order.items.length - 1 ? '1px solid #f0f0f0' : 'none' }}>
                  <div style={{ fontSize: '40px' }}>{item.image || '📦'}</div>
                  <div style={{ flex: 1 }}>
                    <Link to={`/product/${item.product}`} style={{ color: '#333', textDecoration: 'none' }}>
                      <h4 style={{ fontSize: '14px' }}>{item.name}</h4>
                    </Link>
                    <p style={{ fontSize: '12px', color: '#666' }}>Qty: {item.quantity} × ₦{item.price.toLocaleString()}</p>
                  </div>
                  <div style={{ fontWeight: 'bold' }}>₦{(item.price * item.quantity).toLocaleString()}</div>
                </div>
              ))}
            </div>
            
            {/* Order Tracking Progress Bar - Like Jumia */}
            <div style={{ marginBottom: '20px', padding: '15px', background: '#f9f9f9', borderRadius: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', position: 'relative' }}>
                {['Order Placed', 'Processing', 'Shipped', 'Delivered'].map((step, idx) => (
                  <div key={step} style={{ textAlign: 'center', flex: 1 }}>
                    <div style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      background: idx <= statusStep ? '#ff6600' : '#e0e0e0',
                      color: idx <= statusStep ? 'white' : '#999',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 5px',
                      fontSize: '14px'
                    }}>
                      {idx + 1}
                    </div>
                    <div style={{ fontSize: '10px', color: idx <= statusStep ? '#ff6600' : '#999' }}>{step}</div>
                  </div>
                ))}
              </div>
              <div style={{ height: '4px', background: '#e0e0e0', borderRadius: '2px', position: 'relative' }}>
                <div style={{ width: `${(statusStep + 1) * 25}%`, height: '4px', background: '#ff6600', borderRadius: '2px' }}></div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', justifyContent: 'flex-end', borderTop: '1px solid #eee', paddingTop: '15px' }}>
              <Link to={`/order/${order._id}`}>
                <button style={{ padding: '8px 20px', background: '#fff', color: '#ff6600', border: '1px solid #ff6600', borderRadius: '5px', cursor: 'pointer' }}>
                  View Details
                </button>
              </Link>
              
              <button onClick={() => handleReorder(order)} style={{ padding: '8px 20px', background: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                Buy Again
              </button>
              
              {canCancelOrder && (
                <button 
                  onClick={() => handleCancelOrder(order._id)} 
                  disabled={cancelling === order._id}
                  style={{ padding: '8px 20px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', cursor: cancelling === order._id ? 'not-allowed' : 'pointer' }}
                >
                  {cancelling === order._id ? 'Cancelling...' : 'Cancel Order'}
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default OrderHistory;
