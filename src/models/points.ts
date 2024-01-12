import { NonNullableFields } from "@/types/utility";
import mongoose, { InferSchemaType } from "mongoose";

export const pointsSchema = new mongoose.Schema({
  userId: String,
  username: String,
  points: Number,
  date: Date,
});

export type Points = NonNullableFields<Required<InferSchemaType<typeof pointsSchema>>>;

export const BestPointsModel = mongoose.models.BestPoints || mongoose.model("BestPoints", pointsSchema);
