const Product = require("../models/Product");
const { ObjectID } = require("mongodb");

exports.GetLogin = (req, res, next) => {
  res.status(200);
  res.render("pages/auth/login", {
    pageTitle: "Login",
    path: "/auth/login",
    isLoggedIn: req.isLoggedIn || false,
    isAdmin: req.isAdmin || false,
  });
};

exports.PostLogin = (req, res, next) => {
  res.status = 200;
  req.isLoggedIn = true;
  req.isAdmin = true;
  res.setHeader('Set-Cookie', 'isLoggedIn=true');
  res.redirect("/");
};
