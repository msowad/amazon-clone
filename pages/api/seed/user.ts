import db from '@/src/server/db';
import { UserModel } from '@/src/server/model/User';
import { data } from '@/src/utils/data';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await db.connect();
  await UserModel.deleteMany();
  await UserModel.insertMany(data.users);
  await db.disconnect();
  res.send({ message: 'user seeded successfully' });
}
