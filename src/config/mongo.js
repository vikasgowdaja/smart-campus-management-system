const mongoose = require('mongoose');

const connectMongo = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    console.warn('MongoDB logging disabled: MONGO_URI is not set.');
    return false;
  }

  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 3000
    });
    console.log('Connected to MongoDB (activity logs)');
    return true;
  } catch (error) {
    console.error('MongoDB connection failed. Logging to MongoDB is disabled.');
    console.error('Reason:', error.message || error);
    return false;
  }
};

module.exports = {
  connectMongo
};
