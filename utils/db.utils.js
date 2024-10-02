const mongoose = require('mongoose');

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, clientOptions);
    console.log('database connection established');

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

module.exports = {
    connectToMongoDB
};