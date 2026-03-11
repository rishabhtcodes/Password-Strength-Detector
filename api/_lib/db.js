const mongoose = require("mongoose");

let cachedConnection = null;

async function connectDB() {
  if (cachedConnection && cachedConnection.readyState === 1) {
    return cachedConnection;
  }

  const conn = await mongoose.connect(process.env.MONGO_URI);
  cachedConnection = conn.connection;
  return cachedConnection;
}

module.exports = { connectDB };
