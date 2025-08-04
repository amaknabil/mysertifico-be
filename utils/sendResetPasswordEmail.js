const nodemailer = require("nodemailer");
const ejs = require("ejs");
const fs = require("fs");
const path = require("path"); 
const { SMTP_HOST, SMTP_USER, SMTP_PASSWORD } = require("../config/env.config");

module.exports = class Email {
  constructor(user, urlLink) {
    this.to = user.email;
    this.name = user.full_name;
    this.urlLink = urlLink;
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

  async send(subject) {
    try {
      const template = fs.readFileSync(
        path.join(__dirname,'..','templates','resetPassword.ejs'),
        "utf-8"
      );
      const html = ejs.render(template, {
        name: this.name,
        link: this.urlLink,
        email:this.to
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

  async sendPasswordReset() {
    await this.send("Your Reset Password");
  }
};
