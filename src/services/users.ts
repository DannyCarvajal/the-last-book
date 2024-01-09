import { type FormValues } from "@/components/NameDialog";
import { type User } from "@/models/user";

import { parseName } from "@/utils/parsing";
import { setCookie } from "@/utils/session";

import { getLocationData } from "@/services/location";

export const storeUser = async ({ name }: FormValues) => {
  try {
    const parsedName = parseName(name);
    const randomUserId = crypto.randomUUID();

    // Local save your 'simulated' user data
    setCookie("username", name, 100);
    localStorage.setItem("username", name);

    setCookie("userId", randomUserId, 100);
    localStorage.setItem("userId", randomUserId);

    // Get location data from public IP address
    const location = await getLocationData();

    const newUser = {
      userId: randomUserId,
      username: parsedName,
      ...location,
      date: new Date(),
    };

    console.log({ newUser });

    const res = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify(newUser),
    });

    return res.ok;
  } catch (error) {
    console.error(error);
  }
};

/**
 * Check if an username is already used by another user.
 */
export const usernameAlreadyUsed = async (username: string): Promise<boolean> => {
  const parsedUsername = parseName(username);
  const activeUsers = await fetch("/api/users");
  const users: User[] = await activeUsers.json();

  const alreadyCreatedUsername = users.find((user) => user.username === parsedUsername);
  return !!alreadyCreatedUsername;
};
