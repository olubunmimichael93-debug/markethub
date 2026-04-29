function ProductSkeleton() {
  return (
    <div style={{ 
      background: '#fff', 
      borderRadius: '12px', 
      overflow: 'hidden', 
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
      animation: 'pulse 1.5s ease-in-out infinite'
    }}>
      <div style={{ padding: '20px', textAlign: 'center', background: '#f5f5f5', height: '200px' }}></div>
      <div style={{ padding: '15px' }}>
        <div style={{ height: '16px', background: '#f0f0f0', marginBottom: '10px', borderRadius: '4px', width: '80%' }}></div>
        <div style={{ height: '12px', background: '#f0f0f0', marginBottom: '8px', borderRadius: '4px', width: '60%' }}></div>
        <div style={{ height: '20px', background: '#f0f0f0', borderRadius: '4px', width: '40%' }}></div>
      </div>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}

export default ProductSkeleton;
