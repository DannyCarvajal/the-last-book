import { useEffect } from "react";
import { setCookie } from "@/utils/session";
import { getUserFromLocal } from "@/utils/user";

export const useSetInitCookie = () => {
  // Create a cookie if the user doesn't have one
  useEffect(() => {
    const user = getUserFromLocal();
    if (!user) return;

    const { localUsername, localUserId, cookieUsername } = user;
    if (!localUsername || !localUserId) return;

    if (!cookieUsername) {
      // Create a cookie
      setCookie("username", localUsername, 100);
      setCookie("userId", localUserId, 100);
    }
  }, []);
};
