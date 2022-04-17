import nodemailer from "nodemailer";

const testAccount = await nodemailer.createTestAccount();

const transporter = nodemailer.createTransport({
  host: testAccount.smtp.host,
  port: testAccount.smtp.port,
  secure: testAccount.smtp.secure, // true for 465, false for other ports
  auth: {
    user: testAccount.user,
    pass: testAccount.pass,
  }
}, {
  from: 'Rainyday <contact@rainyday.fr>'
});

const successfulOrder = async (data) => {
  const message = await transporter.sendMail({
    to: "Bar <bar@example.com>",
    subject: "Hello ✔",
    text: "Hello world?",
    html: "<b>Hello world?</b>",
  });


// Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));
}




