"use client";
import { useEffect } from "react";
import { getCookie, getLocalStorageOrCookiesUser, setCookie } from "@/utils/session";
import { useUser } from "./api/useUser";

// Create a cookie if the user doesn't have one but have localStorage session
export const useSetInitCookie = () => {
  const { mutate: mutateUser } = useUser();

  useEffect(() => {
    const { username, userId } = getLocalStorageOrCookiesUser();
    if (!username || !userId) return;

    const cookieUsername = getCookie("username");

    if (!cookieUsername) {
      // Create a cookie
      setCookie("username", username, 100);
      setCookie("userId", userId, 100);
      mutateUser();
    }
  }, []);
};
