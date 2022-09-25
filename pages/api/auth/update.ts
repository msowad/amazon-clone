import db from "@/src/server/db";
import { secureAuth } from "@/src/server/middleware/secureAuth";
import { UserModel } from "@/src/server/model/User";
import { ExtendedReq } from "@/src/types/ExtendedReq";
import bcrypt from "bcryptjs";
import type { NextApiResponse } from "next";
import nc from "next-connect";

const handler = nc<ExtendedReq, NextApiResponse>();

handler.use(secureAuth);

handler.post(async (req, res) => {
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
            .json({ name: updatedUser?.name, email: updatedUser?.email });
        } else {
          await db.disconnect();
          res.status(400).json({
            success: false,
            message: "Password is incorrect",
            field: "password",
          });
        }
      } else {
        await db.disconnect();
        res.status(400).json({ message: "User not found" });
      }
    } else {
      res.status(400).json({ message: "password not match" });
    }
  } else {
    res.status(400).send({ message: "All fields are required." });
  }
});

export default handler;
