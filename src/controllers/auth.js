const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const User = require("../models/User");
const AuthConstants = require("../constants/auth");

const { SendEmailTo } = require("../utils/sendEmail");
const { getSixDigitOTP } = require("../utils/auth");
const auth = require("../utils/auth");

exports.GetLogin = (req, res, next) => {
  if (req.session.user || req.session.isLoggedIn || req.session.isAdmin) {
    res.redirect("/");
    return;
  }
  res.status(200);
  let errorMessage = req.flash("error");
  if (errorMessage.length) {
    errorMessage = errorMessage[0];
  } else {
    errorMessage = null;
  }
  res.render("pages/auth/login", {
    pageTitle: "Login",
    path: "/auth/login",
    isLoggedIn: false,
    isAdmin: false,
    errorMessage,
  });
};

exports.PostLogin = async (req, res, next) => {
  if (req.session.user) {
    return next();
  }
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      req.flash("error", "Invalid email....");
      res.redirect("/login");
      return;
    }

    if (user && user.active) {
      const domatch = await bcrypt.compare(password, user.password);
      if (domatch) {
        req.session.isLoggedIn = true;
        req.session.isAdmin = user.role === 1;
        req.session.user = user;
        await req.session.save();
        res.status = 200;
        res.redirect("/");
        return;
      } else {
        req.flash("error", "Invalid password....");
      }
    } else {
      res.redirect("/login");
      return;
    }
  } catch (err) {
    res.redirect("/login");
    console.log("Error in PostLogin", err);
  }
};

exports.PostLogout = async (req, res, next) => {
  try {
    await req.session.destroy();
    res.redirect("/");
  } catch (err) {
    console.log("Error in logout", err);
  }
};

exports.GetSignUp = (req, res, next) => {
  res.status(200);
  let errorMessage = req.flash("error");
  if (errorMessage.length) {
    errorMessage = errorMessage[0];
  } else {
    errorMessage = null;
  }
  res.render("pages/auth/sign-up", {
    pageTitle: "Signup",
    path: "/auth/sign-up",
    isLoggedIn: false,
    isAdmin: false,
    errorMessage,
  });
};

exports.PostSignUp = async (req, res, next) => {
  const {
    name,
    email,
    password,
    confirm_password,
    contact_number,
    role = 5,
  } = req.body;
  if (
    email.length <= 7 ||
    name.length <= 3 ||
    !(
      password.length === confirm_password.length &&
      password === confirm_password
    )
  ) {
    req.flash("error", "Email already exists.");
    return next();
  }
  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      res.redirect("/sign-up");
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const email_validation_code = getSixDigitOTP();
    SendEmailTo({
      email,
      name,
      email_validation_code,
      token_type: AuthConstants.EMAIL_TYPE.EMAIL_VALIDATION,
    });
    const user = new User({
      name,
      email,
      contact_number,
      password: hashedPassword,
      role,
      cart: { items: [], total_price: 0.0 },
      orders: [],
      active: false,
      email_validation_code,
    });
    await user.save();
    res.redirect(`/activate?email=${email}`);
  } catch (err) {
    console.log("Error in PostSignUp ", err);
    res.redirect("/sign-up");
  }
};

exports.GetActivate = async (req, res, next) => {
  const { email } = req.query;
  try {
    const userExist = await User.findOne({ email });
    if (userExist && !userExist.active) {
      res.render("pages/auth/activate", {
        userEmail: email,
        isLoggedIn: false,
        isAdmin: false,
        pageTitle: "Activation",
        path: "/activate",
        errorMessage: null,
      });
    } else {
      res.redirect("/login");
    }
  } catch (error) {
    res.redirect("/login");
    console.log("Error in the GetActivate");
  }
};

exports.PostActivate = async (req, res, next) => {
  const { email, validation_code } = req.body;
  try {
    const user = await User.findOne({ email });
    if (
      user &&
      user.email_validation_code === validation_code &&
      !user.active
    ) {
      user.active = true;
      user.email_validation_code = null;
      await user.save();
      res.redirect("/login");
    } else {
      res.redirect("/login");
    }
  } catch (err) {
    res.redirect(`/activate?email=${email}`);
    console.log("Error in PostActivate ", err);
  }
};

exports.GetForgetPassword = (req, res, next) => {
  res.render("pages/auth/forget-password", {
    isAdmin: false,
    isLoggedIn: true,
    pageTitle: "Forget password",
    path: "forget-password",
    errorMessage: null,
  });
};

exports.PostForgetPassword = async (req, res, next) => {
  const { email } = req.body;
  if (email) {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        res.render("/forget-password");
        return;
      }
      const cryptoBytesBuffer = await crypto.randomBytes(32);
      const token = cryptoBytesBuffer.toString("hex");
      user.reset_password_token = token;
      await user.save();
      SendEmailTo({
        email,
        name: user.name,
        type: AuthConstants.TOKEN_TYPE.EMAIL_FORGET_PASSWORD,
        token,
        path: process.env.PRODUCTION
          ? `${process.env.HOST_URL}forget-password/${token}?email=${email}`
          : `http://localhost:3000/forget-password/${token}?email=${email}`,
      });
      req.flash();
      res.redirect("/forget-password");
      return;
    } catch (error) {
      console.log("Error in PostForgetPassword", error);
      res.redirect("/forget-password");
      return;
    }
  } else {
    res.render("/forget-password");
  }
};

exports.GetResetPassword = async (req, res, next) => {
  const { token } = req.params;
  const { email } = req.query;

  try {
    const user = await User.findOne({ email });
    if (user.reset_password_token && user.reset_password_token === token) {
      res.render("pages/auth/reset-password", {
        email,
        token,
        isAdmin: false,
        isLoggedIn: false,
        pageTitle: "Reset password",
        path: "reset-password",
        errorMessage: null,
      });
      return;
    } else {
      res.redirect("/login");
    }
  } catch (error) {
    console.log("Error in GetResetPassword", error);
    res.redirect("/forget-password");
  }
};
exports.PostResetPassword = async (req, res, next) => {
  const { email } = req.query;
  const { token, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && user.reset_password_token === token) {
      const hashedPassword = await bcrypt.hash(password, 12);
      user.password = hashedPassword;
      user.reset_password_token = null;
      await user.save();
      res.redirect("/login");
      return;
    } else {
      res.redirect("/forget-password");
      return;
    }
  } catch (error) {
    console.log("Error in PostResetPassword", error);
    res.redirect("/forget-password");
  }
  res.redirect("/");
};
