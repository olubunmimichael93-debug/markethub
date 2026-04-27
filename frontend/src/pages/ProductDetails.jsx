import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useState, useEffect } from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar, FaTruck, FaShieldAlt, FaExchangeAlt, FaWhatsapp, FaFacebook, FaTwitter, FaCheck } from 'react-icons/fa';
import axios from 'axios';

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [showNotification, setShowNotification] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const showAddedNotification = () => {
    setNotificationMessage(`${product?.name} added to cart!`);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    showAddedNotification();
  };

  const handleBuyNow = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    navigate('/checkout');
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) stars.push(<FaStar key={i} style={{ color: '#ffc107' }} />);
      else if (i - 0.5 <= rating) stars.push(<FaStarHalfAlt key={i} style={{ color: '#ffc107' }} />);
      else stars.push(<FaRegStar key={i} style={{ color: '#ffc107' }} />);
    }
    return stars;
  };

  const productImages = product?.images?.length > 0 ? product.images : [product?.image];

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '80px' }}>Loading product...</div>;
  }

  if (!product) {
    return <div style={{ textAlign: 'center', padding: '80px' }}>Product not found</div>;
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '30px auto', padding: '0 20px' }}>
      {showNotification && (
        <div style={{
          position: 'fixed', top: '80px', right: '20px', background: '#28a745', color: 'white',
          padding: '12px 20px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '10px',
          zIndex: 1000, animation: 'slideIn 0.3s ease-out'
        }}>
          <FaCheck /> <span>{notificationMessage}</span>
        </div>
      )}

      <div style={{ marginBottom: '20px', fontSize: '13px', color: '#666' }}>
        <Link to="/" style={{ color: '#666', textDecoration: 'none' }}>Home</Link> / 
        <Link to="/products" style={{ color: '#666', textDecoration: 'none', marginLeft: '5px' }}>Products</Link> / 
        <span style={{ color: '#ff6600', marginLeft: '5px' }}>{product.name}</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        {/* Left - Product Image - NO HOVER ZOOM */}
        <div>
          <div style={{ textAlign: 'center', background: '#fafafa', padding: '20px', borderRadius: '8px' }}>
            <img 
              src={productImages[selectedImage] || product.image} 
              alt={product.name}
              style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'contain' }}
            />
          </div>
          
          {/* Thumbnails */}
          {productImages.length > 1 && (
            <div style={{ display: 'flex', gap: '10px', marginTop: '15px', justifyContent: 'center' }}>
              {productImages.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`${product.name} view ${idx + 1}`}
                  onClick={() => setSelectedImage(idx)}
                  style={{
                    width: '70px',
                    height: '70px',
                    objectFit: 'cover',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    border: selectedImage === idx ? '2px solid #ff6600' : '1px solid #ddd'
                  }}
                />
              ))}
            </div>
          )}
        </div>
        
        {/* Right - Product Info */}
        <div>
          {product.discount > 0 && (
            <span style={{ background: '#ff4444', color: 'white', padding: '3px 10px', borderRadius: '3px', fontSize: '12px', display: 'inline-block', marginBottom: '10px' }}>
              -{product.discount}%
            </span>
          )}
          <h1 style={{ fontSize: '24px', marginBottom: '10px' }}>{product.name}</h1>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
            <div style={{ display: 'flex', gap: '3px' }}>{renderStars(product.rating || 4)}</div>
            <span style={{ color: '#666', fontSize: '13px' }}>({product.reviews || 0} reviews)</span>
            <span style={{ color: '#28a745', fontSize: '13px' }}>| {product.sold || 0}+ sold</span>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <span style={{ fontSize: '32px', fontWeight: 'bold', color: '#ff6600' }}>₦{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span style={{ fontSize: '18px', color: '#999', textDecoration: 'line-through', marginLeft: '10px' }}>₦{product.originalPrice.toLocaleString()}</span>
            )}
          </div>

          <div style={{ background: '#f5f5f5', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <FaTruck style={{ color: '#ff6600' }} />
              <span>Free Delivery on orders over ₦50,000</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <FaExchangeAlt style={{ color: '#ff6600' }} />
              <span>Free Returns within 7 days</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FaShieldAlt style={{ color: '#ff6600' }} />
              <span>1 Year Warranty</span>
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            {product.stock > 0 ? (
              <span style={{ color: '#28a745', fontWeight: 'bold' }}>✓ In Stock ({product.stock} available)</span>
            ) : (
              <span style={{ color: '#ff4444', fontWeight: 'bold' }}>✗ Out of Stock</span>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
            <span style={{ fontWeight: 'bold' }}>Quantity:</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#f5f5f5', borderRadius: '8px', padding: '5px' }}>
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ width: '36px', height: '36px', border: '1px solid #ddd', background: 'white', cursor: 'pointer', borderRadius: '6px' }}>−</button>
              <span style={{ minWidth: '50px', textAlign: 'center', fontSize: '18px', fontWeight: 'bold' }}>{quantity}</span>
              <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} style={{ width: '36px', height: '36px', border: '1px solid #ddd', background: 'white', cursor: 'pointer', borderRadius: '6px' }}>+</button>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
            <button onClick={handleAddToCart} style={{ flex: 1, padding: '15px', background: 'white', color: '#ff6600', border: '2px solid #ff6600', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>🛒 Add to Cart</button>
            <button onClick={handleBuyNow} style={{ flex: 1, padding: '15px', background: '#ff6600', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>Buy Now</button>
          </div>

          <div style={{ display: 'flex', gap: '15px', paddingTop: '15px', borderTop: '1px solid #eee' }}>
            <span style={{ color: '#666' }}>Share:</span>
            <FaWhatsapp style={{ color: '#25D366', cursor: 'pointer', fontSize: '20px' }} />
            <FaFacebook style={{ color: '#1877F2', cursor: 'pointer', fontSize: '20px' }} />
            <FaTwitter style={{ color: '#1DA1F2', cursor: 'pointer', fontSize: '20px' }} />
          </div>
        </div>
      </div>

      <div style={{ background: 'white', marginTop: '20px', borderRadius: '8px', overflow: 'hidden' }}>
        <div style={{ display: 'flex', borderBottom: '1px solid #ddd' }}>
          {['description', 'specifications', 'reviews'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: '15px 25px', background: activeTab === tab ? '#ff6600' : 'white', color: activeTab === tab ? 'white' : '#333', border: 'none', cursor: 'pointer', fontWeight: activeTab === tab ? 'bold' : 'normal' }}>
              {tab.toUpperCase()}
            </button>
          ))}
        </div>
        <div style={{ padding: '20px' }}>
          {activeTab === 'description' && <p>{product.description || 'No description available'}</p>}
          {activeTab === 'specifications' && (
            <table style={{ width: '100%' }}>
              <tbody>
                <tr><td style={{ padding: '10px', fontWeight: 'bold', width: '200px' }}>Brand</td><td>{product.brand || 'MarketHub'}</td></tr>
                <tr><td style={{ padding: '10px', fontWeight: 'bold' }}>Category</td><td>{product.category}</td></tr>
                <tr><td style={{ padding: '10px', fontWeight: 'bold' }}>Stock</td><td>{product.stock} units</td></tr>
                <tr><td style={{ padding: '10px', fontWeight: 'bold' }}>Warranty</td><td>1 Year</td></tr>
              </tbody>
            </table>
          )}
          {activeTab === 'reviews' && (
            <div>
              <h3>Customer Reviews</h3>
              {product.reviewList?.length > 0 ? (
                product.reviewList.map((review, idx) => (
                  <div key={idx} style={{ borderBottom: '1px solid #eee', padding: '15px 0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ display: 'flex', gap: '3px' }}>{renderStars(review.rating)}</div>
                      <strong>{review.userName}</strong>
                      <span style={{ fontSize: '12px', color: '#666' }}>{new Date(review.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p style={{ marginTop: '10px' }}>{review.comment}</p>
                  </div>
                ))
              ) : (
                <p>No reviews yet. Be the first to review!</p>
              )}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default ProductDetails;
