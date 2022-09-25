import db from "@/src/server/db";
import { uploader } from "@/src/server/lib/uploader";
import { isAdmin } from "@/src/server/middleware/isAdmin";
import { ProductModel } from "@/src/server/model/Product";
import formidable from "formidable";
import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import slugify from "slugify";

const handler = nc<NextApiRequest, NextApiResponse>();

handler.use(isAdmin);

handler.post(async (req, res) => {
  const form = new formidable.IncomingForm();
  await form.parse(req, async function (err, fields, files) {
    const { name, description, price, category, countInStock, brand } = fields;
    if (
      !name ||
      !price ||
      !description ||
      !countInStock ||
      !category ||
      !brand ||
      !files.image
    ) {
      res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    } else {
      try {
        const result = await uploader(
          (files.image as any).filepath,
          "next-e-commerce/products",
          [
            { width: 350, height: 300, crop: "limit" },
            { quality: "auto" },
            { fetch_format: "auto" },
          ],
          ["jpg", "png", "jpeg"]
        );

        await db.connect();
        await ProductModel.create({
          name,
          price,
          description,
          countInStock,
          category,
          brand,
          image: result.secure_url,
          publicId: result.public_id,
          slug: slugify(name as string),
        });
        await db.disconnect();

        res.status(201).json({
          success: true,
          message: "Product created successfully",
        });
      } catch (err: any) {
        res.status(500).json({
          success: false,
          message: err.message,
        });
      }
    }
  });
});

export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};
