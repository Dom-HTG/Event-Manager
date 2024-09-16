const mongoose = require('mongoose');

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

const connectToMongoDB = async () => {
    await mongoose.connect(process.env.DB_URL, clientOptions)
    .then(() => {
      console.log('database connection established');
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB:', error);
    })
    .finally(await mongoose.disconnect());
  
}

module.exports = {
    connectToMongoDB
};