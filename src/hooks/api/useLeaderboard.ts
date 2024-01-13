import useSWR from "swr";
import { Points } from "@/models/points";
import { selectLeaderboardToShow } from "@/utils/leaderboard";

export const useLeaderboard = () => {
  const { data, error, isLoading, mutate } = useSWR<Points[]>("/api/leaderboard");
  // Get the proper amount of results
  const leaderboardToShow = data ? selectLeaderboardToShow([...data]) || [] : [];

  return {
    data: leaderboardToShow,
    fullLeaderboard: data || [],
    error,
    isLoading,
    mutate,
  };
};
