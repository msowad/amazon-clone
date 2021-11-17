import db from '@/src/server/db';
import { ExtendedReq, isAuth } from '@/src/server/middleware/isAuth';
import { UserModel } from '@/src/server/model/User';
import bcrypt from 'bcryptjs';
import type { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

const handler = nc<NextApiRequest, NextApiResponse>();

handler.use(isAuth);

handler.post<ExtendedReq>(async (req, res) => {
  const { name, email, password, newPassword, confirmPassword } = req.body;
  if (name && password && confirmPassword && newPassword) {
    if (newPassword === confirmPassword) {
      await db.connect();
      const user = await UserModel.findOne({ _id: req.user.id, email });
      if (user) {
        if (await bcrypt.compare(password, user.password)) {
          const updatedUser = await UserModel.findByIdAndUpdate(
            req.user.id,
            {
              name,
              password: await bcrypt.hash(newPassword, 10),
            },
            { new: true, runValidators: true }
          );
          await db.disconnect();

          res
            .status(200)
            .json({ name: updatedUser.name, email: updatedUser.email });
        } else {
          await db.disconnect();
          res.status(400).json({
            success: false,
            message: 'Password is incorrect',
            field: 'password',
          });
        }
      } else {
        await db.disconnect();
        res.status(400).json({ message: 'User not found' });
      }
    } else {
      res.status(400).json({ message: 'password not match' });
    }
  } else {
    res.status(400).send({ message: 'All fields are required.' });
  }
});

export default handler;
