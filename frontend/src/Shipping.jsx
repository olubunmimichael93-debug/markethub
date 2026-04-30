function Shipping() {
  return (
    <div style={{ maxWidth: '800px', margin: '60px auto', padding: '0 20px' }}>
      <h1>Shipping Information</h1>
      <div style={{ marginTop: '30px' }}>
        <h3>Delivery Time</h3>
        <p>Lagos: 3-5 business days</p>
        <p>Other cities: 5-7 business days</p>
        
        <h3 style={{ marginTop: '20px' }}>Shipping Cost</h3>
        <p>Free shipping on orders over ₦50,000</p>
        <p>Standard delivery: ₦5,000</p>
        
        <h3 style={{ marginTop: '20px' }}>Order Tracking</h3>
        <p>You will receive a tracking link via email once your order is shipped.</p>
      </div>
    </div>
  );
}

export default Shipping;
