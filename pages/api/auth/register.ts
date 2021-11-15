import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { UserModel } from '@/src/server/model/User';
import db from '@/src/server/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({
      success: false,
      message: 'Please enter all fields',
    });
  } else {
    await db.connect();
    if (await UserModel.findOne({ email })) {
      await db.disconnect();
      res.status(400).json({
        success: false,
        message: 'Email already exists',
        field: 'email',
      });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await UserModel.create({
        name,
        email,
        password: hashedPassword,
      });
      await db.disconnect();
      res.status(201).json({
        success: true,
        data: user,
      });
    }
  }

  res.status(200).json({ name: 'John Doe' });
}
