import useSWR from "swr";
import { Points } from "@/models/points";
import { getUser } from "@/store/user";

export const usePersonalBest = () => {
  const { userId } = getUser();
  const { data, error, isLoading } = useSWR<Points[]>(`/api/bestPoints?userId=${userId}`);

  const personalBest = data?.[0]?.points;

  return {
    data,
    personalBest,
    error,
    isLoading,
  };
};
