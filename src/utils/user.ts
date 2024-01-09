import { getCookie, getLocalStorage } from "./session";

type LocalUser = {
  localUsername?: string | null;
  localUserId?: string | null;
  cookieUsername: string | null;
  cookieUserId: string | null;
};

export const getUserFromLocal = (): false | LocalUser => {
  const localUsername = getLocalStorage("username");
  const localUserId = getLocalStorage("userId");

  const cookieUsername = getCookie("username");
  const cookieUserId = getCookie("userId");

  /* Show Session form on first time  */
  const isLogged = (!!localUsername && !!localUserId) || (!!cookieUsername && !!cookieUserId);
  return isLogged ? { localUserId, localUsername, cookieUserId, cookieUsername } : false;
};
