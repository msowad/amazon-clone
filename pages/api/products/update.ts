import db from '@/src/server/db';
import { uploader } from '@/src/server/lib/uploader';
import { ProductModel } from '@/src/server/model/Product';
import formidable from 'formidable';
import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import slugify from 'slugify';
import cloudinary from 'cloudinary';

const handler = nc<NextApiRequest, NextApiResponse>();

interface FieldType {
  name: string;
  description: string;
  price: number;
  category: string;
  countInStock: number;
  brand: string;
  id: string;
}

handler.post(async (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, async function (err, fields, files) {
    const {
      name,
      description,
      price,
      category,
      brand,
      countInStock,
      id,
    }: FieldType = fields as any;

    if (
      !name ||
      !price ||
      !description ||
      !countInStock ||
      !category ||
      !brand ||
      !id
    ) {
      res.status(400).json({
        success: false,
        message: 'Missing required fields',
      });
    } else {
      try {
        const product = await ProductModel.findById(id);
        let result = null;
        const updateArr = {
          name,
          price,
          description,
          countInStock,
          category,
          brand,
          slug: slugify(name as string),
        };

        if (files.image) {
          if (product && product.publicId) {
            await cloudinary.v2.uploader.destroy(product.publicId);
          }

          result = await uploader(
            (files.image as any).filepath,
            'next-e-commerce/products',
            [
              { width: 350, height: 300, crop: 'limit' },
              { quality: 'auto' },
              { fetch_format: 'auto' },
            ],
            ['jpg', 'png', 'jpeg']
          );
        }

        await db.connect();
        await product?.update(
          result
            ? {
                ...updateArr,
                image: result.secure_url,
                publicId: result.public_id,
              }
            : updateArr
        );
        await db.disconnect();

        res.json({
          success: true,
          message: 'Product updated successfully',
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
