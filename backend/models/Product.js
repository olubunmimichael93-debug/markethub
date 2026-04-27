const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userName: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  category: { type: String, required: true },
  brand: { type: String },
  image: { type: String },
  images: { type: [String], default: [] },
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  sold: { type: Number, default: 0 },
  stock: { type: Number, default: 10 },
  description: { type: String, default: '' },
  reviewList: [reviewSchema]
});

module.exports = mongoose.model('Product', productSchema);
