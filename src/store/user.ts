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

// Create a store with zustand
import { create } from "zustand";

type State = {
  username: string;
  updateUsername: (username: string) => void;
  userId: string;
  updateUserId: (userId: string) => void;
};

export const useGetUser = create<State>((set) => ({
  username: "",
  updateUsername: (username: string) => set({ username }),
  userId: "",
  updateUserId: (userId: string) => set({ userId }),
}));
