import db from '@/src/server/db';
import { OrderModel } from '@/src/server/model/Order';
import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

const handler = nc<NextApiRequest, NextApiResponse>();

handler.post(async (req, res) => {
  const { id } = req.body;
  await db.connect();
  const order = await OrderModel.findById(id);
  if (order && order.paymentMethod === 'cod') {
    await order.update({
      isPaid: !order.isPaid,
      paidAt: order.paidAt ? '' : new Date(),
    });
  }
  await db.disconnect();
  res.json({
    success: true,
    message: 'Payment status updated',
  });
});

export default handler;
