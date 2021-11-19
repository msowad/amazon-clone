import type { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import crypto from 'crypto';
import db from '@/src/server/db';
import { EMAIL_VERIFICATION_PREFIX } from '@/src/server/constants';
import { UserModel } from '@/src/server/model/User';

const handler = nc<NextApiRequest, NextApiResponse>();

handler.post(async (req, res) => {
  const { token } = req.body;
  const encryptedToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');

  db.redisClient.get(
    EMAIL_VERIFICATION_PREFIX + encryptedToken,
    async (err, userId) => {
      if (userId) {
        await db.connect();
        await UserModel.findByIdAndUpdate(userId, {
          emailVerified: true,
          emailVerifiedAt: new Date().toISOString(),
        });
        await db.disconnect();
        res.status(200).json({
          success: true,
          message: 'Email verified successfully',
        });
      } else {
        res.status(400).json({ success: false, message: 'Url expired' });
      }
    }
  );
});

export default handler;
