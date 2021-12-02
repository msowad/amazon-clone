import db from '@/src/server/db';
import { ExtendedReq, isAuth } from '@/src/server/middleware/isAuth';
import { OrderModel } from '@/src/server/model/Order';
import { Order } from '@/src/types/Order';
import { FilterQuery } from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

const handler = nc<ExtendedReq & NextApiRequest, NextApiResponse>();

handler.use(isAuth);

handler.get(async (req, res) => {
  const page = req.query.page ? parseInt(req.query.page as string) : 1;
  const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
  const field = req.query.field ? (req.query.field as string) : 'createdAt';
  const sort = req.query.sort ? (req.query.sort as string) : 'desc';

  await db.connect();
  const data = await OrderModel.paginate(
    {
      user: req.user.id,
    },
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
