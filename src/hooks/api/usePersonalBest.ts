import useSWR from "swr";
import { Points } from "@/models/points";
import { useUser } from "./useUser";

export const usePersonalBest = () => {
  const { userId } = useUser();
  const { data, error, isLoading, mutate } = useSWR<Points[]>(userId ? `/api/bestPoints?userId=${userId}` : null);

  const personalBest = data?.[0]?.points;

  return {
    data,
    personalBest,
    error,
    isLoading,
    mutate,
  };
};
