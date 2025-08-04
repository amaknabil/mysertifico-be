const nodemailer = require("nodemailer");
const { SMTP_HOST, SMTP_USER, SMTP_PASSWORD } = require("../config/env.config");
const ejs = require("ejs");
const fs = require("fs");
const path = require("path");

module.exports = async (to, name, url) => {
  const transport = nodemailer.createTransport({
    //     service:'gmail',
    //     auth:{
    //         user:,
    //         pass:
    //     }
    host: SMTP_HOST,
    port: 587,
    secure: false,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASSWORD,
    },
  });

  const template = fs.readFileSync(
    path.join(__dirname, "..", "templates", "verifyEmail.ejs"),
    "utf-8"
  );
  const html = ejs.render(template, {
    name: name,
    link: url,
    email :to
  });

  await transport.sendMail({
    from:`MySertifico Admin <mysertifico.admin@gmail.com>`,
     to,
    subject: `Verify Your Email - ${name}`,
    html,
    attachments: [
      {
        filename: "logo.png",
        path: path.join(__dirname, "..", "public", "images", "logo.png"),
        cid: "logoImage", // <-- must match src="cid:logoImage"
      },
    ],
  });
};
