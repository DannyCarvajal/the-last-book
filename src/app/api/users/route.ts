import { mongodb } from "@/lib/mongodb";

const GET = async (id: string) => {
  console.log({ mongodb });
  await mongodb.connect();
};
