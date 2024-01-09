import { useEffect } from "react";
import { setCookie } from "@/utils/session";
import { getUserFromLocal } from "@/utils/user";

export const useSetInitCookie = () => {
  // Create a cookie if the user doesn't have one
  useEffect(() => {
    const user = getUserFromLocal();
    if (!user) return;

    const { localUserName, localUserId, cookieUsername } = user;
    if (!localUserName || !localUserId) return;

    if (!cookieUsername) {
      // Create a cookie
      setCookie("username", localUserName, 100);
      setCookie("userId", localUserId, 100);
    }
  }, []);
};
