import useSWR from "swr";
import { User } from "@/models/user";

export const useUsers = () => {
  const { data, error, isLoading, mutate } = useSWR<User[]>(`/api/users`);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
