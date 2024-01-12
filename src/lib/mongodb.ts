import mongoose from "mongoose";

const isTestEnvironment = process.env.TEST_ENVIRONMENT === "true";
const testUri = "mongodb://127.0.0.1:27017/test";
const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;

const mongodbURI = isTestEnvironment
  ? testUri
  : `mongodb+srv://${username}:${password}@cluster0.wwvvy4s.mongodb.net/thelastbook?retryWrites=true&w=majority`;

/* @ts-expect-error */
let cached = global.mongoose;

if (!cached) {
  /* @ts-expect-error */
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDB() {
  if (cached.conn) {
    console.log("Cached mongodb is called!");
    return cached.conn;
  }

  if (!cached.promise) {
    mongoose.set("strictQuery", true);
    cached.promise = await mongoose.connect(mongodbURI);
    console.log("connected to mongoDB!");
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToDB;
