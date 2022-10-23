import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { unstable_getServerSession } from "next-auth";
import { nextAuthOptions } from "@/src/pages/api/auth/[...nextauth]";

export const guestRoute =
  (func: GetServerSideProps) => async (ctx: GetServerSidePropsContext) => {
    const session = await unstable_getServerSession(
      ctx.req,
      ctx.res,
      nextAuthOptions
    );

    if (session) {
      return {
        redirect: {
          destination: "/",
          permanent: true,
        },
      };
    }

    return await func(ctx);
  };
