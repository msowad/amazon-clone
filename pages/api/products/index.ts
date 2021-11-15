import { db } from '@/src/server/db';
import { ProductModel } from '@/src/server/model/Product';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await db.connect();
  const products = await ProductModel.find();
  await db.disconnect();
  res.send(products);
}
