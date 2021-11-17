import db from '@/src/server/db';
import { ExtendedReq, isAuth } from '@/src/server/middleware/isAuth';
import { OrderModel } from '@/src/server/model/Order';
import type { NextApiResponse } from 'next';
import nc from 'next-connect';

const handler = nc<ExtendedReq, NextApiResponse>();

handler.use(isAuth);

handler.get(async (req, res) => {
  await db.connect();
  const orders = await OrderModel.find({ user: req.user.id }).sort({
    createdAt: -1,
  });
  await db.disconnect();

  await res.status(200).json(orders);
});

export default handler;
