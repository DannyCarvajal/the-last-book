import { Points } from "@/models/points";

type Params = {
  currLeaderboard: Points[];
  newPoints: number;
};
export const shouldAddToLeaderboard = ({ currLeaderboard, newPoints }): boolean => {};
