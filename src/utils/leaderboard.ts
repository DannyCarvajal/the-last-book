import { Points } from "@/models/points";

type Params = {
  currLeaderboard: Points[];
  newPoints: number;
};
export const shouldAddToLeaderboard = ({ currLeaderboard, newPoints }: Params): boolean => {
  return true;
};

export const selectLeaderboardToShow = (currLeaderboard: Points[]): Points[] => {
  const ALLOWED_ITEMS = 5;
  const MAX_ITEMS = 7;

  const differentPoints = Array.from(new Set(currLeaderboard.map(({ points }) => points)));

  const maxDifferentPoints = differentPoints.slice(0, ALLOWED_ITEMS);
  const allowedPointsFullList = currLeaderboard.filter(({ points }) => maxDifferentPoints.includes(points));
  const repeatedItems = allowedPointsFullList.length - maxDifferentPoints.length;

  const amountToSlice = repeatedItems ? Math.min(ALLOWED_ITEMS + repeatedItems, MAX_ITEMS) : ALLOWED_ITEMS;

  return allowedPointsFullList.slice(0, amountToSlice);
};
