import mongoose, { InferSchemaType } from "mongoose";

const userSchema = new mongoose.Schema({
  userId: String,
  username: String,
  location: {
    flag: String,
    country: String,
    city: String,
  },
  ip: String,
  date: Date,
});

export type User = InferSchemaType<typeof userSchema>;
export const UserModel = mongoose.models.User || mongoose.model("User", userSchema);
