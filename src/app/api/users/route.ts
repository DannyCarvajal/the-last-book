import connectToDB from "@/lib/mongodb";
import { UserModel } from "@/models/user";

export async function GET(request: Request) {
  await connectToDB();
  try {
    const users = await UserModel.find({});
    return Response.json(users);
  } catch (error) {
    console.error(error);
  }
}

export async function POST(request: Request) {
  try {
    // Connect to MongoDB
    await connectToDB();

    // Create new user
    const newUser = await request.json();

    // Save new User to db
    const mongoUser = new UserModel(newUser);
    await mongoUser.save();

    return Response.json({ message: `User ${newUser.username} saved` });
  } catch (error) {
    console.error(error);
  }
}
