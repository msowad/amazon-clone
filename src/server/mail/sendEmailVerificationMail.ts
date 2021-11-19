import nodemailer from 'nodemailer';
import { emailVerificationTemplate } from '@/src/server/mail/html/emailVerify';

export const sendEmailVerificationMail = async (
  email: string,
  token: string,
  userName: string
) => {
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST, // 'smtp.ethereal.email'
    port: Number(process.env.MAIL_PORT), // 587
    secure: process.env.MAIL_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.MAIL_USER, // 'u4vv7uayr5rt6w3g@ethereal.email'
      pass: process.env.MAIL_PASSWORD, // 'vFxUDYYJGHjQxVGpr4'
    },
  });

  const url = `${process.env.EMAIL_VERIFICATION_URL}/${token}`;
  const logo = `${process.env.LOGO_URL}`;
  const frontendUrl = `${process.env.FRONT_END_URL}`;

  const mailOptions = {
    from: process.env.MAIL_FROM_ADDRESS,
    to: email,
    subject: 'Verify email',
    html: emailVerificationTemplate(url, logo, frontendUrl, userName),
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
