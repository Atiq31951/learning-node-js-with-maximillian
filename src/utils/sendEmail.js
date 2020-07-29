const nodemailer = require("nodemailer");

const getHtmlWithSecreteToken = (token, name) => {
  return `
    <h1>Hello ${name}</h1>
    <br>
    Please verify your email with this token ${token}
  `;
};

const SendEmailTo = async (toUserObject) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "chloe.ward@ethereal.email",
      pass: "ssBmNhfTutRqYPCh9E",
    },
  });
  try {
    const result = transporter.sendMail({
      from: "chloe.ward@ethereal.email",
      to: toUserObject.email,
      subject: "Email Validation",
      html: getHtmlWithSecreteToken(
        toUserObject.email_validation_code,
        toUserObject.name
      ),
    });
  } catch (err) {
    console.log("Error in SendEmailTo ", err);
    throw err;
  }
};

module.exports = {
  SendEmailTo,
};
