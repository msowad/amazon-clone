import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { UserModel } from "@/src/server/model/User";
import db from "@/src/server/db";
import crypto from "crypto";
import { EMAIL_VERIFICATION_PREFIX } from "@/src/server/constants";
import { sendEmailVerificationMail } from "@/src/server/mail/sendEmailVerificationMail";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({
      success: false,
      message: "Please enter all fields",
    });
  } else {
    await db.connect();
    if (await UserModel.findOne({ email })) {
      await db.disconnect();
      res.status(400).json({
        success: false,
        message: "Email already exists",
        field: "email",
      });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await UserModel.create({
        name,
        email,
        password: hashedPassword,
      });
      await db.disconnect();

      crypto.randomBytes(32, async (err, buffer) => {
        if (err) {
          res.status(500).json({ error: err.message });
        } else {
          const token = buffer.toString("hex");
          const encryptedToken = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");

          await db.redisClient.set(
            EMAIL_VERIFICATION_PREFIX + encryptedToken,
            user.id,
            "EX",
            20 * 60
          ); // 20 minutes

          await sendEmailVerificationMail(user.email, token, user.name);
        }
      });

      res.status(201).json({
        success: true,
        data: user,
      });
      return;
    }
  }

  res.status(200).json({ name: "John Doe" });
}
