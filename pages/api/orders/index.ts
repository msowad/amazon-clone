import db from "@/src/server/db";
import { isAdmin } from "@/src/server/middleware/isAdmin";
import { OrderModel } from "@/src/server/model/Order";
import { ExtendedReq } from "@/src/types/ExtendedReq";
import type { NextApiResponse } from "next";
import nc from "next-connect";

const handler = nc<ExtendedReq, NextApiResponse>();

handler.use(isAdmin);

handler.get(async (req, res) => {
  const page = req.query.page ? parseInt(req.query.page as string) : 1;
  const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
  const field = req.query.field ? (req.query.field as string) : "createdAt";
  const sort = req.query.sort ? (req.query.sort as string) : "desc";

  await db.connect();
  const data = await OrderModel.paginate(
    {},
    {
      page,
      limit,
      sort: { [field]: sort },
    }
  );
  await db.disconnect();

  await res.status(200).json(data);
});

export default handler;
