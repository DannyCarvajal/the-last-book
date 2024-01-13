import mongoose from "mongoose";

const isTestEnvironment = process.env.TEST_ENVIRONMENT === "true";
const isTestingAdmin = process.env.NEXT_PUBLIC_USE_OLIVER_ADMIN_USER === "true";
const testUri = "mongodb://127.0.0.1:27017/test";
const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;

const mongodbURI = isTestEnvironment
  ? testUri
  : `mongodb+srv://${username}:${password}@cluster0.wwvvy4s.mongodb.net/thelastbook?retryWrites=true&w=majority`;

if (isTestEnvironment || isTestingAdmin) {
  console.log({ mongodbURI });
}

/* @ts-expect-error */
let cached = global.mongoose;

if (!cached) {
  /* @ts-expect-error */
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    mongoose.set("strictQuery", true);
    cached.promise = await mongoose.connect(mongodbURI);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToDB;
