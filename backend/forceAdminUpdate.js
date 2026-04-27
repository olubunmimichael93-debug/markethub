const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const User = require('./models/User');

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    
    const result = await User.updateOne(
      { email: 'olubunmimichael93@gmail.com' },
      { $set: { isAdmin: true } }
    );
    
    console.log('Update result:', result);
    
    const user = await User.findOne({ email: 'olubunmimichael93@gmail.com' });
    console.log('User now has isAdmin:', user.isAdmin);
    
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
