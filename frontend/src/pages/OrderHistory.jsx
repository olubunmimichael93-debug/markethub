import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

function OrderHistory() {
  const { orders, fetchOrders, token, user } = useAuth();
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadOrders = async () => {
      if (user) {
        await fetchOrders();
      }
      setLoading(false);
    };
    loadOrders();
  }, [user]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'delivered': return '#28a745';
      case 'shipped': return '#17a2b8';
      case 'processing': return '#ffc107';
      case 'cancelled': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const handleReorder = async (order) => {
    for (const item of order.items) {
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

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '80px' }}>Loading orders...</div>;
  }

  if (!user) {
    return (
      <div style={{ textAlign: 'center', padding: '80px' }}>
        <h2>Please login to view your orders</h2>
        <Link to="/login">
          <button style={{ marginTop: '20px', padding: '10px 20px', background: '#ff6600', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Login</button>
        </Link>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
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
      
      {orders.map(order => (
        <div key={order._id} style={{ border: '1px solid #eee', borderRadius: '8px', padding: '20px', marginBottom: '20px', background: 'white' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid #eee' }}>
            <div>
              <strong>Order #{order._id?.slice(-8) || 'N/A'}</strong>
              <p style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ background: getStatusColor(order.status), color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '12px' }}>
                {order.status?.toUpperCase() || 'PENDING'}
              </span>
              <p style={{ fontWeight: 'bold', marginTop: '5px' }}>₦{order.totalAmount?.toLocaleString() || 0}</p>
            </div>
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            {order.items?.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '10px 0', borderBottom: idx !== order.items.length - 1 ? '1px solid #f0f0f0' : 'none' }}>
                <div style={{ fontSize: '40px' }}>{item.image || '📦'}</div>
                <div style={{ flex: 1 }}>
                  <Link to={`/product/${item.product}`} style={{ color: '#333', textDecoration: 'none' }}>
                    <h4 style={{ fontSize: '14px' }}>{item.name}</h4>
                  </Link>
                  <p style={{ fontSize: '12px', color: '#666' }}>Qty: {item.quantity} × ₦{item.price?.toLocaleString() || 0}</p>
                </div>
                <div style={{ fontWeight: 'bold' }}>₦{(item.price * item.quantity)?.toLocaleString() || 0}</div>
              </div>
            ))}
          </div>
          
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', justifyContent: 'flex-end', borderTop: '1px solid #eee', paddingTop: '15px' }}>
            <Link to={`/order/${order._id}`}>
              <button style={{ padding: '8px 20px', background: '#fff', color: '#ff6600', border: '1px solid #ff6600', borderRadius: '5px', cursor: 'pointer' }}>
                View Details
              </button>
            </Link>
            <button onClick={() => handleReorder(order)} style={{ padding: '8px 20px', background: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
              Buy Again
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default OrderHistory;
