import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token, req }) => {
      const pathname = req.nextUrl.pathname;
      const user = token?.user as any;

      if (pathname.includes("/dashboard") && !user?.isAdmin) {
        return false;
      }
      if (!token && pathname.includes("/orders")) {
        return false;
      }
      return true;
    },
  },
});
