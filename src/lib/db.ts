import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
  throw new Error(
    "Please define the MONGODB_URL environment variable inside .env"
  );
}
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { connection: null, promise: null };
}

export const connectToDatabase = async () => {
  if (cached.connection) {
    return cached.connection;
  }
  if (!cached.promise) {
    mongoose.connect(MONGODB_URL, {}).then(() => mongoose.connection);
  }
  try {
    cached.connection = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }
  return cached.connection;
};
