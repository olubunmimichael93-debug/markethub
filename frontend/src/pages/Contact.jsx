import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

function Contact() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: user?.name || '', email: user?.email || '', subject: '', message: '' });
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
      <h1 style={{ marginBottom: '30px' }}>Contact Us</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
        <div style={{ background: 'white', padding: '30px', borderRadius: '12px' }}>
          <h2 style={{ marginBottom: '20px' }}>Send us a message</h2>
          {submitted && (
            <div style={{ background: '#28a745', color: 'white', padding: '10px', borderRadius: '5px', marginBottom: '20px' }}>
              Thank you! We'll get back to you soon.
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required style={{ width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '5px' }} />
            <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required style={{ width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '5px' }} />
            <input type="text" name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} required style={{ width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '5px' }} />
            <textarea name="message" placeholder="Your Message" rows="5" value={formData.message} onChange={handleChange} required style={{ width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '5px' }} />
            <button type="submit" style={{ width: '100%', padding: '12px', background: '#ff6600', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>Send Message</button>
          </form>
        </div>
        
        <div style={{ background: 'white', padding: '30px', borderRadius: '12px' }}>
          <h2 style={{ marginBottom: '20px' }}>Contact Information</h2>
          <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FaEnvelope style={{ color: '#ff6600' }} />
            <span>help@markethub.com</span>
          </div>
          <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FaPhone style={{ color: '#ff6600' }} />
            <span>0800 000 0000</span>
          </div>
          <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FaMapMarkerAlt style={{ color: '#ff6600' }} />
            <span>Lagos, Nigeria</span>
          </div>
          <div style={{ marginTop: '30px', padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
            <h3>Business Hours</h3>
            <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
            <p>Saturday: 10:00 AM - 4:00 PM</p>
            <p>Sunday: Closed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
