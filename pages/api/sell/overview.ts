import db from '@/src/server/db';
import { isAdmin } from '@/src/server/middleware/isAdmin';
import { OrderModel } from '@/src/server/model/Order';
import { UserModel } from '@/src/server/model/User';
import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

const handler = nc<NextApiRequest, NextApiResponse>();

handler.use(isAdmin);

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
    totalSell: totalPrice[0]?.total || 0,
    totalOrders,
    totalUsersPlaceOrder,
    totalUsers,
  });
});

export default handler;
