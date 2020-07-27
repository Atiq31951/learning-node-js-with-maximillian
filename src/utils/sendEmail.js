const nodemailer = require("nodemailer");
const getHtmlWithSecreteToken = (token, name) => {
  return `
    <h1>Hello ${name}</h1>
    <br>
    Please verify your email with this token ${token}
  `;
};

const SendEmailTo = async (toUser) => {
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
      to: "atiqur.rahman951@gmail.com",
      text: "Hello"
    });
    console.log("Result ===>", result);
  } catch (err) {
    console.log("Hello ===> ", err);
    throw err;
  }
};

module.exports = {
  SendEmailTo,
};
