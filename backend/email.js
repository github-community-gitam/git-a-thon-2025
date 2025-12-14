const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

/* ---------- TRANSPORTER ---------- */
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

/* ---------- SEND EMAIL ---------- */
async function sendConfirmationEmail(to, teamName) {
  try {
    const templatePath = path.join(
      __dirname,
      "templates",
      "email.html"
    );

    let html = fs.readFileSync(templatePath, "utf-8");

    // Replace placeholders
    html = html.replace(/{{TEAM_NAME}}/g, teamName);

    await transporter.sendMail({
      from: `"Hackathon Team" <${process.env.SMTP_USER}>`,
      to,
      subject: "Hackathon Registration Confirmation",
      html,
    });

    console.log("✔ Confirmation email sent to:", to);
  } catch (err) {
    console.error("❌ Email sending failed:", err);
    throw err;
  }
}

module.exports = { sendConfirmationEmail };
