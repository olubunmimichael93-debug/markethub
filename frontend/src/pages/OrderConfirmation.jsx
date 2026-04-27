import { useLocation, Link } from 'react-router-dom';

function OrderConfirmation() {
  const location = useLocation();
  const order = location.state?.order;

  if (!order) {
    return (
      <div style={{ textAlign: 'center', marginTop: '80px' }}>
        <h2>No order found</h2>
        <Link to="/">Go to Home</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '60px auto', padding: '0 20px', textAlign: 'center' }}>
      <div style={{
        background: 'white',
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <div style={{ fontSize: '64px', marginBottom: '20px' }}>🎉</div>
        <h1 style={{ color: '#28a745', marginBottom: '20px' }}>Order Confirmed!</h1>
        <p style={{ fontSize: '18px', marginBottom: '10px' }}>
          Thank you for shopping at MarketHub!
        </p>
        <p style={{ color: '#666', marginBottom: '30px' }}>
          Order #{order.id} has been placed successfully.
        </p>
        
        <div style={{
          textAlign: 'left',
          background: '#f9f9f9',
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '30px'
        }}>
          <h3>Order Summary</h3>
          <p><strong>Name:</strong> {order.customer.fullName}</p>
          <p><strong>Email:</strong> {order.customer.email}</p>
          <p><strong>Phone:</strong> {order.customer.phone}</p>
          <p><strong>Address:</strong> {order.customer.address}, {order.customer.city}</p>
          <p><strong>Payment:</strong> {order.customer.paymentMethod === 'cash' ? 'Cash on Delivery' : order.customer.paymentMethod}</p>
          <hr style={{ margin: '15px 0' }} />
          <p><strong>Total Amount:</strong> ₦{order.total.toLocaleString()}</p>
        </div>
        
        <Link to="/products">
          <button style={{
            background: '#ff6600',
            color: 'white',
            border: 'none',
            padding: '12px 30px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px'
          }}>
            Continue Shopping →
          </button>
        </Link>
      </div>
    </div>
  );
}

export default OrderConfirmation;