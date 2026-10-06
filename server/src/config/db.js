const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    let mongoURI = process.env.MONGODB_URI ? process.env.MONGODB_URI.trim() : '';

    // Strip accidental surrounding quotes if pasted into dashboard with quotes
    if (
      (mongoURI.startsWith('"') && mongoURI.endsWith('"')) ||
      (mongoURI.startsWith("'") && mongoURI.endsWith("'"))
    ) {
      mongoURI = mongoURI.slice(1, -1).trim();
    }

    if (!mongoURI) {
      console.error('CRITICAL: MONGODB_URI is not defined in environment variables.');
      process.exit(1);
    }

    const conn = await mongoose.connect(mongoURI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
