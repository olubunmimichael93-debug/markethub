import { Link } from 'react-router-dom';

function HelpCenter() {
  const topics = [
    { title: 'Getting Started', icon: '🚀', link: '/getting-started' },
    { title: 'Orders & Shipping', icon: '📦', link: '/orders' },
    { title: 'Payments', icon: '💳', link: '/payment-info' },
    { title: 'Returns & Refunds', icon: '🔄', link: '/returns' },
    { title: 'Account Help', icon: '👤', link: '/account' },
    { title: 'FAQs', icon: '❓', link: '/faq' }
  ];

  return (
    <div style={{ maxWidth: '1200px', margin: '60px auto', padding: '0 20px' }}>
      <h1 style={{ marginBottom: '10px' }}>Help Center</h1>
      <p style={{ color: '#666', marginBottom: '40px' }}>How can we help you today?</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        {topics.map((topic, index) => (
          <Link key={index} to={topic.link} style={{ textDecoration: 'none' }}>
            <div style={{ background: 'white', padding: '30px', borderRadius: '12px', textAlign: 'center', transition: 'transform 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <div style={{ fontSize: '48px', marginBottom: '10px' }}>{topic.icon}</div>
              <h3>{topic.title}</h3>
            </div>
          </Link>
        ))}
      </div>
      
      <div style={{ marginTop: '60px', padding: '40px', background: '#f5f5f5', borderRadius: '12px', textAlign: 'center' }}>
        <h2>Still need help?</h2>
        <p style={{ marginTop: '10px', marginBottom: '20px' }}>Contact our customer support team</p>
        <Link to="/contact">
          <button style={{ padding: '12px 30px', background: '#ff6600', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Contact Us</button>
        </Link>
      </div>
    </div>
  );
}

export default HelpCenter;
