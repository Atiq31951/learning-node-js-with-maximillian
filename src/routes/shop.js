const Express = require("express");
const Route = Express.Router();
const Path = require("path");
const rootDir = require("../utils/path");

Route.get("/", (req, res, next) => {
  res.status(200);
  res.render("pages/shop", { pageTitle: "Shop1" });
});

module.exports = Route;
