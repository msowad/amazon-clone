import db from '@/src/server/db';
import { initCloudinary } from '@/src/server/lib/cloudinary';
import { ProductModel } from '@/src/server/model/Product';
import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import cloudinary from 'cloudinary';
import { isAdmin } from '@/src/server/middleware/isAdmin';

const handler = nc<NextApiRequest, NextApiResponse>();

handler.use(isAdmin);

handler.delete(async (req, res) => {
  const { id } = req.query;
  await db.connect();
  const product = await ProductModel.findById(id);
  if (product) {
    if (product.publicId) {
      await initCloudinary();
      await cloudinary.v2.uploader.destroy(product.publicId);
    }
    await product.delete();
  }

  res.send({
    success: true,
    message: 'Product deleted successfully',
  });
});

export default handler;
