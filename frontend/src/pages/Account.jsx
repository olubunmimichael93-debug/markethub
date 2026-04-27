import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaHeart, FaMapMarkerAlt, FaCreditCard, FaSignOutAlt, FaShoppingBag, FaCog, FaBell, FaStore, FaArrowLeft, FaEdit, FaSave, FaTimes, FaPlus, FaTrash, FaCheckCircle, FaEnvelope, FaMobileAlt, FaTag, FaPercent, FaEye, FaEyeSlash } from 'react-icons/fa';

function Account() {
  const { user, token, logout, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [emailPreferences, setEmailPreferences] = useState({
    promotions: true,
    orders: true,
    newsletter: false
  });

  const [newAddress, setNewAddress] = useState({
    name: '',
    address: '',
    city: '',
    phone: '',
    isDefault: false
  });

  const [addresses, setAddresses] = useState([
    { id: 1, name: 'Home', address: '123 Main Street, Ikeja, Lagos, Nigeria', city: 'Lagos', phone: '07040564333', default: true },
    { id: 2, name: 'Office', address: '456 Business District, Victoria Island, Lagos', city: 'Lagos', phone: '07040564333', default: false },
  ]);

  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Order Delivered', message: 'Your order #12345 has been delivered', date: '2025-04-20', read: false, type: 'order' },
    { id: 2, title: 'Flash Sale Alert', message: '50% off on selected items! Hurry up!', date: '2025-04-19', read: false, type: 'promo' },
    { id: 3, title: 'Welcome to MarketHub', message: 'Thanks for joining! Enjoy 10% off your first order', date: '2025-04-18', read: true, type: 'welcome' },
  ]);

  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, type: 'card', last4: '4242', brand: 'Visa', expiry: '12/25', default: true },
    { id: 2, type: 'card', last4: '5555', brand: 'Mastercard', expiry: '08/26', default: false },
  ]);

  const [newPayment, setNewPayment] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
    default: false
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || ''
      });
    }
  }, [user]);

  const [orders, setOrders] = useState([
    { id: 12345, date: '2025-04-20', total: 935000, status: 'Delivered', items: 3 },
    { id: 12346, date: '2025-04-18', total: 85000, status: 'Processing', items: 1 },
    { id: 12347, date: '2025-04-15', total: 2500000, status: 'Shipped', items: 1 },
  ]);

  const [wishlist, setWishlist] = useState([
    { id: 1, name: 'iPhone 14 Pro', price: 850000, image: '📱' },
    { id: 2, name: 'Sony Headphones', price: 120000, image: '🎧' },
  ]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  const handleAddressChange = (e) => {
    setNewAddress({
      ...newAddress,
      [e.target.name]: e.target.value
    });
  };

  const handlePaymentChange = (e) => {
    setNewPayment({
      ...newPayment,
      [e.target.name]: e.target.value
    });
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    setMessage('');
    
    const result = await updateProfile(formData);
    
    if (result.success) {
      setMessage('Profile updated successfully!');
      setIsEditing(false);
    } else {
      setMessage(result.error || 'Error updating profile');
    }
    
    setLoading(false);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleUpdatePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage('New passwords do not match');
      setTimeout(() => setMessage(''), 3000);
      return;
    }
    if (passwordData.newPassword.length < 6) {
      setMessage('Password must be at least 6 characters');
      setTimeout(() => setMessage(''), 3000);
      return;
    }
    setMessage('Password updated successfully!');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setShowPasswordForm(false);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleSavePreferences = () => {
    setMessage('Email preferences saved!');
    setTimeout(() => setMessage(''), 3000);
  };

  const addNewAddress = () => {
    if (!newAddress.name || !newAddress.address || !newAddress.city) {
      setMessage('Please fill all required fields');
      setTimeout(() => setMessage(''), 3000);
      return;
    }
    
    const newId = addresses.length + 1;
    const addressToAdd = {
      id: newId,
      ...newAddress,
      default: addresses.length === 0 ? true : newAddress.default
    };
    
    setAddresses([...addresses, addressToAdd]);
    setNewAddress({ name: '', address: '', city: '', phone: '', isDefault: false });
    setShowAddressForm(false);
    setMessage('Address added successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  const deleteAddress = (id) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
    setMessage('Address deleted successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  const setDefaultAddress = (id) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      default: addr.id === id
    })));
    setMessage('Default address updated!');
    setTimeout(() => setMessage(''), 3000);
  };

  const addPaymentMethod = () => {
    if (!newPayment.cardNumber || !newPayment.cardName || !newPayment.expiry || !newPayment.cvv) {
      setMessage('Please fill all payment fields');
      setTimeout(() => setMessage(''), 3000);
      return;
    }
    
    const newId = paymentMethods.length + 1;
    const paymentToAdd = {
      id: newId,
      type: 'card',
      last4: newPayment.cardNumber.slice(-4),
      brand: newPayment.cardNumber.startsWith('4') ? 'Visa' : 'Mastercard',
      expiry: newPayment.expiry,
      default: paymentMethods.length === 0 ? true : newPayment.default
    };
    
    setPaymentMethods([...paymentMethods, paymentToAdd]);
    setNewPayment({ cardNumber: '', cardName: '', expiry: '', cvv: '', default: false });
    setShowPaymentForm(false);
    setMessage('Payment method added successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  const deletePayment = (id) => {
    setPaymentMethods(paymentMethods.filter(pm => pm.id !== id));
    setMessage('Payment method deleted!');
    setTimeout(() => setMessage(''), 3000);
  };

  const setDefaultPayment = (id) => {
    setPaymentMethods(paymentMethods.map(pm => ({
      ...pm,
      default: pm.id === id
    })));
    setMessage('Default payment method updated!');
    setTimeout(() => setMessage(''), 3000);
  };

  const markNotificationAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
    setMessage('All notifications marked as read!');
    setTimeout(() => setMessage(''), 3000);
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
    setMessage('Notification deleted!');
    setTimeout(() => setMessage(''), 3000);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Delivered': return '#28a745';
      case 'Processing': return '#ffc107';
      case 'Shipped': return '#17a2b8';
      default: return '#666';
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '30px auto', padding: '0 20px' }}>
      {/* Navigation */}
      <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '15px', flexWrap: 'wrap' }}>
        <button onClick={() => navigate('/products')} style={{ display: 'flex', alignItems: 'center', gap: '5px', background: '#28a745', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer' }}>
          <FaStore /> Continue Shopping
        </button>
        <button onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', gap: '5px', background: '#666', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer' }}>
          <FaArrowLeft /> Go Back
        </button>
      </div>

      <h1 style={{ marginBottom: '30px' }}>My Account</h1>
      
      {message && (
        <div style={{ 
          background: message.includes('success') || message.includes('added') || message.includes('updated') ? '#28a745' : '#ff4444', 
          color: 'white', 
          padding: '10px', 
          borderRadius: '5px', 
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          {message}
        </div>
      )}
      
      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '30px' }}>
        {/* Sidebar */}
        <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', height: 'fit-content', position: 'sticky', top: '100px' }}>
          <div style={{ textAlign: 'center', padding: '30px 20px', borderBottom: '1px solid #eee' }}>
            <div style={{ fontSize: '60px' }}>👨</div>
            <h3 style={{ marginTop: '10px' }}>{user.name}</h3>
            <p style={{ color: '#666', fontSize: '13px' }}>{user.email}</p>
          </div>
          
          <div style={{ padding: '10px 0' }}>
            {[
              { id: 'profile', icon: <FaUser />, label: 'Profile Information' },
              { id: 'orders', icon: <FaShoppingBag />, label: 'My Orders' },
              { id: 'wishlist', icon: <FaHeart />, label: 'Wishlist' },
              { id: 'addresses', icon: <FaMapMarkerAlt />, label: 'Saved Addresses' },
              { id: 'payments', icon: <FaCreditCard />, label: 'Payment Methods' },
              { id: 'notifications', icon: <FaBell />, label: `Notifications ${unreadCount > 0 ? `(${unreadCount})` : ''}` },
              { id: 'settings', icon: <FaCog />, label: 'Account Settings' },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  width: '100%',
                  padding: '15px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  background: activeTab === item.id ? '#fff5f0' : 'transparent',
                  border: 'none',
                  borderLeft: activeTab === item.id ? '3px solid #ff6600' : '3px solid transparent',
                  color: activeTab === item.id ? '#ff6600' : '#333',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontSize: '14px'
                }}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
            <hr style={{ margin: '10px 0' }} />
            <button onClick={handleLogout} style={{ width: '100%', padding: '15px 20px', display: 'flex', alignItems: 'center', gap: '12px', background: 'transparent', border: 'none', color: '#ff4444', cursor: 'pointer' }}>
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ background: 'white', borderRadius: '8px', padding: '30px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2>Profile Information</h2>
                {!isEditing ? (
                  <button onClick={() => setIsEditing(true)} style={{ display: 'flex', alignItems: 'center', gap: '5px', background: '#ff6600', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer' }}>
                    <FaEdit /> Edit Profile
                  </button>
                ) : (
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={handleSaveProfile} disabled={loading} style={{ display: 'flex', alignItems: 'center', gap: '5px', background: '#28a745', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer' }}>
                      <FaSave /> {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button onClick={() => { setIsEditing(false); setFormData({ name: user.name, email: user.email, phone: user.phone || '' }); }} style={{ display: 'flex', alignItems: 'center', gap: '5px', background: '#666', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer' }}>
                      <FaTimes /> Cancel
                    </button>
                  </div>
                )}
              </div>
              
              <div style={{ display: 'grid', gap: '20px', maxWidth: '500px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Full Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} disabled={!isEditing} style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '5px', background: isEditing ? 'white' : '#f5f5f5' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Email Address</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} disabled={!isEditing} style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '5px', background: isEditing ? 'white' : '#f5f5f5' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Phone Number</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} disabled={!isEditing} style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '5px', background: isEditing ? 'white' : '#f5f5f5' }} />
                </div>
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div>
              <h2 style={{ marginBottom: '20px' }}>My Orders</h2>
              {orders.map(order => (
                <div key={order.id} style={{ border: '1px solid #eee', borderRadius: '8px', padding: '20px', marginBottom: '15px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', marginBottom: '10px' }}>
                    <div><strong>Order #{order.id}</strong></div>
                    <div>{order.date}</div>
                    <div style={{ color: getStatusColor(order.status) }}>{order.status}</div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                    <div>{order.items} items</div>
                    <div><strong>₦{order.total.toLocaleString()}</strong></div>
                    <Link to={`/order/${order.id}`} style={{ color: '#ff6600', textDecoration: 'none' }}>View Details →</Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Wishlist Tab */}
          {activeTab === 'wishlist' && (
            <div>
              <h2 style={{ marginBottom: '20px' }}>My Wishlist ({wishlist.length})</h2>
              <div style={{ display: 'grid', gap: '15px' }}>
                {wishlist.map(item => (
                  <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '20px', border: '1px solid #eee', padding: '15px', borderRadius: '8px' }}>
                    <div style={{ fontSize: '40px' }}>{item.image}</div>
                    <div style={{ flex: 1 }}>
                      <h4>{item.name}</h4>
                      <p style={{ color: '#ff6600', fontWeight: 'bold' }}>₦{item.price.toLocaleString()}</p>
                    </div>
                    <Link to={`/product/${item.id}`}>
                      <button style={{ padding: '8px 20px', background: '#ff6600', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>View Product</button>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Addresses Tab - WORKING */}
          {activeTab === 'addresses' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2>Saved Addresses</h2>
                <button onClick={() => setShowAddressForm(!showAddressForm)} style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '8px 20px', background: '#ff6600', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                  <FaPlus /> Add New Address
                </button>
              </div>

              {showAddressForm && (
                <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
                  <h3 style={{ marginBottom: '15px' }}>New Address</h3>
                  <div style={{ display: 'grid', gap: '10px' }}>
                    <input type="text" name="name" placeholder="Address Name (e.g., Home, Office)" value={newAddress.name} onChange={handleAddressChange} style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }} />
                    <input type="text" name="address" placeholder="Street Address" value={newAddress.address} onChange={handleAddressChange} style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }} />
                    <input type="text" name="city" placeholder="City" value={newAddress.city} onChange={handleAddressChange} style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }} />
                    <input type="tel" name="phone" placeholder="Phone Number" value={newAddress.phone} onChange={handleAddressChange} style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }} />
                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <input type="checkbox" name="isDefault" checked={newAddress.isDefault} onChange={(e) => setNewAddress({ ...newAddress, isDefault: e.target.checked })} />
                      Set as default address
                    </label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button onClick={addNewAddress} style={{ padding: '10px 20px', background: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Save Address</button>
                      <button onClick={() => setShowAddressForm(false)} style={{ padding: '10px 20px', background: '#666', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Cancel</button>
                    </div>
                  </div>
                </div>
              )}

              <div style={{ display: 'grid', gap: '15px' }}>
                {addresses.map(addr => (
                  <div key={addr.id} style={{ border: addr.default ? '2px solid #ff6600' : '1px solid #eee', padding: '15px', borderRadius: '8px', position: 'relative' }}>
                    {addr.default && <span style={{ position: 'absolute', top: '-10px', left: '10px', background: '#ff6600', color: 'white', padding: '2px 10px', borderRadius: '20px', fontSize: '10px' }}>Default</span>}
                    <h4>{addr.name}</h4>
                    <p style={{ color: '#666', marginTop: '5px' }}>{addr.address}</p>
                    <p style={{ color: '#666', fontSize: '12px' }}>{addr.city}</p>
                    <p style={{ color: '#666', fontSize: '12px' }}>📞 {addr.phone}</p>
                    <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
                      {!addr.default && <button onClick={() => setDefaultAddress(addr.id)} style={{ background: 'none', border: 'none', color: '#ff6600', cursor: 'pointer' }}>Set as Default</button>}
                      <button onClick={() => deleteAddress(addr.id)} style={{ background: 'none', border: 'none', color: '#ff4444', cursor: 'pointer' }}><FaTrash /> Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Payment Methods Tab - WORKING */}
          {activeTab === 'payments' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2>Payment Methods</h2>
                <button onClick={() => setShowPaymentForm(!showPaymentForm)} style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '8px 20px', background: '#ff6600', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                  <FaPlus /> Add Payment Method
                </button>
              </div>

              {showPaymentForm && (
                <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
                  <h3 style={{ marginBottom: '15px' }}>New Payment Method</h3>
                  <div style={{ display: 'grid', gap: '10px' }}>
                    <input type="text" name="cardNumber" placeholder="Card Number" value={newPayment.cardNumber} onChange={handlePaymentChange} maxLength="16" style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }} />
                    <input type="text" name="cardName" placeholder="Cardholder Name" value={newPayment.cardName} onChange={handlePaymentChange} style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }} />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                      <input type="text" name="expiry" placeholder="MM/YY" value={newPayment.expiry} onChange={handlePaymentChange} style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }} />
                      <input type="password" name="cvv" placeholder="CVV" value={newPayment.cvv} onChange={handlePaymentChange} maxLength="3" style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }} />
                    </div>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <input type="checkbox" name="default" checked={newPayment.default} onChange={(e) => setNewPayment({ ...newPayment, default: e.target.checked })} />
                      Set as default payment method
                    </label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button onClick={addPaymentMethod} style={{ padding: '10px 20px', background: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Save Card</button>
                      <button onClick={() => setShowPaymentForm(false)} style={{ padding: '10px 20px', background: '#666', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Cancel</button>
                    </div>
                  </div>
                </div>
              )}

              <div style={{ display: 'grid', gap: '15px' }}>
                {paymentMethods.map(pm => (
                  <div key={pm.id} style={{ border: pm.default ? '2px solid #ff6600' : '1px solid #eee', padding: '15px', borderRadius: '8px', position: 'relative' }}>
                    {pm.default && <span style={{ position: 'absolute', top: '-10px', left: '10px', background: '#ff6600', color: 'white', padding: '2px 10px', borderRadius: '20px', fontSize: '10px' }}>Default</span>}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <h4>{pm.brand} •••• {pm.last4}</h4>
                        <p style={{ color: '#666', fontSize: '12px' }}>Expires {pm.expiry}</p>
                      </div>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        {!pm.default && <button onClick={() => setDefaultPayment(pm.id)} style={{ background: 'none', border: 'none', color: '#ff6600', cursor: 'pointer' }}>Set as Default</button>}
                        <button onClick={() => deletePayment(pm.id)} style={{ background: 'none', border: 'none', color: '#ff4444', cursor: 'pointer' }}><FaTrash /> Delete</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notifications Tab - WORKING */}
          {activeTab === 'notifications' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2>Notifications {unreadCount > 0 && `(${unreadCount} unread)`}</h2>
                {unreadCount > 0 && (
                  <button onClick={markAllAsRead} style={{ padding: '8px 15px', background: '#ff6600', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    Mark All as Read
                  </button>
                )}
              </div>
              <div style={{ display: 'grid', gap: '15px' }}>
                {notifications.map(notif => (
                  <div key={notif.id} onClick={() => markNotificationAsRead(notif.id)} style={{ background: notif.read ? '#f9f9f9' : '#fff5f0', borderLeft: notif.read ? '3px solid #ccc' : '3px solid #ff6600', padding: '15px', borderRadius: '8px', cursor: 'pointer' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h4 style={{ color: notif.read ? '#666' : '#333' }}>{notif.title}</h4>
                      <button onClick={(e) => { e.stopPropagation(); deleteNotification(notif.id); }} style={{ background: 'none', border: 'none', color: '#ff4444', cursor: 'pointer' }}><FaTrash /></button>
                    </div>
                    <p style={{ color: '#666', marginTop: '5px' }}>{notif.message}</p>
                    <p style={{ color: '#999', fontSize: '11px', marginTop: '10px' }}>{notif.date}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Account Settings Tab - WORKING */}
          {activeTab === 'settings' && (
            <div>
              <h2 style={{ marginBottom: '20px' }}>Account Settings</h2>
              
              {/* Change Password Section */}
              <div style={{ marginBottom: '30px', padding: '20px', background: '#f9f9f9', borderRadius: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                  <h3 style={{ color: '#ff6600' }}>Change Password</h3>
                  <button onClick={() => setShowPasswordForm(!showPasswordForm)} style={{ padding: '8px 15px', background: '#ff6600', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    {showPasswordForm ? 'Cancel' : 'Change Password'}
                  </button>
                </div>
                
                {showPasswordForm && (
                  <div style={{ display: 'grid', gap: '15px', maxWidth: '400px' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Current Password</label>
                      <div style={{ position: 'relative' }}>
                        <input type={showCurrentPassword ? 'text' : 'password'} name="currentPassword" placeholder="Enter current password" value={passwordData.currentPassword} onChange={handlePasswordChange} style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '5px', paddingRight: '40px' }} />
                        <button type="button" onClick={() => setShowCurrentPassword(!showCurrentPassword)} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer' }}>{showCurrentPassword ? <FaEyeSlash /> : <FaEye />}</button>
                      </div>
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>New Password</label>
                      <div style={{ position: 'relative' }}>
                        <input type={showNewPassword ? 'text' : 'password'} name="newPassword" placeholder="Enter new password" value={passwordData.newPassword} onChange={handlePasswordChange} style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '5px', paddingRight: '40px' }} />
                        <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer' }}>{showNewPassword ? <FaEyeSlash /> : <FaEye />}</button>
                      </div>
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Confirm New Password</label>
                      <div style={{ position: 'relative' }}>
                        <input type={showConfirmPassword ? 'text' : 'password'} name="confirmPassword" placeholder="Confirm new password" value={passwordData.confirmPassword} onChange={handlePasswordChange} style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '5px', paddingRight: '40px' }} />
                        <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer' }}>{showConfirmPassword ? <FaEyeSlash /> : <FaEye />}</button>
                      </div>
                    </div>
                    <button onClick={handleUpdatePassword} style={{ padding: '12px', background: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Update Password</button>
                  </div>
                )}
              </div>

              {/* Email Preferences */}
              <div style={{ marginBottom: '30px', padding: '20px', background: '#f9f9f9', borderRadius: '8px' }}>
                <h3 style={{ marginBottom: '15px', color: '#ff6600' }}>Email Preferences</h3>
                <div style={{ display: 'grid', gap: '10px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <input type="checkbox" checked={emailPreferences.promotions} onChange={(e) => setEmailPreferences({ ...emailPreferences, promotions: e.target.checked })} /> Receive promotional emails
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <input type="checkbox" checked={emailPreferences.orders} onChange={(e) => setEmailPreferences({ ...emailPreferences, orders: e.target.checked })} /> Receive order updates
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <input type="checkbox" checked={emailPreferences.newsletter} onChange={(e) => setEmailPreferences({ ...emailPreferences, newsletter: e.target.checked })} /> Receive newsletter
                  </label>
                  <button onClick={handleSavePreferences} style={{ padding: '10px', background: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '10px' }}>Save Preferences</button>
                </div>
              </div>

              {/* Account Management */}
              <div style={{ padding: '20px', background: '#f9f9f9', borderRadius: '8px' }}>
                <h3 style={{ marginBottom: '15px', color: '#ff6600' }}>Account Management</h3>
                <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                  <button style={{ padding: '10px 20px', background: '#ff4444', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Deactivate Account</button>
                  <button style={{ padding: '10px 20px', background: '#666', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Download My Data</button>
                </div>
                <p style={{ fontSize: '12px', color: '#666', marginTop: '15px' }}>⚠️ Deactivating your account will disable your profile but not delete your data.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Account;