import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER || "sheeaditya12@gmail.com",
    pass: process.env.EMAIL_PASS || "ncgi dgnx uike bjhm",
  },
});

export { transporter };
