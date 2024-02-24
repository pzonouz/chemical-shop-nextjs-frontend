import nodemailer from "nodemailer";

export const Mailer = nodemailer.createTransport({
  host: "smtp.gmail.com", // Replace with your SMTP server
  port: 587,
  secure: false, // Adjust based on your server's requirements
  auth: {
    user: process.env.NODE_MAILER_GMAIL_USERNAME,
    pass: process.env.NODE_MAILER_GMAIL_PASSWORD,
  },
});
