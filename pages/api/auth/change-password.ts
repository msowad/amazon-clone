import { FORGOT_PASSWORD_PREFIX } from '@/src/server/constants';
import db from '@/src/server/db';
import { UserModel } from '@/src/server/model/User';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import type { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

const handler = nc<NextApiRequest, NextApiResponse>();

handler.post(async (req, res) => {
  const { newPassword, confirmPassword, token } = req.body;
  if (newPassword === confirmPassword) {
    const encryptedToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    db.redisClient.get(
      FORGOT_PASSWORD_PREFIX + encryptedToken,
      async (err, userId) => {
        if (userId) {
          db.redisClient.del(FORGOT_PASSWORD_PREFIX + encryptedToken);
          await db.connect();
          const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            {
              password: await bcrypt.hash(newPassword, 10),
            },
            { new: true, runValidators: true }
          );
          await db.disconnect();

          res.status(200).json({
            status: 'success',
            user: { email: updatedUser.email, password: newPassword },
          });
        } else {
          res.status(400).json({ success: false, message: 'Url expired' });
        }
      }
    );
  } else {
    res.status(400).json({
      success: false,
      message: 'Passwords do not match',
    });
  }
});

export default handler;
