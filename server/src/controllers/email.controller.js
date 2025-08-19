import { sendAdminEmail } from "../services/emailAdmin.js";

export async function sendEmail(req, res) {
  try {
    const { subject, to, html, admin } = req.body;

    if (!Array.isArray(to) || to.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Recipients list is required and must be an array",
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
