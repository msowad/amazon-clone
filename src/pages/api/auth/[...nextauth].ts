import db from "@/src/server/db";
import { UserModel } from "@/src/server/model/User";
import NextAuth, { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import nextAuth from "next-auth";

export const nextAuthOptions: NextAuthOptions = {
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user);
      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user as any;
      return session;
    },
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("Enter valid email and password");
        }
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
  session: {
    strategy: "jwt",
  },
  jwt: {
    maxAge: 15 * 24 * 30 * 60,
  },
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/register",
  },
};

export default NextAuth(nextAuthOptions);
