import { Link } from 'react-router-dom';

function Shipping() {
  return (
    <div style={{ maxWidth: '800px', margin: '60px auto', padding: '0 20px' }}>
      <h1 style={{ marginBottom: '20px' }}>Shipping Information</h1>
      
      <div style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <h3 style={{ marginBottom: '15px', color: '#ff6600' }}>Delivery Time</h3>
        <ul style={{ marginBottom: '20px', marginLeft: '20px', lineHeight: '1.8' }}>
          <li><strong>Lagos:</strong> 3-5 business days</li>
          <li><strong>Other cities:</strong> 5-7 business days</li>
          <li><strong>Remote areas:</strong> 7-10 business days</li>
        </ul>
        
        <h3 style={{ marginBottom: '15px', color: '#ff6600' }}>Shipping Cost</h3>
        <ul style={{ marginBottom: '20px', marginLeft: '20px', lineHeight: '1.8' }}>
          <li><strong>Free shipping</strong> on orders over ₦50,000</li>
          <li><strong>Standard delivery:</strong> ₦5,000</li>
          <li><strong>Express delivery:</strong> ₦7,500 (Lagos only)</li>
        </ul>
        
        <h3 style={{ marginBottom: '15px', color: '#ff6600' }}>Order Tracking</h3>
        <p style={{ marginBottom: '20px', lineHeight: '1.6' }}>
          Once your order is shipped, you will receive a tracking link via email and SMS.
          You can also track your order from your <Link to="/orders" style={{ color: '#ff6600' }}>My Orders</Link> page.
        </p>
        
        <h3 style={{ marginBottom: '15px', color: '#ff6600' }}>International Shipping</h3>
        <p style={{ marginBottom: '20px', lineHeight: '1.6' }}>
          Currently, we only ship within Nigeria. International shipping will be available soon.
        </p>
        
        <div style={{ marginTop: '30px', padding: '20px', background: '#f5f5f5', borderRadius: '8px', textAlign: 'center' }}>
          <p>Questions about your order?</p>
          <Link to="/contact">
            <button style={{ marginTop: '10px', padding: '10px 20px', background: '#ff6600', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
              Contact Support
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Shipping;
