const mailer = require("nodemailer");
const nodemailerSendgrid = require("nodemailer-sendgrid");
const hbs = require("hbs");
const fs = require("fs");

const transport = mailer.createTransport(
  // service: "SendGrid",
  // auth: {
  //   user: process.env.SEND_USER,
  //   pass: process.env.SEND_PASS
  // },
  // tls: {
  //   rejectUnauthorized: false
  // }
  nodemailerSendgrid({
    apiKey: process.env.SENDGRID_API_KEY,
  })
);

transport.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

const generateHtml = (filename, options = {}) => {
  const html = hbs.compile(
    fs.readFileSync((__dirname, `./views/mail/${filename}.hbs`), "utf8")
  );
  return html(options);
};

exports.send = (options) => {
  const html = generateHtml(options.filename, options);
  const mailOptions = {
    from: `Fix Inc. <noreplay@fixinc.com>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html,
  };
  return transport.sendMail(mailOptions);
};
