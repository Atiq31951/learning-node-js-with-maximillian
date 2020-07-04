const express = require("express");
const bodyParser = require("body-parser");
const { urlencoded } = require("body-parser");
const Path = require("path");

const AdminRoute = require("./src/routes/admin");
const ShopRoute = require("./src/routes/shop");
const CommonRoute = require("./src/routes/common");

const app = express();

// EJS Templating engine setup
app.set("view engine", "ejs");
app.set("views", Path.join(__dirname, "src", "views"));
// app.set("views", Path.join(__dirname, 'src', 'views'));

// Register public files
app.use(express.static(Path.join(__dirname, "src", "public")));

// BodyParser
app.use(bodyParser(urlencoded({ extended: false })));

app.use("/admin", AdminRoute);
app.use("/shop", ShopRoute);
app.use("/", CommonRoute);

app.use((req, res, next) => {
  res.status(404);
  res.render("pages/404", { pageTitle: "Page not found" });
});

app.listen(3000);
