import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      fetchUserProfile();
      fetchOrders();
      fetchWishlist();
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/auth/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        setUser(response.data.user);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/orders/myorders', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        setOrders(response.data.orders);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const fetchWishlist = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/wishlist', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        setWishlist(response.data.wishlist);
      }
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      
      if (response.data.success) {
        setToken(response.data.token);
        setUser(response.data.user);
        localStorage.setItem('token', response.data.token);
        await fetchOrders();
        await fetchWishlist();
        setLoading(false);
        return { success: true, user: response.data.user };
      } else {
        setLoading(false);
        return { success: false, error: response.data.message || 'Login failed' };
      }
    } catch (error) {
      setLoading(false);
      const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
      return { success: false, error: errorMessage };
    }
  };

  const register = async (name, email, password, phone) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', { name, email, password, phone });
      
      if (response.data.success) {
        setToken(response.data.token);
        setUser(response.data.user);
        localStorage.setItem('token', response.data.token);
        setLoading(false);
        return { success: true, user: response.data.user };
      } else {
        setLoading(false);
        return { success: false, error: response.data.message || 'Registration failed' };
      }
    } catch (error) {
      setLoading(false);
      const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
      return { success: false, error: errorMessage };
    }
  };

  const updateProfile = async (userData) => {
    setLoading(true);
    try {
      const response = await axios.put('http://localhost:5000/api/auth/profile', userData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.success) {
        setToken(response.data.token);
        setUser(response.data.user);
        localStorage.setItem('token', response.data.token);
        setLoading(false);
        return { success: true, user: response.data.user, message: response.data.message };
      } else {
        setLoading(false);
        return { success: false, error: response.data.message || 'Update failed' };
      }
    } catch (error) {
      setLoading(false);
      const errorMessage = error.response?.data?.message || 'Update failed. Please try again.';
      return { success: false, error: errorMessage };
    }
  };

  const changePassword = async (currentPassword, newPassword) => {
    setLoading(true);
    try {
      const response = await axios.put('http://localhost:5000/api/auth/change-password', 
        { currentPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      if (response.data.success) {
        setLoading(false);
        return { success: true, message: response.data.message };
      } else {
        setLoading(false);
        return { success: false, error: response.data.message };
      }
    } catch (error) {
      setLoading(false);
      const errorMessage = error.response?.data?.message || 'Password change failed';
      return { success: false, error: errorMessage };
    }
  };

  const createOrder = async (orderData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/orders', orderData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        await fetchOrders();
        return { success: true, order: response.data.order, message: response.data.message };
      }
      return { success: false, error: response.data.message };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to place order' };
    }
  };

  const getOrderDetails = async (orderId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        return { success: true, order: response.data.order };
      }
      return { success: false, error: response.data.message };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to get order' };
    }
  };

  const addToWishlist = async (productId) => {
    try {
      const response = await axios.post('http://localhost:5000/api/wishlist/add', 
        { productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        setWishlist(response.data.wishlist);
        return { success: true, message: response.data.message };
      }
      return { success: false, error: response.data.message };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to add to wishlist' };
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/wishlist/remove/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        setWishlist(response.data.wishlist);
        return { success: true, message: response.data.message };
      }
      return { success: false, error: response.data.message };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to remove from wishlist' };
    }
  };

  const checkInWishlist = async (productId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/wishlist/check/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        return { success: true, inWishlist: response.data.inWishlist };
      }
      return { success: false, inWishlist: false };
    } catch (error) {
      return { success: false, inWishlist: false };
    }
  };

  const addAddress = async (address) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/addresses', address, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        setUser(prev => ({ ...prev, addresses: response.data.addresses }));
        return { success: true, message: response.data.message };
      }
      return { success: false, error: response.data.message };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to add address' };
    }
  };

  const updateAddress = async (addressId, updates) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/auth/addresses/${addressId}`, updates, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        setUser(prev => ({ ...prev, addresses: response.data.addresses }));
        return { success: true, message: response.data.message };
      }
      return { success: false, error: response.data.message };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to update address' };
    }
  };

  const deleteAddress = async (addressId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/auth/addresses/${addressId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        setUser(prev => ({ ...prev, addresses: response.data.addresses }));
        return { success: true, message: response.data.message };
      }
      return { success: false, error: response.data.message };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to delete address' };
    }
  };

  const addPaymentMethod = async (payment) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/payments', payment, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        setUser(prev => ({ ...prev, paymentMethods: response.data.paymentMethods }));
        return { success: true, message: response.data.message };
      }
      return { success: false, error: response.data.message };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to add payment method' };
    }
  };

  const deletePaymentMethod = async (paymentId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/auth/payments/${paymentId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        setUser(prev => ({ ...prev, paymentMethods: response.data.paymentMethods }));
        return { success: true, message: response.data.message };
      }
      return { success: false, error: response.data.message };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to delete payment method' };
    }
  };

  const setDefaultPayment = async (paymentId) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/auth/payments/${paymentId}/default`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        setUser(prev => ({ ...prev, paymentMethods: response.data.paymentMethods }));
        return { success: true, message: response.data.message };
      }
      return { success: false, error: response.data.message };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to set default payment' };
    }
  };

  const updatePreferences = async (preferences) => {
    try {
      const response = await axios.put('http://localhost:5000/api/auth/preferences', preferences, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        setUser(prev => ({ ...prev, preferences: response.data.preferences }));
        return { success: true, message: response.data.message };
      }
      return { success: false, error: response.data.message };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to update preferences' };
    }
  };

  // LOGOUT - Clear cart from localStorage
  const logout = () => {
    setToken(null);
    setUser(null);
    setOrders([]);
    setWishlist([]);
    localStorage.removeItem('token');
    localStorage.removeItem('cart'); // Clear cart on logout
    // Also trigger a cart update event
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      orders,
      wishlist,
      login, 
      register, 
      logout, 
      updateProfile,
      changePassword,
      addAddress,
      updateAddress,
      deleteAddress,
      addPaymentMethod,
      deletePaymentMethod,
      setDefaultPayment,
      updatePreferences,
      createOrder,
      getOrderDetails,
      addToWishlist,
      removeFromWishlist,
      checkInWishlist,
      loading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
