const nodemailer = require("nodemailer");
const ejs = require("ejs");
const fs = require("fs");
const path = require("path");
// [CHANGE] Added BASE_URL to the require statement
const { SMTP_HOST, SMTP_USER, SMTP_PASSWORD, LOGIN_URL } = require("../config/env.config");

module.exports = class Email {
  constructor(user) {
    this.to = user.email;
    this.name = user.full_name;
    // [CHANGE] The urlLink is now just the path, so BASE_URL is prepended here
    // this.urlLink = urlLink;
    this.from = `MySertifico Admin <mysertifico.admin@gmail.com>`;
  }

  newTransport() {
    return nodemailer.createTransport({
      host: SMTP_HOST,
      port: 587,
      secure: false,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASSWORD,
      },
    });
  }

  async send(subject ,temporaryPassword) {
    try {
      const template = fs.readFileSync(
        path.join(__dirname,'..','templates','resetPassword.ejs'),
        "utf-8"
      );
      // [CHANGE] Prepended BASE_URL to the urlLink for dynamic links
      const html = ejs.render(template, {
        full_name: this.name,
        // link: `${BASE_URL}${this.urlLink}`,
        temporaryPassword:temporaryPassword,
        loginUrl: LOGIN_URL
      });

      const mailOptions = {
        from: this.from,
        to: this.to,
        subject,
        html,
        attachments: [
              {
                filename: "logo.png",
                path: path.join(__dirname, "..", "public", "images", "logo.png"),
                cid: "logoImage", // <-- must match src="cid:logoImage"
              },
            ],
      };

      await this.newTransport().sendMail(mailOptions);
    } catch (err) {
        console.error(err)
    }

  }

  async sendPasswordReset(temporaryPassword) {
    await this.send("Your Reset Password",temporaryPassword);
  }
};