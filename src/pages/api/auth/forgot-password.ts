import { FORGOT_PASSWORD_PREFIX } from "@/src/server/constants";
import db from "@/src/server/db";
import { sendForgotPasswordMail } from "@/src/server/mail/sendForgotPasswordMail";
import { UserModel } from "@/src/server/model/User";
import crypto from "crypto";
import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

const handler = nc<NextApiRequest, NextApiResponse>();

handler.post(async (req, res) => {
  const { email } = req.body;
  if (email) {
    await db.connect();
    const user = await UserModel.findOne({ email });
    await db.disconnect();
    if (user) {
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
            FORGOT_PASSWORD_PREFIX + encryptedToken,
            user.id,
            "EX",
            20 * 60
          ); // 20 minutes
          await sendForgotPasswordMail(user.email, token);
        }
      });
    }
    res.json({
      success: true,
      message: "Email sent",
    });
  } else {
    res.status(400).json({
      success: false,
      message: "Email is required",
    });
  }
});

export default handler;
