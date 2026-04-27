const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Product = require('./models/Product');

// Add multiple images for each product category
const updateMultipleImages = async () => {
  const products = await Product.find();
  
  for (const product of products) {
    const category = product.category;
    const baseImage = product.image;
    
    let images = [baseImage];
    
    // Add different angle images based on category
    if (category === 'Phones') {
      images = [
        baseImage,
        baseImage.replace('w=400', 'w=400&angle=front'),
        baseImage.replace('w=400', 'w=400&angle=back'),
        baseImage.replace('w=400', 'w=400&angle=side')
      ];
    } else if (category === 'Computers') {
      images = [
        baseImage,
        baseImage.replace('w=400', 'w=400&view=open'),
        baseImage.replace('w=400', 'w=400&view=closed'),
        baseImage.replace('w=400', 'w=400&view=keyboard')
      ];
    } else if (category === 'Fashion') {
      images = [
        baseImage,
        baseImage.replace('w=400', 'w=400&color=black'),
        baseImage.replace('w=400', 'w=400&color=white'),
        baseImage.replace('w=400', 'w=400&detail')
      ];
    } else {
      images = [
        baseImage,
        baseImage.replace('w=400', 'w=400&view=2'),
        baseImage.replace('w=400', 'w=400&view=3'),
        baseImage.replace('w=400', 'w=400&view=4')
      ];
    }
    
    await Product.updateOne(
      { _id: product._id },
      { $set: { images: images } }
    );
    
    console.log(`✅ Updated ${product.name} with ${images.length} images`);
  }
  
  console.log('🎉 All products updated with multiple images!');
  process.exit(0);
};

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    await updateMultipleImages();
  })
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
