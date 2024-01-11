import useSWR from "swr";
import { Points } from "@/models/points";

export const useLeaderboard = () => {
  const { data, error, isLoading, mutate } = useSWR<Points[]>("/api/leaderboard");

  return {
    data: data || [],
    error,
    isLoading,
    mutate,
  };
};
