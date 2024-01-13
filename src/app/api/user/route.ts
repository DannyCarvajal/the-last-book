import connectToDB from "@/lib/mongodb";
import { cookies } from "next/headers";
import { UserModel } from "@/models/user";

export async function GET(request: Request) {
  await connectToDB();
  try {
    const cookieStore = cookies();
    let userId;
    userId = cookieStore.get("userId")?.value;

    /* Use Admin user for local testing */
    const isTestingMode = process.env.NEXT_PUBLIC_USE_OLIVER_ADMIN_USER === "true";
    const adminUserId = process.env.OLIVER_ADMIN_USERID || "";

    if (isTestingMode && adminUserId) {
      userId = adminUserId;
    }

    const user = await UserModel.find({ userId });
    return Response.json(user);
  } catch (error) {
    console.error(error);
  }
}
