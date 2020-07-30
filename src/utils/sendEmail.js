const nodemailer = require("nodemailer");

const AuthConstants = require("../constants/auth")

const getDynamicHtml = ({ token, name, type, path}) => {
  switch (type) {
    case AuthConstants.TOKEN_TYPE.EMAIL_VALIDATION:
      console.log("Hello")
      return `
        <h1>Hello ${name}</h1>
        <br>
        Please verify your email with this token ${token}
      `;
    case AuthConstants.TOKEN_TYPE.EMAIL_FORGET_PASSWORD:
      return `
        <h1>Hello ${name}</h1>
        <br>
        Please reset your password from this link <a href="${path}">Here</a>
      `;
  }
};


const getSubject = (type) => {
  console.log('Type ===> ', type)
  switch (type) {
    case AuthConstants.EMAIL_TYPE.EMAIL_VALIDATION:
      return AuthConstants.EMAIL_SUBJECT.EMAIL_VALIDATION;

    case AuthConstants.EMAIL_TYPE.EMAIL_FORGET_PASSWORD:
      return AuthConstants.EMAIL_SUBJECT.EMAIL_FORGET_PASSWORD;
  }
}

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
    const result = await transporter.sendMail({
      from: "chloe.ward@ethereal.email",
      to: toUserObject.email,
      subject: getSubject(toUserObject.type),
      html: getDynamicHtml(toUserObject),
    });
    console.log("result ====> ", result, getDynamicHtml(toUserObject));
  } catch (err) {
    console.log("Error in SendEmailTo ", err);
    throw err;
  }
};

module.exports = {
  SendEmailTo,
};
