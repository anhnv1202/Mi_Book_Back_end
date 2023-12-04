import { v2 as cloudinary } from 'cloudinary';
import { Config } from './common.config';

cloudinary.config({
  cloud_name: Config.CLOUDINARY_NAME,
  api_key: Config.CLOUDINARY_KEY,
  api_secret: Config.CLOUDINARY_SECRET,
});

export default cloudinary;
