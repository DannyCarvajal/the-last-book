import { Points } from "@/models/points";

export const selectLeaderboardToShow = (currLeaderboard: Points[]): Points[] => {
  const ALLOWED_ITEMS = 3;
  const MAX_ITEMS = 4;

  const differentPoints = Array.from(new Set(currLeaderboard.map(({ points }) => points)));

  const maxDifferentPoints = differentPoints.slice(0, ALLOWED_ITEMS);
  const allowedPointsFullList = currLeaderboard.filter(({ points }) => maxDifferentPoints.includes(points));
  const repeatedItems = allowedPointsFullList.length - maxDifferentPoints.length;

  const amountToSlice = repeatedItems ? Math.min(ALLOWED_ITEMS + repeatedItems, MAX_ITEMS) : ALLOWED_ITEMS;

  return allowedPointsFullList.slice(0, amountToSlice);
};
