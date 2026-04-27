const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Product = require('./models/Product');

const directFixes = [
  { name: 'iPhone 14 Pro', image: 'https://images.unsplash.com/photo-1678652199583-7e9c6eb7f9b5?w=400' },
  { name: 'iPhone 14', image: 'https://images.unsplash.com/photo-1678652199583-7e9c6eb7f9b5?w=400' },
  { name: 'iPhone 13 Pro', image: 'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=400' },
  { name: 'AirPods Pro 2', image: 'https://images.unsplash.com/photo-1588421357574-87958a86fa28?w=400' },
  { name: 'AirPods 3', image: 'https://images.unsplash.com/photo-1588421357574-87958a86fa28?w=400' },
  { name: 'Infinix Note 30', image: 'https://images.unsplash.com/photo-1592899677977-14132d1ff6d9?w=400' },
  { name: 'Infinix Zero 30', image: 'https://images.unsplash.com/photo-1592899677977-14132d1ff6d9?w=400' },
  { name: 'Tecno Camon 20 Pro', image: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=400' },
  { name: 'Tecno Spark 10 Pro', image: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=400' },
  { name: 'Samsung Galaxy S23 Ultra', image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400' },
  { name: 'Samsung Galaxy S23', image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400' }
];

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    
    for (const fix of directFixes) {
      const result = await Product.updateOne(
        { name: { $regex: new RegExp(`^${fix.name}$`, 'i') } },
        { $set: { image: fix.image, images: [fix.image, fix.image] } }
      );
      if (result.modifiedCount > 0) {
        console.log(`✅ Fixed: ${fix.name}`);
      } else {
        console.log(`⚠️ Not found: ${fix.name}`);
      }
    }
    
    console.log('🎉 All images fixed!');
    process.exit(0);
  })
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
