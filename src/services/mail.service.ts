import { generateRandomString } from '@common/utils/helper.utils';
import { Config } from '@config/common.config';
import Queue from 'bull';
import * as nodemailer from 'nodemailer';
import inlineBase64 from 'nodemailer-plugin-inline-base64';

export const emailQueue = new Queue('emails');
export const transporter = nodemailer.createTransport({
  service: Config.MAIL_SERVICE,
  auth: {
    user: Config.MAIL_USER,
    pass: Config.MAIL_PASSWORD,
  },
});
transporter.use('compile', inlineBase64({ cidPrefix: 'somePrefix_' }));

export const sendEmailForgotPassword = async (email: string, username: string) => {
  // send mail with defined transport object
  const newPassword = generateRandomString(6);
  await sendEmail(
    email,
    '[MiBook] Forgot Password',
    `<h1> Hello ${username} </h1>
    <p>Your new password is <b>${newPassword}</b>.</p>
    <p>Please keep it in a safe place and consider changing it after logging in.</p>
    <p>Back to <a href="http://localhost:3000/login" style="padding: 10px 20px; font-size: 16px; text-align: center; text-decoration: none; background-color: #0066cc; color: #fff; border: none; border-radius: 4px; cursor: pointer;">Login</a></p>
    `,
  );
  return newPassword;
};

export async function sendEmail(to: string, subject: string, html): Promise<void> {
  await emailQueue.add({ to, subject, html });
}
