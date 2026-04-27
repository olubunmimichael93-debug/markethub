const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Product = require('./models/Product');

const productImages = {
  // Phones
  'iPhone 14 Pro': 'https://images.unsplash.com/photo-1678652199583-7e9c6eb7f9b5?w=400',
  'iPhone 14': 'https://images.unsplash.com/photo-1678652199583-7e9c6eb7f9b5?w=400',
  'iPhone 13 Pro': 'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=400',
  'Samsung Galaxy S23 Ultra': 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400',
  'Samsung Galaxy S23': 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400',
  'Samsung A54': 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400',
  'Tecno Camon 20 Pro': 'https://images.unsplash.com/photo-1592899677977-14132d1ff6d9?w=400',
  'Tecno Spark 10 Pro': 'https://images.unsplash.com/photo-1592899677977-14132d1ff6d9?w=400',
  'Infinix Note 30': 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=400',
  'Infinix Zero 30': 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=400',
  
  // Computers
  'MacBook Pro M3': 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
  'MacBook Air M2': 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=400',
  'HP Pavilion 15': 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400',
  'HP Spectre x360': 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400',
  'Dell XPS 15': 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400',
  'Dell Inspiron': 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400',
  'Lenovo ThinkPad': 'https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?w=400',
  'Lenovo Legion 5': 'https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?w=400',
  
  // Electronics
  'Sony WH-1000XM5': 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400',
  'AirPods Pro 2': 'https://images.unsplash.com/photo-1588421357574-87958a86fa28?w=400',
  'Samsung Galaxy Watch 6': 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400',
  'Apple Watch Series 9': 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400',
  'JBL Flip 6 Speaker': 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400',
  'Canon EOS R50': 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400',
  
  // Fashion
  'Nike Air Max 90': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
  'Nike Air Force 1': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
  'Gucci Bag': 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400',
  'Ray-Ban Sunglasses': 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400',
  
  // Home
  'LG Refrigerator': 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400',
  'Sony 55" TV': 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400',
  'Philips Air Fryer': 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=400'
};

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    
    for (const [name, imageUrl] of Object.entries(productImages)) {
      const result = await Product.updateOne(
        { name: name },
        { $set: { image: imageUrl } }
      );
      if (result.modifiedCount > 0) {
        console.log(`✅ Updated: ${name}`);
      } else {
        console.log(`⚠️ Not found: ${name}`);
      }
    }
    
    console.log('🎉 Product images updated!');
    process.exit(0);
  })
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
