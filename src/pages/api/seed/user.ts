import db from "@/src/server/db";
import { seedDummyData } from "@/src/server/middleware/seedDummyData";
import { UserModel } from "@/src/server/model/User";
import { data } from "@/src/utils/data";
import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

const handler = nc<NextApiRequest, NextApiResponse>();

handler.use(seedDummyData);

handler.get(async (req, res) => {
  await db.connect();
  await UserModel.deleteMany();
  await UserModel.insertMany(data.users);
  await db.disconnect();
  res.send({ message: "user seeded successfully" });
});

export default handler;
