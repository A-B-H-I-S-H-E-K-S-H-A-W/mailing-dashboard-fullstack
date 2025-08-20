import { Email } from "../models/email.model.js";
import { sendAdminEmail } from "../services/emailAdmin.js";

export async function sendEmail(req, res) {
  try {
    const { subject, to, html, admin } = req.body;

    if (!Array.isArray(to) || to.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Recipients list is required!",
      });
    }

    const results = [];

    for (const recipient of to) {
      try {
        const response = await sendAdminEmail(recipient, subject, html, admin);
        results.push({ recipient, ...response });
      } catch (err) {
        results.push({
          recipient,
          success: false,
          message: `Failed to send to ${recipient}`,
        });
      }
    }

    return res.status(200).json({
      success: true,
      message: "Emails processed",
      results,
    });
  } catch (error) {
    console.error("Error sending email", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

export async function createEmail(req, res) {
  try {
    const { html, title } = req.body;

    if (!html) {
      return res.status(404).json({
        success: false,
        message: "Email body not found",
      });
    }

    const allEmails = await Email.countDocuments();

    if (allEmails >= 5) {
      return res.status(400).json({
        success: false,
        message: "You have exceeded the saved emails",
      });
    }

    const emailData = await Email.create({ html, title });

    return res.status(201).json({
      success: true,
      message: "Email saved successfully",
    });
  } catch (error) {
    console.log("Error creating email data ::::", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

export async function fetchEmail(req, res) {
  try {
    const emailData = await Email.find();

    if (!emailData) {
      return res.status(404).json({
        success: false,
        message: "No email data found",
      });
    }

    return res.status(200).json({
      emailData,
    });
  } catch (error) {
    console.log("Error creating email data ::::", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
