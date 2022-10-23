import db from "@/src/server/db";
import { ProductModel } from "@/src/server/model/Product";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await db.connect();

  let product;
  if (req.query.findById === "true") {
    product = await ProductModel.findById(req.query.slug);
  } else {
    product = await ProductModel.findOne({ slug: req.query.slug });
  }

  await db.disconnect();
  res.send(product);
}
