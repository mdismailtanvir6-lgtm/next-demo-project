// lib/mongodb.js
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("❌ Please define MONGODB_URI in .env.local");
}

// global cache (Next.js hot reload fix)
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
  };
}

async function connectDB(dbName = 'data') {
  // ✅ already connected
  if (cached.conn) {
    return cached.conn;
  }

  // ✅ if no connection is in progress
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false, // Disable buffering to prevent hanging
      dbName,
    });
  }

  try {
    // ✅ wait for connection (important)
    cached.conn = await cached.promise;
    console.log("✅ MongoDB Connected");
  } catch (error) {
    cached.promise = null; // retry possible
    console.log("❌ MongoDB Error:", error);
    throw error;
  }

  return cached.conn;
}

export default connectDB;
