import { ExtendedReq } from '@/src/types/ExtendedReq';
import { NextApiResponse } from 'next';
import { NextHandler } from 'next-connect';

export const seedDummyData = (
  req: ExtendedReq,
  res: NextApiResponse,
  next: NextHandler
) => {
  if (process.env.NODE_ENV === 'production') {
    if (!process.env.SEED_DUMMY_DATA) {
      return next({ status: 404, message: 'Not Found' });
    }
  }
  next();
};
