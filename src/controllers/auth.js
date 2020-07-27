const bcrypt = require("bcryptjs");

const User = require("../models/User");
const { SendEmailTo } = require("../utils/sendEmail");

exports.GetLogin = (req, res, next) => {
  if (req.session.user) {
    return next();
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
    if (user) {
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
    }
    res.redirect("/login");
    return;
  } catch (err) {
    res.redirect("/login");
    console.log("err", err);
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
    const result = await SendEmailTo(email);
    console.log("Result ===> ", result);
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      name,
      email,
      contact_number,
      password: hashedPassword,
      role,
      cart: { items: [], total_price: 0.0 },
      orders: [],
    });
    // await user.save();
    res.redirect("/login");
  } catch (err) {
    console.log("Errr ====> ", err);
    res.redirect("/sign-up");
  }
};
