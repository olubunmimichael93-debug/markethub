const router = require('express').Router();
const Product = require('../models/Product');
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Add review
router.post('/:productId', auth, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.productId);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    // Check if user already reviewed
    const alreadyReviewed = product.reviewList.find(
      r => r.user.toString() === req.user.id
    );
    
    if (alreadyReviewed) {
      return res.status(400).json({ message: 'Product already reviewed' });
    }
    
    const review = {
      user: req.user.id,
      userName: req.user.name,
      rating: Number(rating),
      comment
    };
    
    product.reviewList.push(review);
    product.reviews = product.reviewList.length;
    product.rating = product.reviewList.reduce((acc, item) => item.rating + acc, 0) / product.reviewList.length;
    
    await product.save();
    res.status(201).json({ success: true, message: 'Review added', product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get reviews
router.get('/:productId', async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ success: true, reviews: product.reviewList, rating: product.rating, count: product.reviews });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
