import { Admin } from "../models/admin.model.js";
import { Email } from "../models/email.model.js";
import { sendAdminEmail } from "../services/emailAdmin.js";
import { sendAdminZohoEmail } from "../services/zohoEmail.js";
import { UnLinkFiles } from "../utils/UnLinkFiles.js";
import { UploadFiles } from "../utils/UploadFiles.js";

export async function sendEmail(req, res) {
  try {
    const { subject, to, html, admin, files } = req.body;

    if (!Array.isArray(to) || to.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Recipients list is required!",
      });
    }

    const results = [];

    for (const recipient of to) {
      try {
        const savedFiles = await UploadFiles(files);
        const response = await sendAdminEmail(
          recipient,
          subject,
          html,
          admin,
          savedFiles
        );

        await UnLinkFiles(savedFiles);
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

export async function sendZohoMail(req, res) {
  try {
    const { subject, recipient, html, admin, files } = req.body;

    if (!recipient) {
      return res.status(400).json({
        success: false,
        message: "Recipient is required!",
      });
    }

    const savedFiles = await UploadFiles(files);
    const response = await sendAdminZohoEmail(
      recipient,
      subject,
      html,
      admin,
      savedFiles
    );

    await UnLinkFiles(savedFiles);
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

    const userId = req.user.id;

    if (!html) {
      return res.status(404).json({
        success: false,
        message: "Email body not found",
      });
    }

    const emailCount = await Email.countDocuments({ admin: userId });

    if (emailCount >= 5) {
      return res.status(400).json({
        success: false,
        message: "You have exceeded the saved emails",
      });
    }

    const emailData = await Email.create({ html, title, admin: userId });

    console.log(emailData);
    console.log(userId);

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
    const adminId = req.user.id;

    if (!adminId) {
      return res.status(404).json({
        success: false,
        message: "No email data found",
      });
    }

    const emailData = await Email.find({ admin: adminId });

    return res.status(200).json({
      success: true,
      emailData,
    });
  } catch (error) {
    console.log("Error fetching email data ::::", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

export async function deleteEmail(req, res) {
  try {
    const { id } = req.body;

    const response = await Email.findByIdAndDelete(id);

    if (!response) {
      return res.status(404).json({
        success: false,
        message: "Email not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Email deleted successfully",
    });
  } catch (error) {
    console.log("Error fetching email data ::::", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
