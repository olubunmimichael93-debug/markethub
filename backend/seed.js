const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Product = require('./models/Product');

const products = [
  // PHONES
  { name: 'iPhone 14 Pro', price: 850000, originalPrice: 950000, category: 'Phones', brand: 'Apple', image: '📱', rating: 4.5, reviews: 128, discount: 11, sold: 50, stock: 25, description: 'Latest iPhone with dynamic island and A16 chip' },
  { name: 'iPhone 14', price: 650000, originalPrice: 750000, category: 'Phones', brand: 'Apple', image: '📱', rating: 4.4, reviews: 95, discount: 13, sold: 40, stock: 30, description: 'Powerful iPhone with A15 chip' },
  { name: 'iPhone 13 Pro', price: 550000, originalPrice: 650000, category: 'Phones', brand: 'Apple', image: '📱', rating: 4.3, reviews: 200, discount: 15, sold: 80, stock: 20, description: 'Previous flagship with ProMotion display' },
  { name: 'Samsung Galaxy S23 Ultra', price: 850000, originalPrice: 950000, category: 'Phones', brand: 'Samsung', image: '📱', rating: 4.6, reviews: 150, discount: 11, sold: 60, stock: 15, description: 'Ultra premium Android with S Pen' },
  { name: 'Samsung Galaxy S23', price: 750000, originalPrice: 850000, category: 'Phones', brand: 'Samsung', image: '📱', rating: 4.3, reviews: 95, discount: 12, sold: 35, stock: 15, description: 'Flagship Samsung phone' },
  { name: 'Samsung A54', price: 250000, originalPrice: 300000, category: 'Phones', brand: 'Samsung', image: '📱', rating: 4.2, reviews: 80, discount: 17, sold: 45, stock: 40, description: 'Mid-range powerhouse' },
  { name: 'Tecno Camon 20 Pro', price: 220000, originalPrice: 260000, category: 'Phones', brand: 'Tecno', image: '📱', rating: 4.1, reviews: 120, discount: 15, sold: 100, stock: 50, description: 'Great camera phone' },
  { name: 'Tecno Spark 10 Pro', price: 150000, originalPrice: 180000, category: 'Phones', brand: 'Tecno', image: '📱', rating: 4.0, reviews: 200, discount: 17, sold: 150, stock: 60, description: 'Budget friendly smartphone' },
  { name: 'Infinix Note 30', price: 180000, originalPrice: 210000, category: 'Phones', brand: 'Infinix', image: '📱', rating: 4.2, reviews: 90, discount: 14, sold: 80, stock: 45, description: 'Big battery smartphone' },
  { name: 'Infinix Zero 30', price: 280000, originalPrice: 330000, category: 'Phones', brand: 'Infinix', image: '📱', rating: 4.3, reviews: 70, discount: 15, sold: 55, stock: 30, description: 'Premium Infinix device' },

  // COMPUTERS
  { name: 'MacBook Pro M3', price: 2800000, originalPrice: 3200000, category: 'Computers', brand: 'Apple', image: '💻', rating: 4.9, reviews: 45, discount: 13, sold: 20, stock: 8, description: 'Latest MacBook with M3 chip' },
  { name: 'MacBook Air M2', price: 1700000, originalPrice: 2000000, category: 'Computers', brand: 'Apple', image: '💻', rating: 4.8, reviews: 67, discount: 15, sold: 30, stock: 12, description: 'Lightweight powerful laptop' },
  { name: 'HP Pavilion 15', price: 550000, originalPrice: 650000, category: 'Computers', brand: 'HP', image: '💻', rating: 4.3, reviews: 89, discount: 15, sold: 45, stock: 20, description: 'Great everyday laptop' },
  { name: 'HP Spectre x360', price: 1200000, originalPrice: 1500000, category: 'Computers', brand: 'HP', image: '💻', rating: 4.5, reviews: 34, discount: 20, sold: 15, stock: 10, description: 'Premium convertible laptop' },
  { name: 'Dell XPS 15', price: 1500000, originalPrice: 1800000, category: 'Computers', brand: 'Dell', image: '💻', rating: 4.6, reviews: 56, discount: 17, sold: 25, stock: 10, description: 'Professional laptop' },
  { name: 'Dell Inspiron', price: 450000, originalPrice: 550000, category: 'Computers', brand: 'Dell', image: '💻', rating: 4.2, reviews: 78, discount: 18, sold: 50, stock: 25, description: 'Budget friendly laptop' },
  { name: 'Lenovo ThinkPad', price: 800000, originalPrice: 950000, category: 'Computers', brand: 'Lenovo', image: '💻', rating: 4.4, reviews: 67, discount: 16, sold: 35, stock: 18, description: 'Business laptop' },
  { name: 'Lenovo Legion 5', price: 1100000, originalPrice: 1300000, category: 'Computers', brand: 'Lenovo', image: '💻', rating: 4.5, reviews: 45, discount: 15, sold: 28, stock: 12, description: 'Gaming laptop' },
  { name: 'Acer Nitro 5', price: 650000, originalPrice: 780000, category: 'Computers', brand: 'Acer', image: '💻', rating: 4.3, reviews: 89, discount: 17, sold: 40, stock: 22, description: 'Affordable gaming laptop' },
  { name: 'Asus ROG Zephyrus', price: 1400000, originalPrice: 1700000, category: 'Computers', brand: 'Asus', image: '💻', rating: 4.7, reviews: 34, discount: 18, sold: 22, stock: 10, description: 'Premium gaming laptop' },

  // ELECTRONICS
  { name: 'Sony WH-1000XM5', price: 250000, originalPrice: 320000, category: 'Electronics', brand: 'Sony', image: '🎧', rating: 4.8, reviews: 234, discount: 22, sold: 120, stock: 45, description: 'Best noise cancelling headphones' },
  { name: 'AirPods Pro 2', price: 220000, originalPrice: 280000, category: 'Electronics', brand: 'Apple', image: '🎧', rating: 4.8, reviews: 345, discount: 21, sold: 200, stock: 60, description: 'Premium wireless earbuds' },
  { name: 'Samsung Galaxy Watch 6', price: 180000, originalPrice: 230000, category: 'Electronics', brand: 'Samsung', image: '⌚', rating: 4.4, reviews: 123, discount: 22, sold: 80, stock: 40, description: 'Smartwatch with health tracking' },
  { name: 'Apple Watch Series 9', price: 350000, originalPrice: 420000, category: 'Electronics', brand: 'Apple', image: '⌚', rating: 4.7, reviews: 156, discount: 17, sold: 90, stock: 35, description: 'Best smartwatch for iPhone' },
  { name: 'JBL Flip 6 Speaker', price: 85000, originalPrice: 110000, category: 'Electronics', brand: 'JBL', image: '🔊', rating: 4.3, reviews: 200, discount: 23, sold: 180, stock: 70, description: 'Portable Bluetooth speaker' },
  { name: 'Canon EOS R50', price: 550000, originalPrice: 650000, category: 'Electronics', brand: 'Canon', image: '📷', rating: 4.5, reviews: 67, discount: 15, sold: 35, stock: 15, description: 'Mirrorless camera' },

  // FASHION
  { name: 'Nike Air Max 90', price: 85000, originalPrice: 120000, category: 'Fashion', brand: 'Nike', image: '👟', rating: 4.5, reviews: 567, discount: 29, sold: 320, stock: 100, description: 'Classic sneakers' },
  { name: 'Nike Air Force 1', price: 95000, originalPrice: 130000, category: 'Fashion', brand: 'Nike', image: '👟', rating: 4.6, reviews: 489, discount: 27, sold: 280, stock: 90, description: 'Iconic white sneakers' },
  { name: 'Gucci Bag', price: 350000, originalPrice: 500000, category: 'Fashion', brand: 'Gucci', image: '👜', rating: 4.7, reviews: 89, discount: 30, sold: 45, stock: 15, description: 'Luxury designer bag' },
  { name: 'Ray-Ban Sunglasses', price: 65000, originalPrice: 85000, category: 'Fashion', brand: 'Ray-Ban', image: '🕶️', rating: 4.5, reviews: 234, discount: 24, sold: 150, stock: 80, description: 'Classic sunglasses' },

  // HOME
  { name: 'LG Refrigerator', price: 450000, originalPrice: 550000, category: 'Home', brand: 'LG', image: '🔧', rating: 4.4, reviews: 45, discount: 18, sold: 15, stock: 5, description: 'French door refrigerator' },
  { name: 'Sony 55" TV', price: 550000, originalPrice: 700000, category: 'Home', brand: 'Sony', image: '📺', rating: 4.6, reviews: 89, discount: 21, sold: 35, stock: 18, description: '4K Smart TV' },
  { name: 'Philips Air Fryer', price: 85000, originalPrice: 110000, category: 'Home', brand: 'Philips', image: '🍟', rating: 4.4, reviews: 189, discount: 23, sold: 95, stock: 45, description: 'Healthy cooking' }
];

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log(`${products.length} products seeded successfully!`);
    process.exit();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });