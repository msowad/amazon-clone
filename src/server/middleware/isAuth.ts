import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { NextHandler } from 'next-connect';
import { Session } from 'next-auth';

export async function isAuth(
  req: NextApiRequest & { user: Session['user'] },
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
