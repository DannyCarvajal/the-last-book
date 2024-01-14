import connectToDB from "@/lib/mongodb";
import { BestPointsModel, Points } from "@/models/points";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    await connectToDB();
    // Get from params the userId
    const userId = request.nextUrl.searchParams.get("userId");
    const myBest = await BestPointsModel.find({ userId });
    return Response.json(myBest);
  } catch (error) {
    console.error(error);
  }
}

export async function POST(request: Request) {
  try {
    // Connect to MongoDB
    await connectToDB();

    const { points } = (await request.json()) || ({} as number);

    const cookieStore = cookies();
    const userId = cookieStore.get("userId")?.value;
    const username = cookieStore.get("username")?.value;

    const newPoints = {
      userId,
      username,
      points,
      date: new Date(),
    };

    // Check if new value is higher than old value
    const myPrevBest = await BestPointsModel.find({ userId });
    const prevHighestValue = (myPrevBest && myPrevBest?.[0]?.points) || null;

    // First time saving
    if (prevHighestValue === null || prevHighestValue === undefined) {
      const myBest = await BestPointsModel.create(newPoints);
      await myBest.save();
      return Response.json(myBest);
    }

    // Same value
    if (prevHighestValue === newPoints.points) {
      return Response.json({ message: `You already had the same ${prevHighestValue} value as highest` });
    }

    // Old was higher
    if (prevHighestValue > newPoints.points) {
      return Response.json({ message: `You already had a higher value with ${prevHighestValue}` });
    }

    // Save new highest value
    const myBest = await BestPointsModel.findOneAndUpdate({ userId: newPoints.userId }, newPoints, { new: true });
    return Response.json(myBest);
  } catch (error) {
    console.error(error);
  }
}
