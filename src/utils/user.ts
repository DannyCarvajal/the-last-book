import { getCookie, getLocalStorage } from "./session";

type LocalUser = {
  localUserName?: string | null;
  localUserId?: string | null;
  cookieUsername: string | null;
  cookieUserId: string | null;
};

export const getUserFromLocal = (): false | LocalUser => {
  const localUserName = getLocalStorage("username");
  const localUserId = getLocalStorage("userId");

  const cookieUsername = getCookie("username");
  const cookieUserId = getCookie("userId");

  /* Show Session form on first time  */
  const isLogged = (!!localUserName && !!localUserId) || (!!cookieUsername && !!cookieUserId);
  return isLogged ? { localUserId, localUserName, cookieUserId, cookieUsername } : false;
};
