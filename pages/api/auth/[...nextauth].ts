// @ts-nocheck
import db from '@/src/server/db';
import { UserModel } from '@/src/server/model/User';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

export default NextAuth({
  session: {
    jwt: true,
  },
  callbacks: {
    async session({ session, token }) {
      session.user = {
        id: token.sub,
        name: token.name,
        email: token.email,
        image: token.picture,
      };
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
          console.log(isValid);
          if (isValid) {
            return {
              id: user.id,
              email: user.email,
              name: user.name,
            };
          }
        }
        throw new Error('Enter valid email and password');
      },
    }),
  ],
  secret: process.env.JWT_SECRET,
  jwt: {
    secret: process.env.JWT_SECRET,
    encryption: true,
  },
});
