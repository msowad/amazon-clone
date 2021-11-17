import { NextApiRequest, NextApiResponse } from 'next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import { NextHandler } from 'next-connect';

export interface ExtendedReq {
  user: Session['user'];
}

export async function isAuth(
  req: NextApiRequest & ExtendedReq,
  res: NextApiResponse,
  next: NextHandler
) {
  const session = await getSession({ req });
  if (!session) {
    res.status(401).json({ error: 'Not authenticated' });
    return;
  }
  req.user = session.user;
  next();
}
