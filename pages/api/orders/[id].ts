import db from '@/src/server/db';
import { ExtendedReq, isAuth } from '@/src/server/middleware/isAuth';
import { OrderModel } from '@/src/server/model/Order';
import type { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

const handler = nc<NextApiRequest, NextApiResponse>();

handler.use(isAuth);

handler.get<ExtendedReq>(async (req, res) => {
  await db.connect();
  const { id } = req.query;
  const order = await OrderModel.findOne({ user: req.user.id, _id: id });
  await db.disconnect();

  await res.status(200).json(order);
});

export default handler;
