import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaCheckCircle, FaTruck, FaBox, FaMapMarkerAlt, FaClock, FaHourglassHalf } from 'react-icons/fa';

function OrderTracking() {
  const { id } = useParams();
  const { getOrderDetails } = useAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      const result = await getOrderDetails(id);
      if (result.success) {
        setOrder(result.order);
      }
      setLoading(false);
    };
    fetchOrder();
  }, [id]);

  const getStatusStep = (status) => {
    const steps = ['pending', 'processing', 'shipped', 'delivered'];
    return steps.indexOf(status);
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'pending': return <FaClock />;
      case 'processing': return <FaHourglassHalf />;
      case 'shipped': return <FaTruck />;
      case 'delivered': return <FaCheckCircle />;
      default: return <FaBox />;
    }
  };

  const currentStep = order ? getStatusStep(order.status) : 0;

  const trackingSteps = [
    { status: 'Order Placed', icon: <FaBox />, completed: currentStep >= 0, date: order?.createdAt },
    { status: 'Processing', icon: <FaHourglassHalf />, completed: currentStep >= 1 },
    { status: 'Shipped', icon: <FaTruck />, completed: currentStep >= 2 },
    { status: 'Delivered', icon: <FaCheckCircle />, completed: currentStep >= 3 }
  ];

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '80px' }}>Loading order...</div>;
  }

  if (!order) {
    return <div style={{ textAlign: 'center', padding: '80px' }}>Order not found</div>;
  }

  const estimatedDelivery = new Date(order.createdAt);
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 5);

  return (
    <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '0 20px' }}>
      <Link to="/orders" style={{ color: '#ff6600', textDecoration: 'none' }}>← Back to Orders</Link>
      
      <h1 style={{ margin: '20px 0 10px' }}>Track Order #{order._id.slice(-8)}</h1>
      <p style={{ color: '#666', marginBottom: '30px' }}>Placed on {new Date(order.createdAt).toLocaleDateString()}</p>

      {/* Status Badge */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <span style={{ 
          background: order.status === 'delivered' ? '#28a745' : order.status === 'shipped' ? '#17a2b8' : order.status === 'processing' ? '#ffc107' : '#6c757d', 
          color: 'white', 
          padding: '8px 25px', 
          borderRadius: '25px', 
          fontSize: '14px',
          fontWeight: 'bold'
        }}>
          {getStatusIcon(order.status)} {order.status?.toUpperCase() || 'PENDING'}
        </span>
      </div>

      {/* Progress Tracker */}
      <div style={{ background: 'white', padding: '30px', borderRadius: '12px', marginBottom: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
          {trackingSteps.map((step, idx) => (
            <div key={idx} style={{ textAlign: 'center', flex: 1 }}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                background: step.completed ? '#ff6600' : '#e0e0e0',
                color: step.completed ? 'white' : '#999',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 10px',
                fontSize: '24px'
              }}>
                {step.icon}
              </div>
              <div style={{ fontWeight: 'bold', fontSize: '14px', color: step.completed ? '#ff6600' : '#666' }}>{step.status}</div>
              {idx === 0 && step.date && (
                <div style={{ fontSize: '11px', color: '#999', marginTop: '5px' }}>
                  {new Date(step.date).toLocaleDateString()}
                </div>
              )}
              {idx === 3 && (
                <div style={{ fontSize: '11px', color: '#ff6600', marginTop: '5px' }}>
                  Est: {estimatedDelivery.toLocaleDateString()}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Order Details */}
      <div style={{ background: 'white', padding: '20px', borderRadius: '12px', marginBottom: '20px' }}>
        <h3>Order Items</h3>
        {order.items.map((item, idx) => (
          <div key={idx} style={{ display: 'flex', gap: '15px', padding: '15px 0', borderBottom: '1px solid #eee' }}>
            <div style={{ fontSize: '40px' }}>{item.image || '📦'}</div>
            <div style={{ flex: 1 }}>
              <h4>{item.name}</h4>
              <p>Quantity: {item.quantity}</p>
              <p style={{ color: '#ff6600', fontWeight: 'bold' }}>₦{item.price.toLocaleString()}</p>
            </div>
          </div>
        ))}
        <div style={{ marginTop: '15px', textAlign: 'right', fontWeight: 'bold' }}>
          Total: ₦{order.totalAmount.toLocaleString()}
        </div>
      </div>

      {/* Delivery Address */}
      <div style={{ background: 'white', padding: '20px', borderRadius: '12px' }}>
        <h3><FaMapMarkerAlt /> Delivery Address</h3>
        <p style={{ marginTop: '10px' }}>
          {order.shippingAddress?.fullName}<br />
          {order.shippingAddress?.address}<br />
          {order.shippingAddress?.city}<br />
          Phone: {order.shippingAddress?.phone}
        </p>
      </div>

      {/* Help Section */}
      <div style={{ background: '#f5f5f5', padding: '15px', borderRadius: '12px', marginTop: '20px', textAlign: 'center' }}>
        <p style={{ fontSize: '13px', color: '#666' }}>Need help with your order?</p>
        <Link to="/contact" style={{ color: '#ff6600', textDecoration: 'none', fontSize: '13px' }}>Contact Customer Support →</Link>
      </div>
    </div>
  );
}

export default OrderTracking;
