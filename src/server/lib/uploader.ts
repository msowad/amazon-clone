import cloudinary from 'cloudinary';
import { initCloudinary } from './cloudinary';

export const uploader = async (
  path: string,
  folder: string,
  transformation?: cloudinary.TransformationOptions,
  allowed_formats?: string[]
) => {
  initCloudinary();

  return await cloudinary.v2.uploader.upload(path, {
    folder,
    transformation,
    allowed_formats,
  });
};
