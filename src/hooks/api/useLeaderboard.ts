import useSWR from "swr";
import { Points } from "@/models/points";
import { selectLeaderboardToShow } from "@/utils/leaderboard";

export const useLeaderboard = () => {
  const { data, error, isLoading } = useSWR<Points[]>("/api/leaderboard");

  // By default sort by points and date
  const currLeaderboard = data
    ? data.sort(function (a, b) {
        if (a.points === b.points) {
          return a.date! > b.date! ? 1 : -1;
        }
        return a.points! < b.points! ? 1 : -1;
      })
    : [];

  const leaderboardToShow = selectLeaderboardToShow(currLeaderboard) || [];

  return {
    data,
    currLeaderboard,
    leaderboardToShow,
    error,
    isLoading,
  };
};
