import { getCookie, getLocalStorage } from "@/utils/session";

type User = {
  username: string | null;
  userId: string | null;
};

export const getUser = (): User => {
  const localUsername = getLocalStorage("username");
  const localUserId = getLocalStorage("userId");

  const cookieUsername = getCookie("username");
  const cookieUserId = getCookie("userId");

  /* Show Session form on first time  */
  const username = cookieUsername || localUsername || null;
  const userId = cookieUserId || localUserId || null;

  return { username, userId };
};
