import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const admins = {
  "Abhishek Shaw": {
    email: process.env.GMAIL_USER_ABHI,
    password: process.env.GMAIL_PASS_ABHI,
  },
  "Rohit Yadav": {
    email: process.env.GMAIL_USER_ROHIT,
    password: process.env.GMAIL_PASS_ROHIT,
  },
  "Ayush Kumar Shaw": {
    email: process.env.GMAIL_USER_AYUSH,
    password: process.env.GMAIL_PASS_AYUSH,
  },
};

function createTransporter(email, pass) {
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: email,
      pass: pass,
    },
  });
}

export async function sendOtpEmail(to, subject, html, adminName) {
  if (!to || !adminName) {
    throw new Error("Email and Admin Name are required");
  }

  const selectedAdmin = admins[adminName];
  if (!selectedAdmin) {
    throw new Error(`Invalid admin: ${adminName}`);
  }

  let transporter = null;

  const emailOptions = {
    from: `"${adminName}" <${selectedAdmin.email}>`,
    to,
    subject,
    html,
  };

  const info = await transporter.sendMail(emailOptions);
  console.log(`Email sent to ${to}`, info);

  return {
    message: `Email sent successfully to ${to}`,
    success: true,
  };
}
