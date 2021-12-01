import db from '@/src/server/db';
import { OrderModel } from '@/src/server/model/Order';
import { UserModel } from '@/src/server/model/User';
import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

const handler = nc<NextApiRequest, NextApiResponse>();

handler.get(async (req, res) => {
  await db.connect();

  const totalPrice = await OrderModel.aggregate([
    {
      $group: {
        _id: null,
        total: { $sum: '$price.total' },
      },
    },
  ]);
  const totalOrders = await OrderModel.countDocuments();
  const totalUsersPlaceOrder = await (await OrderModel.distinct('user')).length;
  const totalUsers = await UserModel.countDocuments();

  res.json({
    totalSell: totalPrice[0].total,
    totalOrders,
    totalUsersPlaceOrder,
    totalUsers,
  });
});

export default handler;
