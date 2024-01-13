import useSWR from "swr";
import { User } from "@/models/user";

export const useUser = () => {
  const { data, error, isLoading, mutate } = useSWR<User[]>(`/api/user`);

  const userData = data?.[0] || null;

  /* Show local save data if user have not loaded yet */
  const baseUser: User = {
    date: null,
    ip: null,
    location: {
      city: null,
      country: null,
      flag: null,
    },
    userId: null,
    username: null,
  };

  const currUser = userData ? userData : baseUser;

  return {
    ...currUser,
    user: currUser,
    error,
    isLoading,
    mutate,
  };
};
