import mongoose from "mongoose";

const pointsSchema = new mongoose.Schema({
  id: String,
  username: String,
  points: Number,
  date: Date,
  ip: String,
});

module.exports = mongoose.model("points", pointsSchema);
