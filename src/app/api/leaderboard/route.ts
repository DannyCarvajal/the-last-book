import connectToDB from "@/lib/mongodb";
import { LeaderboardModel, Points } from "@/models/points";

export async function GET(request: Request) {
  await connectToDB();
  try {
    const leaderboard = await LeaderboardModel.find({});
    return Response.json(leaderboard);
  } catch (error) {
    console.error(error);
  }
}

export async function POST(request: Request) {
  try {
    // Connect to MongoDB
    await connectToDB();

    // Create new user
    const newPoints: Points = await request.json();

    // Create date if is not created
    if (!newPoints.date) {
      newPoints.date = new Date();
    }

    console.log({ newPoints });

    // Save new User to db
    const mongoUser = new LeaderboardModel(newPoints);
    await mongoUser.save();

    return Response.json({ message: `${newPoints.points} Points saved to leaderboard for ${newPoints.username}` });
  } catch (error) {
    console.error(error);
  }
}
