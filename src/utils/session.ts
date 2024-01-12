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

export const setLocalStorage = (key: string, value: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, value);
  }
};

export const getLocalStorage = (key: string) => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(key);
  }
};
