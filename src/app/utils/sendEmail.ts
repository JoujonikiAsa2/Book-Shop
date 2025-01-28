import nodemailer from 'nodemailer'
import config from '../config';

export const sendEmail = async(email: string, resetURLlink: string) =>{
    
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: config.NODE_ENV === 'production', // true for port 465, false for other ports
    auth: {
      user: config.nodemailer_email,
      pass: config.nodemailer_password,
    },
  });

  await transporter.sendMail({
    from: 'joujonikiasaroy@gmail.com', // sender address
    to: email, // list of receivers
    subject: "Reset your password within 10 minutes", // Subject line
    text: "If you tried to change your password then click on this link otherwise ignore", // plain text body
    html: `<b>${resetURLlink}</b>`, // html body
  });

}