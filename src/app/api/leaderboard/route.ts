import connectToDB from "@/lib/mongodb";
import { BestPointsModel, Points } from "@/models/points";

export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = false;
export const fetchCache = "force-no-store";
export const runtime = "nodejs";
export const preferredRegion = "auto";

export async function GET(request: Request) {
  await connectToDB();
  try {
    const leaderboard: Points[] = await BestPointsModel.find({});

    // Sort by points and recent date
    const sortedLeaderboards = leaderboard
      ? leaderboard.sort(function (a, b) {
          if (a.points === b.points) {
            return a.date > b.date ? 1 : -1;
          }
          return a.points < b.points ? 1 : -1;
        })
      : [];

    return Response.json(sortedLeaderboards);
  } catch (error) {
    console.error(error);
  }
}
