import { useState } from 'react';

function PaystackPayment({ email, amount, onSuccess, onClose, customerName }) {
  const [loading, setLoading] = useState(false);

  const payWithPaystack = () => {
    setLoading(true);
    
    const handler = window.PaystackPop.setup({
      key: 'pk_test_90f9901e9006cecabd3896064196cce720096364',
      email: email,
      amount: amount * 100,
      currency: 'NGN',
      ref: 'ORDER_' + Math.floor((Math.random() * 1000000000) + 1),
      metadata: {
        custom_fields: [
          {
            display_name: "Customer Name",
            variable_name: "customer_name",
            value: customerName
          }
        ]
      },
      callback: (response) => {
        setLoading(false);
        onSuccess(response);
      },
      onClose: () => {
        setLoading(false);
        onClose();
      }
    });
    
    handler.openIframe();
  };

  return (
    <button
      onClick={payWithPaystack}
      disabled={loading}
      style={{ width: '100%', padding: '15px', background: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
    >
      {loading ? 'Redirecting to Paystack...' : 'Pay with Card'}
    </button>
  );
}

export default PaystackPayment;
