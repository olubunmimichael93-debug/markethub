import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FaUsers, FaBox, FaShoppingCart, FaMoneyBill, FaEdit, FaTrash, FaEye } from 'react-icons/fa';

function AdminDashboard() {
  const { user, token, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    name: '', price: '', originalPrice: '', category: '', brand: '', image: '📱', stock: 10, discount: 0, description: ''
  });

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        navigate('/login');
        return;
      }
      if (!user.isAdmin) {
        navigate('/');
        return;
      }
      fetchData();
    }
  }, [user, authLoading]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [statsRes, usersRes, productsRes, ordersRes] = await Promise.all([
        axios.get('https://markethub-aj3o.onrender.com/api/admin/stats', { headers: { Authorization: `Bearer ${token}` } }),
        axios.get('https://markethub-aj3o.onrender.com/api/admin/users', { headers: { Authorization: `Bearer ${token}` } }),
        axios.get('https://markethub-aj3o.onrender.com/api/admin/products', { headers: { Authorization: `Bearer ${token}` } }),
        axios.get('https://markethub-aj3o.onrender.com/api/admin/orders', { headers: { Authorization: `Bearer ${token}` } })
      ]);
      
      setStats(statsRes.data.stats);
      setUsers(usersRes.data.users);
      setProducts(productsRes.data.products);
      setOrders(ordersRes.data.orders);
    } catch (error) {
      console.error('Error fetching admin data:', error);
    }
    setLoading(false);
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await axios.put(`https://markethub-aj3o.onrender.com/api/admin/products/${editingProduct._id}`, productForm, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post('https://markethub-aj3o.onrender.com/api/admin/products', productForm, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      setShowProductModal(false);
      setEditingProduct(null);
      setProductForm({ name: '', price: '', originalPrice: '', category: '', brand: '', image: '📱', stock: 10, discount: 0, description: '' });
      fetchData();
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Error saving product');
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`https://markethub-aj3o.onrender.com/api/admin/products/${productId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchData();
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Error deleting product');
      }
    }
  };

  const handleUpdateOrderStatus = async (orderId, status) => {
    try {
      await axios.put(`https://markethub-aj3o.onrender.com/api/admin/orders/${orderId}/status`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchData();
    } catch (error) {
      console.error('Error updating order:', error);
      alert('Error updating order status');
    }
  };

  const handleToggleAdmin = async (userId, isAdmin) => {
    try {
      await axios.put(`https://markethub-aj3o.onrender.com/api/admin/users/${userId}/role`, { isAdmin: !isAdmin }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchData();
    } catch (error) {
      console.error('Error updating user role:', error);
      alert('Error updating user role');
    }
  };

  if (authLoading || loading) {
    return <div style={{ textAlign: 'center', padding: '80px', color: '#333' }}>Loading Admin Dashboard...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div style={{ maxWidth: '1400px', margin: '30px auto', padding: '0 20px' }}>
      <h1 style={{ marginBottom: '20px', color: '#ff6600' }}>Admin Dashboard</h1>
      
      <div style={{ display: 'flex', gap: '10px', marginBottom: '30px', borderBottom: '1px solid #ddd', flexWrap: 'wrap', paddingBottom: '10px' }}>
        <button onClick={() => setActiveTab('dashboard')} style={{ padding: '10px 20px', background: activeTab === 'dashboard' ? '#ff6600' : '#f0f0f0', color: activeTab === 'dashboard' ? 'white' : '#333', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Dashboard</button>
        <button onClick={() => setActiveTab('products')} style={{ padding: '10px 20px', background: activeTab === 'products' ? '#ff6600' : '#f0f0f0', color: activeTab === 'products' ? 'white' : '#333', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Products ({products.length})</button>
        <button onClick={() => setActiveTab('orders')} style={{ padding: '10px 20px', background: activeTab === 'orders' ? '#ff6600' : '#f0f0f0', color: activeTab === 'orders' ? 'white' : '#333', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Orders ({orders.length})</button>
        <button onClick={() => setActiveTab('users')} style={{ padding: '10px 20px', background: activeTab === 'users' ? '#ff6600' : '#f0f0f0', color: activeTab === 'users' ? 'white' : '#333', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Users ({users.length})</button>
      </div>

      {activeTab === 'dashboard' && stats && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '30px' }}>
            <div style={{ background: 'white', padding: '25px', borderRadius: '10px', textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderTop: '4px solid #ff6600' }}>
              <FaUsers size={40} color="#ff6600" />
              <h2 style={{ margin: '10px 0', fontSize: '32px', color: '#333' }}>{stats.totalUsers}</h2>
              <p style={{ color: '#666' }}>Total Users</p>
            </div>
            <div style={{ background: 'white', padding: '25px', borderRadius: '10px', textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderTop: '4px solid #28a745' }}>
              <FaBox size={40} color="#28a745" />
              <h2 style={{ margin: '10px 0', fontSize: '32px', color: '#333' }}>{stats.totalProducts}</h2>
              <p style={{ color: '#666' }}>Total Products</p>
            </div>
            <div style={{ background: 'white', padding: '25px', borderRadius: '10px', textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderTop: '4px solid #17a2b8' }}>
              <FaShoppingCart size={40} color="#17a2b8" />
              <h2 style={{ margin: '10px 0', fontSize: '32px', color: '#333' }}>{stats.totalOrders}</h2>
              <p style={{ color: '#666' }}>Total Orders</p>
            </div>
            <div style={{ background: 'white', padding: '25px', borderRadius: '10px', textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderTop: '4px solid #ffc107' }}>
              <FaMoneyBill size={40} color="#ffc107" />
              <h2 style={{ margin: '10px 0', fontSize: '28px', color: '#333' }}>₦{stats.totalSales.toLocaleString()}</h2>
              <p style={{ color: '#666' }}>Total Sales</p>
            </div>
          </div>
          
          <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h3 style={{ marginBottom: '20px', color: '#333' }}>Recent Orders</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f5f5f5' }}>
                  <th style={{ textAlign: 'left', padding: '12px', color: '#333' }}>Order ID</th>
                  <th style={{ textAlign: 'left', padding: '12px', color: '#333' }}>Customer</th>
                  <th style={{ textAlign: 'left', padding: '12px', color: '#333' }}>Amount</th>
                  <th style={{ textAlign: 'left', padding: '12px', color: '#333' }}>Status</th>
                  <th style={{ textAlign: 'left', padding: '12px', color: '#333' }}>Date</th>
                  <th style={{ textAlign: 'left', padding: '12px', color: '#333' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentOrders?.map(order => (
                  <tr key={order._id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '12px', color: '#333' }}>#{order._id.slice(-8)}</td>
                    <td style={{ padding: '12px', color: '#333' }}>{order.user?.name || 'N/A'}</td>
                    <td style={{ padding: '12px', color: '#333' }}>₦{order.totalAmount.toLocaleString()}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{ background: order.status === 'delivered' ? '#28a745' : order.status === 'shipped' ? '#17a2b8' : '#ffc107', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '12px' }}>
                        {order.status}
                      </span>
                    </td>
                    <td style={{ padding: '12px', color: '#333' }}>{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td style={{ padding: '12px' }}>
                      <button onClick={() => { setActiveTab('orders'); }} style={{ background: 'none', border: 'none', color: '#ff6600', cursor: 'pointer' }}>
                        <FaEye /> View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'products' && (
        <div>
          <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ color: '#333' }}>Product Management</h2>
            <button onClick={() => { setEditingProduct(null); setProductForm({ name: '', price: '', originalPrice: '', category: '', brand: '', image: '📱', stock: 10, discount: 0, description: '' }); setShowProductModal(true); }} style={{ padding: '10px 20px', background: '#ff6600', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
              + Add New Product
            </button>
          </div>
          
          <div style={{ background: 'white', borderRadius: '8px', overflow: 'auto', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f5f5f5' }}>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#333' }}>Image</th>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#333' }}>Name</th>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#333' }}>Price</th>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#333' }}>Category</th>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#333' }}>Stock</th>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#333' }}>Discount</th>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#333' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product._id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '12px', fontSize: '30px' }}>{product.image}</td>
                    <td style={{ padding: '12px', color: '#333' }}>{product.name}</td>
                    <td style={{ padding: '12px', color: '#333' }}>₦{product.price.toLocaleString()}</td>
                    <td style={{ padding: '12px', color: '#333' }}>{product.category}</td>
                    <td style={{ padding: '12px', color: '#333' }}>{product.stock}</td>
                    <td style={{ padding: '12px', color: '#333' }}>{product.discount}%</td>
                    <td style={{ padding: '12px' }}>
                      <button onClick={() => { setEditingProduct(product); setProductForm(product); setShowProductModal(true); }} style={{ background: 'none', border: 'none', color: '#ff6600', cursor: 'pointer', marginRight: '15px' }}>
                        <FaEdit size={18} />
                      </button>
                      <button onClick={() => handleDeleteProduct(product._id)} style={{ background: 'none', border: 'none', color: '#ff4444', cursor: 'pointer' }}>
                        <FaTrash size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'orders' && (
        <div>
          <h2 style={{ marginBottom: '20px', color: '#333' }}>Order Management</h2>
          <div style={{ background: 'white', borderRadius: '8px', overflow: 'auto', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f5f5f5' }}>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#333' }}>Order ID</th>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#333' }}>Customer</th>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#333' }}>Amount</th>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#333' }}>Status</th>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#333' }}>Date</th>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#333' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order._id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '12px', color: '#333' }}>#{order._id.slice(-8)}</td>
                    <td style={{ padding: '12px', color: '#333' }}>{order.user?.name || 'N/A'}</td>
                    <td style={{ padding: '12px', color: '#333' }}>₦{order.totalAmount.toLocaleString()}</td>
                    <td style={{ padding: '12px' }}>
                      <select value={order.status} onChange={(e) => handleUpdateOrderStatus(order._id, e.target.value)} style={{ padding: '5px 10px', borderRadius: '5px', border: '1px solid #ddd', background: 'white', color: '#333' }}>
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    </td>
                    <td style={{ padding: '12px', color: '#333' }}>{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td style={{ padding: '12px' }}>
                      <Link to={`/order/${order._id}`} style={{ color: '#ff6600', textDecoration: 'none' }}>
                        <FaEye /> View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div>
          <h2 style={{ marginBottom: '20px', color: '#333' }}>User Management</h2>
          <div style={{ background: 'white', borderRadius: '8px', overflow: 'auto', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f5f5f5' }}>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#333' }}>Name</th>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#333' }}>Email</th>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#333' }}>Phone</th>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#333' }}>Role</th>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#333' }}>Joined</th>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#333' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u._id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '12px', color: '#333' }}>{u.name}</td>
                    <td style={{ padding: '12px', color: '#333' }}>{u.email}</td>
                    <td style={{ padding: '12px', color: '#333' }}>{u.phone || 'N/A'}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{ background: u.isAdmin ? '#ff6600' : '#28a745', color: 'white', padding: '3px 10px', borderRadius: '20px', fontSize: '11px' }}>
                        {u.isAdmin ? 'Admin' : 'User'}
                      </span>
                    </td>
                    <td style={{ padding: '12px', color: '#333' }}>{new Date(u.createdAt).toLocaleDateString()}</td>
                    <td style={{ padding: '12px' }}>
                      {!u.isAdmin && (
                        <button onClick={() => handleToggleAdmin(u._id, u.isAdmin)} style={{ background: '#ff6600', color: 'white', border: 'none', padding: '5px 12px', borderRadius: '5px', cursor: 'pointer' }}>
                          Make Admin
                        </button>
                      )}
                      {u.isAdmin && u.email !== 'olubunmimichael93@gmail.com' && (
                        <button onClick={() => handleToggleAdmin(u._id, u.isAdmin)} style={{ background: '#ff4444', color: 'white', border: 'none', padding: '5px 12px', borderRadius: '5px', cursor: 'pointer' }}>
                          Remove Admin
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showProductModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', padding: '30px', borderRadius: '12px', width: '550px', maxWidth: '90%', maxHeight: '90%', overflow: 'auto' }}>
            <h2 style={{ marginBottom: '20px', color: '#333' }}>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
            <form onSubmit={handleProductSubmit}>
              <input type="text" placeholder="Product Name" value={productForm.name} onChange={(e) => setProductForm({ ...productForm, name: e.target.value })} required style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '5px', color: '#333' }} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                <input type="number" placeholder="Price" value={productForm.price} onChange={(e) => setProductForm({ ...productForm, price: e.target.value })} required style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px', color: '#333' }} />
                <input type="number" placeholder="Original Price" value={productForm.originalPrice} onChange={(e) => setProductForm({ ...productForm, originalPrice: e.target.value })} style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px', color: '#333' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                <select value={productForm.category} onChange={(e) => setProductForm({ ...productForm, category: e.target.value })} required style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px', color: '#333' }}>
                  <option value="">Select Category</option>
                  <option value="Phones">Phones</option>
                  <option value="Computers">Computers</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Home">Home</option>
                </select>
                <input type="text" placeholder="Brand" value={productForm.brand} onChange={(e) => setProductForm({ ...productForm, brand: e.target.value })} style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px', color: '#333' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                <input type="text" placeholder="Image Emoji" value={productForm.image} onChange={(e) => setProductForm({ ...productForm, image: e.target.value })} style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px', color: '#333' }} />
                <input type="number" placeholder="Stock" value={productForm.stock} onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })} style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px', color: '#333' }} />
              </div>
              <input type="number" placeholder="Discount %" value={productForm.discount} onChange={(e) => setProductForm({ ...productForm, discount: e.target.value })} style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '5px', color: '#333' }} />
              <textarea placeholder="Description" value={productForm.description} onChange={(e) => setProductForm({ ...productForm, description: e.target.value })} rows="3" style={{ width: '100%', padding: '10px', marginBottom: '20px', border: '1px solid #ddd', borderRadius: '5px', color: '#333' }}></textarea>
              
              <div style={{ display: 'flex', gap: '10px' }}>
                <button type="submit" style={{ flex: 1, padding: '12px', background: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </button>
                <button type="button" onClick={() => { setShowProductModal(false); setEditingProduct(null); }} style={{ flex: 1, padding: '12px', background: '#666', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
