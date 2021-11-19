import nodemailer from 'nodemailer';
import { forgotPasswordTemplate } from './html/forgotPassword';

export const sendForgotPasswordMail = async (email: string, token: string) => {
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST, // 'smtp.ethereal.email'
    port: Number(process.env.MAIL_PORT), // 587
    secure: process.env.MAIL_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.MAIL_USER, // 'u4vv7uayr5rt6w3g@ethereal.email'
      pass: process.env.MAIL_PASSWORD, // 'vFxUDYYJGHjQxVGpr4'
    },
  });

  const url = `${process.env.PASSWORD_RESET_URL}/${token}`;
  const logo = `${process.env.LOGO_URL}`;
  const frontendUrl = `${process.env.FRONT_END_URL}`;

  const mailOptions = {
    from: '"Amazon Clone" amazon-clone@demo.com',
    to: email,
    subject: 'Reset Password',
    html: forgotPasswordTemplate(url, logo, frontendUrl),
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Email sent: ' + info.response);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }
  });
};
