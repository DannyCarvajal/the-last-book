"use client";
import { useEffect } from "react";
import { getCookie, setCookie } from "@/utils/session";
import { getUser, useGetUser } from "@/store/user";

// Create a cookie if the user doesn't have one but have localStorage session
export const useSetInitCookie = () => {
  const { updateUserId, updateUsername } = useGetUser();
  useEffect(() => {
    const { username, userId } = getUser();
    if (!username || !userId) return;

    const cookieUsername = getCookie("username");

    if (!cookieUsername) {
      // Create a cookie
      setCookie("username", username, 100);
      setCookie("userId", userId, 100);
    }

    updateUserId(userId);
    updateUsername(username);
  }, []);
};
