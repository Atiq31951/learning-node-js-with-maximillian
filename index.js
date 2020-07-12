const express = require("express");
const bodyParser = require("body-parser");
const { urlencoded } = require("body-parser");
const Path = require("path");

const AdminRoute = require("./src/routes/admin");
const ShopRoute = require("./src/routes/shop");
const { GetErrorPage } = require("./src/controllers/error");
const { mongoConnect } = require("./src/utils/database");

const app = express();

// EJS Templating engine setup
app.set("view engine", "ejs");
app.set("views", Path.join(__dirname, "src", "views"));
// app.set("views", Path.join(__dirname, 'src', 'views'));

// Register public files
app.use(express.static(Path.join(__dirname, "src", "public")));

// BodyParser
app.use(bodyParser(urlencoded({ extended: false })));


// Should be remove later
const UserModel = require('./src/models/User');
// app.use( async (req, res, next) => {
//   try {
//     const user = await UserModel.fetchSingle("5f097fbd66fabbc1faa700fd");
//     if (user) {
//       req.user = new UserModel(
//         user.user_name,
//         user.email,
//         user.password,
//         user.contact_number,
//         user.role,
//         user._id,
//         user.cart
//       );
//       next();
//     } else {
//       GetErrorPage(req, res, next);
//     }
//   } catch (err) {
//     GetErrorPage(req, res, next);
//   }
// })


app.use("/admin", AdminRoute);
app.use("/", ShopRoute);

app.use(GetErrorPage);

mongoConnect()
  .then(() => {
    console.log("Server started..")
    app.listen(3000);
  })
  .catch((error) => {
    console.log(error);
  });
