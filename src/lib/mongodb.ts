import { MongoClient, ServerApiVersion } from "mongodb";

const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;
export const mongodbURI = `mongodb+srv://${username}:<${password}>@biblebooksrating.qqypsvq.mongodb.net/?retryWrites=true&w=majority`;
console.log({ mongodbURI });

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
export const mongodb = new MongoClient(mongodbURI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
