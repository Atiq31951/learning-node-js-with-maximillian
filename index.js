const express = require("express");
const bodyParser = require("body-parser");
const { urlencoded } = require("body-parser");
const Path = require("path");

const AdminRoute = require("./src/routes/admin");
const ShopRoute = require("./src/routes/shop");
const { GetErrorPage } = require('./src/controllers/error')

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
app.use("/", ShopRoute);

app.use(GetErrorPage);

app.listen(3000);
