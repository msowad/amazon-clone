import db from '@/src/server/db';
import { seedDummyData } from '@/src/server/middleware/seedDummyData';
import { ProductModel } from '@/src/server/model/Product';
import { data } from '@/src/utils/data';
import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

const handler = nc<NextApiRequest, NextApiResponse>();

handler.use(seedDummyData);

handler.get(async (req, res) => {
  await db.connect();
  await ProductModel.deleteMany();
  await ProductModel.insertMany(data.products);
  await db.disconnect();
  res.send({ message: 'product seeded successfully' });
});

export default handler;
