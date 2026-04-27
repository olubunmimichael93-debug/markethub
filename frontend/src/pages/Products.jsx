import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaStar, FaStarHalfAlt, FaRegStar, FaHeart, FaRegHeart, FaCheck } from 'react-icons/fa';
import axios from 'axios';

function Products() {
  const { addToCart } = useCart();
  const { user, addToWishlist, removeFromWishlist, checkInWishlist } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [wishlistStatus, setWishlistStatus] = useState({});
  const [quantities, setQuantities] = useState({});
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
        setLoading(false);
        const initialQtys = {};
        response.data.forEach(product => {
          initialQtys[product._id] = 1;
        });
        setQuantities(initialQtys);
      } catch (error) {
        console.error('Error:', error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (user && products.length > 0) {
      const checkAllWishlist = async () => {
        const status = {};
        for (const product of products) {
          const result = await checkInWishlist(product._id);
          if (result.success) {
            status[product._id] = result.inWishlist;
          }
        }
        setWishlistStatus(status);
      };
      checkAllWishlist();
    }
  }, [products, user]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    if (categoryParam) setSelectedCategory(categoryParam);
  }, [location]);

  const showAddedNotification = (productName) => {
    setNotificationMessage(`${productName} added to cart!`);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  const handleAddToCart = (product) => {
    const quantity = quantities[product._id] || 1;
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    showAddedNotification(product.name);
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setQuantities(prev => ({ ...prev, [productId]: newQuantity }));
  };

  const categories = ['all', 'Phones', 'Computers', 'Electronics', 'Fashion', 'Home'];

  let filteredProducts = products.filter(product => {
    const matchCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  if (sortBy === 'price-low') filteredProducts.sort((a, b) => a.price - b.price);
  else if (sortBy === 'price-high') filteredProducts.sort((a, b) => b.price - a.price);
  else if (sortBy === 'rating') filteredProducts.sort((a, b) => b.rating - a.rating);
  else if (sortBy === 'discount') filteredProducts.sort((a, b) => b.discount - a.discount);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) stars.push(<FaStar key={i} style={{ color: '#ffc107', fontSize: '12px' }} />);
      else if (i - 0.5 <= rating) stars.push(<FaStarHalfAlt key={i} style={{ color: '#ffc107', fontSize: '12px' }} />);
      else stars.push(<FaRegStar key={i} style={{ color: '#ffc107', fontSize: '12px' }} />);
    }
    return stars;
  };

  const handleWishlistClick = async (productId, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      navigate('/login');
      return;
    }
    if (wishlistStatus[productId]) {
      const result = await removeFromWishlist(productId);
      if (result.success) setWishlistStatus(prev => ({ ...prev, [productId]: false }));
    } else {
      const result = await addToWishlist(productId);
      if (result.success) setWishlistStatus(prev => ({ ...prev, [productId]: true }));
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '80px' }}>Loading products...</div>;
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

      <h1 style={{ fontSize: '24px', marginBottom: '10px' }}>{selectedCategory === 'all' ? 'All Products' : selectedCategory}</h1>
      <p style={{ marginBottom: '20px', color: '#666' }}>{filteredProducts.length} products found</p>

      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '30px' }}>
        <input type="text" placeholder="Search products..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ flex: 1, padding: '12px', border: '1px solid #ddd', borderRadius: '5px', maxWidth: '300px' }} />
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '5px' }}>
          <option value="default">Sort by: Recommended</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Top Rated</option>
          <option value="discount">Biggest Discount</option>
        </select>
      </div>

      <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', marginBottom: '30px' }}>
        {categories.map(cat => (
          <button key={cat} onClick={() => setSelectedCategory(cat)} style={{ padding: '8px 20px', background: selectedCategory === cat ? '#ff6600' : '#f0f0f0', color: selectedCategory === cat ? 'white' : '#333', border: 'none', borderRadius: '20px', cursor: 'pointer' }}>
            {cat === 'all' ? 'All Products' : cat}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '25px' }}>
        {filteredProducts.map(product => (
          <div key={product._id} style={{ background: 'white', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', position: 'relative' }}>
            {product.discount > 0 && (
              <div style={{ position: 'absolute', top: '10px', left: '10px', background: '#ff4444', color: 'white', padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold', zIndex: 1 }}>-{product.discount}%</div>
            )}
            
            <button onClick={(e) => handleWishlistClick(product._id, e)} style={{ position: 'absolute', top: '10px', right: '10px', background: 'white', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 1, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              {wishlistStatus[product._id] ? <FaHeart style={{ color: '#ff4444' }} /> : <FaRegHeart style={{ color: '#666' }} />}
            </button>

            <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
              <div style={{ padding: '20px', textAlign: 'center', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5' }}>
                <img 
                  src={product.image} 
                  alt={product.name} 
                  style={{ maxWidth: '100%', maxHeight: '150px', objectFit: 'contain' }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://placehold.co/300x300/ff6600/white?text=' + encodeURIComponent(product.name);
                  }}
                />
              </div>
              <div style={{ padding: '15px' }}>
                <h3 style={{ fontSize: '15px', marginBottom: '5px', color: '#333', fontWeight: 'bold' }}>{product.name}</h3>
                <p style={{ color: '#666', fontSize: '12px', marginBottom: '5px' }}>{product.brand || 'MarketHub'}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '3px', marginBottom: '5px' }}>
                  {renderStars(product.rating || 4)}
                  <span style={{ fontSize: '10px', color: '#666' }}>({product.reviews || 0})</span>
                </div>
                <div>
                  <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#ff6600' }}>₦{product.price.toLocaleString()}</span>
                  {product.originalPrice && <span style={{ fontSize: '12px', color: '#999', textDecoration: 'line-through', marginLeft: '8px' }}>₦{product.originalPrice.toLocaleString()}</span>}
                </div>
                <p style={{ fontSize: '11px', color: '#28a745', marginTop: '5px' }}>{product.sold || 0}+ sold</p>
              </div>
            </Link>
            
            <div style={{ padding: '12px 15px 15px', borderTop: '1px solid #f0f0f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ fontSize: '12px', color: '#666' }}>Qty:</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#f5f5f5', borderRadius: '5px', padding: '3px' }}>
                  <button onClick={() => updateQuantity(product._id, (quantities[product._id] || 1) - 1)} style={{ width: '28px', height: '28px', border: '1px solid #ddd', background: 'white', cursor: 'pointer', borderRadius: '4px', fontWeight: 'bold' }}>−</button>
                  <span style={{ minWidth: '30px', textAlign: 'center', fontSize: '14px', fontWeight: 'bold' }}>{quantities[product._id] || 1}</span>
                  <button onClick={() => updateQuantity(product._id, (quantities[product._id] || 1) + 1)} style={{ width: '28px', height: '28px', border: '1px solid #ddd', background: 'white', cursor: 'pointer', borderRadius: '4px', fontWeight: 'bold' }}>+</button>
                </div>
              </div>
              <button onClick={() => handleAddToCart(product)} style={{ width: '100%', background: '#ff6600', color: 'white', border: 'none', padding: '10px', cursor: 'pointer', borderRadius: '5px', fontWeight: 'bold', fontSize: '14px' }}>
                Add to Cart • ₦{(product.price * (quantities[product._id] || 1)).toLocaleString()}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && <div style={{ textAlign: 'center', padding: '50px' }}>No products found</div>}

      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default Products;
