import * as dotenv from 'dotenv';

dotenv.config();

export const Config = {
  APP_PORT: Number(process.env.APP_PORT) || 3001,
  APP_HOST: String(process.env.APP_HOST),
  DATABASE_HOST: process.env.DATABASE_HOST || 'smtp.gmail.com',
  DATABASE_PORT: Number(process.env.DATABASE_PORT) || 3306,
  DATABASE_NAME: process.env.DATABASE_NAME,
  DATABASE_USERNAME: process.env.DATABASE_USERNAME,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
  CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
  CLOUDINARY_KEY: process.env.CLOUDINARY_KEY,
  CLOUDINARY_SECRET: process.env.CLOUDINARY_SECRET,
  NODE_ENV: process.env.NODE_ENV,
  LIMIT_REQUEST_BODY: process.env.LIMIT_REQUEST_BODY,
  ACCESS_TOKEN: process.env.ACCESS_TOKEN,
  REFRESH_TOKEN: process.env.REFRESH_TOKEN,
  MAIL_HOST: process.env.MAIL_HOST,
  MAIL_SERVICE: process.env.MAIL_SERVICE,
  MAIL_USER: process.env.MAIL_USER,
  MAIL_PASSWORD: process.env.MAIL_PASSWORD,
  MAIL_PORT: process.env.MAIL_PORT,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  CLIENT_URL: process.env.CLIENT_URL,
};
