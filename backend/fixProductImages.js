const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Product = require('./models/Product');

// Category-specific fallback images
const categoryImages = {
  'Phones': 'https://images.unsplash.com/photo-1592899677977-14132d1ff6d9?w=400',
  'Computers': 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
  'Electronics': 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400',
  'Fashion': 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400',
  'Home': 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400'
};

// Specific product images
const productImages = {
  'iPhone 14 Pro': 'https://images.unsplash.com/photo-1678652199583-7e9c6eb7f9b5?w=400',
  'iPhone 14': 'https://images.unsplash.com/photo-1678652199583-7e9c6eb7f9b5?w=400',
  'iPhone 13 Pro': 'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=400',
  'Tecno Camon 20 Pro': 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=400',
  'Tecno Spark 10 Pro': 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=400',
  'Infinix Note 30': 'https://images.unsplash.com/photo-1592899677977-14132d1ff6d9?w=400',
  'Infinix Zero 30': 'https://images.unsplash.com/photo-1592899677977-14132d1ff6d9?w=400',
  'Samsung Galaxy S23 Ultra': 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400',
  'Samsung Galaxy S23': 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400',
  'Samsung A54': 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400',
  'MacBook Pro M3': 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
  'MacBook Air M2': 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=400',
  'Nike Air Max 90': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
  'Nike Air Force 1': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
  'Gucci Bag': 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400',
  'Sony WH-1000XM5': 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400',
  'AirPods Pro 2': 'https://images.unsplash.com/photo-1588421357574-87958a86fa28?w=400'
};

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    
    const products = await Product.find();
    let updated = 0;
    
    for (const product of products) {
      let newImage = null;
      
      // Check if product has specific image
      if (productImages[product.name]) {
        newImage = productImages[product.name];
      } 
      // Otherwise use category image
      else if (categoryImages[product.category]) {
        newImage = categoryImages[product.category];
      }
      
      if (newImage && product.image !== newImage) {
        await Product.updateOne(
          { _id: product._id },
          { $set: { image: newImage, images: [newImage, newImage] } }
        );
        console.log(`✅ Updated: ${product.name}`);
        updated++;
      }
    }
    
    console.log(`🎉 Updated ${updated} products with proper images!`);
    process.exit(0);
  })
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
