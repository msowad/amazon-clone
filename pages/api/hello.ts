import { db } from '@/src/utils/db';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await db.connect();
  await db.disconnect();
  res.status(200).json({ name: 'John Doe' });
}
