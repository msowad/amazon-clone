import { NextApiRequest } from "next";
import { Session } from "next-auth";

export interface ExtendedReq extends NextApiRequest {
  user: Session["user"];
}
