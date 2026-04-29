const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const NodeCache = require('node-cache');

dotenv.config();

const app = express();
const cache = new NodeCache({ stdTTL: 300 }); // Cache for 5 minutes

// CORS - Allow all origins for now
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'https://markethub-sandy.vercel.app'],
  credentials: true
}));
app.use(express.json());

// Cache middleware for products
const cacheProducts = (req, res, next) => {
  const key = req.originalUrl;
  const cachedData = cache.get(key);
  if (cachedData) {
    return res.json(cachedData);
  }
  res.originalJson = res.json;
  res.json = (body) => {
    cache.set(key, body, 300);
    res.originalJson(body);
  };
  next();
};

// Routes
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const wishlistRoutes = require('./routes/wishlist');
const adminRoutes = require('./routes/admin');
const reviewRoutes = require('./routes/reviews');

// Apply cache only to GET products
app.use('/api/auth', authRoutes);
app.use('/api/products', cacheProducts, productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/reviews', reviewRoutes);

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working! Caching enabled.' });
});

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📦 Products API (cached 5 min): http://localhost:${PORT}/api/products`);
  console.log(`✅ Cache enabled - products will load faster!`);
});
