import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    { q: 'How do I place an order?', a: 'Simply browse our products, add items to your cart, and proceed to checkout. Follow the prompts to complete your order.' },
    { q: 'What payment methods do you accept?', a: 'We accept Cash on Delivery and Card payments via Paystack.' },
    { q: 'How long does delivery take?', a: 'Delivery typically takes 3-5 business days within Lagos, and 5-7 business days for other cities.' },
    { q: 'Do you offer free shipping?', a: 'Yes, we offer free shipping on all orders over ₦50,000.' },
    { q: 'What is your return policy?', a: 'We accept returns within 14 days of delivery for unworn items in original condition.' },
    { q: 'How can I track my order?', a: 'Once your order is shipped, you will receive a tracking link via email.' }
  ];

  return (
    <div style={{ maxWidth: '800px', margin: '60px auto', padding: '0 20px' }}>
      <h1 style={{ marginBottom: '30px' }}>Frequently Asked Questions</h1>
      
      {faqs.map((faq, index) => (
        <div key={index} style={{ marginBottom: '15px', border: '1px solid #eee', borderRadius: '8px', overflow: 'hidden' }}>
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            style={{
              width: '100%',
              padding: '15px 20px',
              background: 'white',
              border: 'none',
              textAlign: 'left',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontWeight: 'bold'
            }}
          >
            {faq.q}
            {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          {openIndex === index && (
            <div style={{ padding: '15px 20px', background: '#f9f9f9', borderTop: '1px solid #eee' }}>
              {faq.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default FAQ;
