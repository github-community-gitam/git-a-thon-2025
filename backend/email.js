const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

async function sendConfirmationEmail(to, data) {
  const templatePath = path.join(__dirname, "templates", "email.html");
  let html = fs.readFileSync(templatePath, "utf-8");

  const { teamName, teamSize, leader, members } = data;

  const replacements = {
    teamName,
    teamSize,
    leaderName: leader.name,
    leaderEmail: leader.email,
    leaderPhone: leader.phone,
    leaderCollege: leader.college,
    leaderYear: leader.year,
    leaderGithub: leader.github,

    member2Name: members[0].name,
    member2Email: members[0].email,
    member2Phone: members[0].phone,
    member2College: members[0].college,
    member2Year: members[0].year,
    member2Github: members[0].github,

    member3Name: members[1].name,
    member3Email: members[1].email,
    member3Phone: members[1].phone,
    member3College: members[1].college,
    member3Year: members[1].year,
    member3Github: members[1].github,

    member4Name: members[2].name,
    member4Email: members[2].email,
    member4Phone: members[2].phone,
    member4College: members[2].college,
    member4Year: members[2].year,
    member4Github: members[2].github,
  };

  for (const key in replacements) {
    const value = replacements[key] || "-";
    html = html.replace(new RegExp(`{{${key}}}`, "g"), value);
  }

  await transporter.sendMail({
    from: `"GIT-A-THON" <${process.env.SMTP_USER}>`,
    to,
    subject: "GIT-A-THON 2025 – Registration Confirmed",
    html,
  });
}

module.exports = { sendConfirmationEmail };
