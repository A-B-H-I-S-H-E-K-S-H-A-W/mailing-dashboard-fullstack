import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const admins = {
  "Abhishek Shaw": {
    email: process.env.ZOHO_USER_ABHI,
    password: process.env.ZOHO_PASS_ABHI,
  },
  "Rohit Yadav": {
    email: process.env.ZOHO_USER_ROHIT,
    password: process.env.ZOHO_PASS_ROHIT,
  },
  "Ayush Kumar Shaw": {
    email: process.env.ZOHO_USER_AYUSH,
    password: process.env.ZOHO_PASS_AYUSH,
  },
};

function createTransporter(email, pass) {
  return nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: 465,
    secure: true,
    auth: {
      user: email,
      pass: pass,
    },
  });
}

export async function sendAdminZohoEmail(
  to,
  subject,
  html,
  adminName,
  attachments
) {
  try {
    if (!to || !adminName) {
      throw new Error("Email and Admin Name are required");
    }

    const selectedAdmin = admins[adminName];
    if (!selectedAdmin) {
      throw new Error(`Invalid admin: ${adminName}`);
    }

    let transporter = createTransporter(
      selectedAdmin.email,
      selectedAdmin.password
    );

    const emailOptions = {
      from: `"${adminName}" <${selectedAdmin.email}>`,
      to,
      subject,
      html,
      attachments: (attachments || []).map((file) => ({
        filename: file.filename,
        path: file.path,
      })),
    };

    const info = await transporter.sendMail(emailOptions);

    return {
      message: `Email sent successfully to ${to}`,
      success: true,
    };
  } catch (error) {
    console.log("Error sending email ::::", error);
    return {
      message: `Failed to send email`,
      success: false,
    };
  }
}
