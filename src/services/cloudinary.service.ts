// cloudinaryService.ts
import { HTTP_CODE } from '@common/constants/global.const';
import cloudinaryConfig from '@config/cloudinary.config';
import { AppError } from '@models';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config(cloudinaryConfig);

const uploadProductImageToCloudinary = async (imagePath: string, folder: string): Promise<string> => {
  const result = await cloudinary.uploader.upload(imagePath, {
    folder: folder,
  });

  return result.secure_url;
};

const deleteImageFromCloudinary = async (publicUrl: string): Promise<{ message: string }> => {
  const publicId = getPublicIdFromUrl(publicUrl);

  if (!publicId) {
    throw new AppError('Invalid public URL', HTTP_CODE.BadRequest);
  }

  const deletionResult = await cloudinary.uploader.destroy(publicId);
  if (deletionResult.result === 'ok') {
    return { message: 'Image deleted successfully' };
  } else {
    throw new AppError('Failed to delete image from Cloudinary', HTTP_CODE.BadRequest);
  }
};

const getPublicIdFromUrl = (publicUrl: string): string | null => {
  const parts = publicUrl.split('/');
  const filename = parts[parts.length - 1];

  const filenameParts = filename.split('.');
  if (filenameParts.length === 2) {
    return filenameParts[0];
  }

  return null;
};

export default {
  uploadProductImageToCloudinary,
  deleteImageFromCloudinary,
};
