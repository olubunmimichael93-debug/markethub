import { Link } from 'react-router-dom';

function Returns() {
  return (
    <div style={{ maxWidth: '800px', margin: '60px auto', padding: '0 20px' }}>
      <h1 style={{ marginBottom: '20px' }}>Returns & Refunds Policy</h1>
      
      <div style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <h3 style={{ marginBottom: '15px', color: '#ff6600' }}>Return Policy</h3>
        <p style={{ marginBottom: '20px', lineHeight: '1.6' }}>
          We accept returns within 14 days of delivery for unworn items in original condition with all tags attached.
        </p>
        
        <h3 style={{ marginBottom: '15px', color: '#ff6600' }}>How to Return</h3>
        <ol style={{ marginBottom: '20px', marginLeft: '20px', lineHeight: '1.8' }}>
          <li>Contact our customer support team</li>
          <li>Pack the item securely in original packaging</li>
          <li>Ship back using our return label</li>
          <li>Once received, we'll process your refund</li>
        </ol>
        
        <h3 style={{ marginBottom: '15px', color: '#ff6600' }}>Refund Process</h3>
        <p style={{ marginBottom: '20px', lineHeight: '1.6' }}>
          Refunds are processed within 5-7 business days after we receive and inspect the returned item.
          The refund will be credited to your original payment method.
        </p>
        
        <h3 style={{ marginBottom: '15px', color: '#ff6600' }}>Non-Returnable Items</h3>
        <ul style={{ marginBottom: '20px', marginLeft: '20px', lineHeight: '1.8' }}>
          <li>Personalized or custom items</li>
          <li>Perishable goods</li>
          <li>Items marked "Final Sale"</li>
          <li>Gift cards</li>
        </ul>
        
        <div style={{ marginTop: '30px', padding: '20px', background: '#f5f5f5', borderRadius: '8px', textAlign: 'center' }}>
          <p>Need help with a return?</p>
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

export default Returns;
