import db from '@/src/server/db';
import { isAdmin } from '@/src/server/middleware/isAdmin';
import { OrderModel } from '@/src/server/model/Order';
import type { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

const handler = nc<NextApiRequest, NextApiResponse>();

handler.use(isAdmin);

handler.get(async (req, res) => {
  await db.connect();
  const { id } = req.query;
  const order = await OrderModel.findById(id);
  await db.disconnect();

  await res.status(200).json(order);
});

export default handler;
