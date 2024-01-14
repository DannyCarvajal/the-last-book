import useSWR from "swr";
import { User } from "@/models/user";
import { useEffect, useState } from "react";
import { getLocalStorageOrCookiesUser } from "@/utils/session";

export const useUser = () => {
  const { data, error, isLoading, mutate } = useSWR<User[]>(`/api/user`);
  const [localUser, setLocalUser] = useState<User | null>({ username: null, userId: null });

  const userData = data?.[0] || null;

  /* Get fast user from localStorage */
  useEffect(() => {
    const localUser = getLocalStorageOrCookiesUser();
    setLocalUser(localUser);
  }, []);

  /* Show local save data if user have not loaded yet */
  const baseUser: User = {
    date: null,
    ip: null,
    location: {
      city: null,
      country: null,
      flag: null,
    },
    ...localUser,
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
