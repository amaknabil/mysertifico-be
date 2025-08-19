const nodemailer = require("nodemailer");
const { SMTP_HOST, SMTP_USER, SMTP_PASSWORD } = require("../config/env.config");
const ejs = require("ejs");
const path = require("path");

class Email {
  constructor(user) {
    this.to = user.email;
    this.name = user.full_name;
    this.from = `MySertifico Admin <mysertifico.admin@gmail.com>`;
    this.transport = this._createTransport();
  }

  _createTransport() {
    // In production, use a real email service like SendGrid, Mailgun, etc.
    // For development, Mailtrap is a great tool.
    return nodemailer.createTransport({
      host: SMTP_HOST,
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASSWORD,
      },
    });
  }

  async _send(template, subject, templateData) {
    // 1. Read and render the EJS template
    const templatePath = path.join(
      __dirname,
      "..",
      "templates",
      `${template}.ejs`
    );
    const html = await ejs.renderFile(templatePath, {
      name: this.name,
      ...templateData, // Pass additional data to the template
    });

    // 2. Define mail options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      attachments: [
        {
          filename: "logo.png",
          path: path.join(__dirname, "..", "public", "images", "logo.png"),
          cid: "logoImage",
        },
      ],
    };

    // 3. Send the email
    await this.transport.sendMail(mailOptions);
  }

  // --- Public Methods for Specific Emails ---

  async newUserInvite({ organizationName, temporaryPassword, loginUrl }) {
    const subject = `You're invited to join ${organizationName} on MySertifico!`;
    await this._send("newUserInvite", subject, {
      organizationName,
      temporaryPassword,
      loginUrl,
    });
  }

  async existingUserNotice({ organizationName, roleName }) {
    const subject = `You've been added to ${organizationName}`;
    await this._send("existingUserNotice", subject, {
      organizationName,
      roleName,
    });
  }

  //BO invite email
  async newUserInviteBO({ temporaryPassword, loginUrl, roleName,full_name }) {
    const subject = `You're invited to join Back Office on MySertifico! as ${roleName}`;
    await this._send("BOnewUserInvite", subject, {
      temporaryPassword,
      loginUrl,
      roleName,
      full_name
    });
  }

  async existingUserNoticeBO({ loginUrl, roleName, full_name }) {
    const subject = "You've been added to Back Office";
    await this._send("BOexistingUserNotice", subject, {
      roleName,
      loginUrl,
      full_name
    });
  }
}

module.exports = Email;
