import db from '@/src/server/db';
import { ProductModel } from '@/src/server/model/Product';
import { data } from '@/src/utils/data';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await db.connect();
  await ProductModel.deleteMany();
  await ProductModel.insertMany(data.products);
  await db.disconnect();
  res.send({ message: 'product seeded successfully' });
}
