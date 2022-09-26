// @ts-nocheck
import { getToken } from "next-auth/jwt";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const token = await getToken({ req: req });

  if (!token) {
    return NextResponse.redirect("/auth/login");
  }

  if (!token.user.isAdmin) {
    return NextResponse.redirect("/");
  }

  return NextResponse.next();
}