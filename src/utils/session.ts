export function setCookie(cName: string, cValue: string | number, expDays: number) {
  let date = new Date();
  if (typeof document === "undefined") return "";

  date.setTime(date.getTime() + expDays * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = cName + "=" + cValue + "; " + expires + "; path=/";
}

export const getCookie = (cName: string) => {
  const name = cName + "=";
  if (typeof document === "undefined") return "";
  const cArr = document.cookie.split(";");
  for (let i = 0; i < cArr.length; i++) {
    let c = cArr[i].trim();
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};

const getLocalStorage = (key: string) => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(key);
  }
};

export const getLocalStorageOrCookiesUser = (): { username: string | null; userId: string | null } => {
  const localUsername = getLocalStorage("username");
  const localUserId = getLocalStorage("userId");

  const cookieUsername = getCookie("username");
  const cookieUserId = getCookie("userId");

  /* Show Session form on first time  */
  const username = cookieUsername || localUsername || null;
  const userId = cookieUserId || localUserId || null;

  return { username, userId };
};
