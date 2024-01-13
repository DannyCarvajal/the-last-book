import { Points } from "@/models/points";

export const updateLeaderboard = async ({
  username,
  userId,
  points,
}: Pick<Points, "points" | "userId" | "username">) => {
  try {
    const request = await fetch("/api/leaderboard", {
      method: "POST",
      body: JSON.stringify({ username, userId, points }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response = await request.json();
    return response.ok;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const updatePersonalBest = async ({
  username,
  userId,
  points,
}: Pick<Points, "points" | "userId" | "username">) => {
  try {
    const request = await fetch("/api/bestPoints", {
      method: "POST",
      body: JSON.stringify({ username, userId, points }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response = await request.json();
    return request.ok;
  } catch (error) {
    console.error(error);
    return false;
  }
};
