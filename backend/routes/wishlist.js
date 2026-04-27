const router = require('express').Router();
const User = require('../models/User');
const Product = require('../models/Product');
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// Get wishlist
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('wishlist.product');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ success: true, wishlist: user.wishlist || [] });
  } catch (error) {
    console.error('Get wishlist error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add to wishlist
router.post('/add', auth, async (req, res) => {
  try {
    const { productId } = req.body;
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    // Check if already in wishlist
    const alreadyExists = user.wishlist.some(item => item.product.toString() === productId);
    if (alreadyExists) {
      return res.status(400).json({ message: 'Product already in wishlist' });
    }
    
    user.wishlist.push({ product: productId });
    await user.save();
    
    const updatedUser = await User.findById(req.user.id).populate('wishlist.product');
    res.json({ success: true, wishlist: updatedUser.wishlist, message: 'Added to wishlist' });
  } catch (error) {
    console.error('Add to wishlist error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Remove from wishlist
router.delete('/remove/:productId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    user.wishlist = user.wishlist.filter(item => item.product.toString() !== req.params.productId);
    await user.save();
    
    const updatedUser = await User.findById(req.user.id).populate('wishlist.product');
    res.json({ success: true, wishlist: updatedUser.wishlist, message: 'Removed from wishlist' });
  } catch (error) {
    console.error('Remove from wishlist error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Check if product is in wishlist
router.get('/check/:productId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const inWishlist = user.wishlist.some(item => item.product.toString() === req.params.productId);
    res.json({ success: true, inWishlist });
  } catch (error) {
    console.error('Check wishlist error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
