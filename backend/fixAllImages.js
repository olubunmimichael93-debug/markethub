const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Product = require('./models/Product');

const productImageMap = {
  'iPhone 14 Pro': 'https://images.unsplash.com/photo-1678652199583-7e9c6eb7f9b5?w=400',
  'iPhone 14': 'https://images.unsplash.com/photo-1678652199583-7e9c6eb7f9b5?w=400',
  'iPhone 13 Pro': 'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=400',
  'AirPods Pro 2': 'https://images.unsplash.com/photo-1588421357574-87958a86fa28?w=400',
  'Infinix Note 30': 'https://images.unsplash.com/photo-1592899677977-14132d1ff6d9?w=400',
  'Infinix Zero 30': 'https://images.unsplash.com/photo-1592899677977-14132d1ff6d9?w=400',
  'Tecno Camon 20 Pro': 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=400',
  'Samsung Galaxy S23 Ultra': 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400',
  'Nike Air Max 90': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
  'Sony WH-1000XM5': 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400',
  'MacBook Pro M3': 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400'
};

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    
    for (const [name, imageUrl] of Object.entries(productImageMap)) {
      const result = await Product.updateMany(
        { name: { $regex: name, $options: 'i' } },
        { $set: { image: imageUrl } }
      );
      console.log(`✅ ${name}: ${result.modifiedCount} updated`);
    }
    
    console.log('🎉 All images fixed! Restart your backend now.');
    process.exit(0);
  })
  .catch(err => { console.error(err); process.exit(1); });
