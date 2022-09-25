// @ts-nocheck
import db from "@/src/server/db";
import { UserModel } from "@/src/server/model/User";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export default NextAuth({
  session: {
    jwt: true,
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user);
      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user;
      return session;
    },
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const { email, password } = credentials;
        await db.connect();
        const user = await UserModel.findOne({ email });
        if (user) {
          const isValid = await bcrypt.compare(password, user.password);
          if (isValid) {
            return {
              id: user.id,
              email: user.email,
              name: user.name,
              isAdmin: user.isAdmin,
            };
          }
        }
        throw new Error("Enter valid email and password");
      },
    }),
  ],
  secret: process.env.JWT_SECRET,
  jwt: {
    secret: process.env.JWT_SECRET,
    encryption: true,
  },
  pages: {
    signin: "/auth/login",
    signup: "/auth/register",
  },
});
