const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');

const connectDB = asyncHandler(async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
  console.log(`connected to ${conn.connection.host}`);
});

module.exports = connectDB;
