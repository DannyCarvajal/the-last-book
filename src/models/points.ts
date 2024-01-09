import mongoose, { InferSchemaType } from "mongoose";

export const pointsSchema = new mongoose.Schema({
  userId: String,
  username: String,
  points: Number,
  date: Date,
});

export type Points = InferSchemaType<typeof pointsSchema>;

export const LeaderboardModel = mongoose.models.LeaderBoard || mongoose.model("Leaderboard", pointsSchema);
export const BestGameModel = mongoose.models.BestGame || mongoose.model("BestGame", pointsSchema);
