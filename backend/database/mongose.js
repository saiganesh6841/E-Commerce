
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // console.log(process.env.HELL)
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
        dbName: "E-com",
      })
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    // process.exit(1);
  }
};

module.exports = connectDB;
