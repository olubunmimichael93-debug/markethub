const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const User = require('./models/User');

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    
    const user = await User.findOne({ email: 'olubunmimichael93@gmail.com' });
    if (!user) {
      console.log('User not found!');
      process.exit(1);
    }
    
    console.log('Before update:', { name: user.name, isAdmin: user.isAdmin });
    
    // Add isAdmin field
    user.isAdmin = true;
    await user.save();
    
    const updatedUser = await User.findOne({ email: 'olubunmimichael93@gmail.com' });
    console.log('After update:', { name: updatedUser.name, isAdmin: updatedUser.isAdmin });
    console.log('✅ You are now an admin!');
    
    process.exit(0);
  })
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
