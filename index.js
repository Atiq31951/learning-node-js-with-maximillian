const express = require("express");
const bodyParser = require("body-parser");
const { urlencoded } = require("body-parser");
const Path = require("path");
const session = require("express-session");

const AdminRoute = require("./src/routes/admin");
const ShopRoute = require("./src/routes/shop");
const AuthRoute = require("./src/routes/auth");

const { GetErrorPage } = require("./src/controllers/error");
const { mongoConnect } = require("./src/utils/database");
const { getCookiesObject } = require("./src/utils/auth");

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
const User = require("./src/models/User");
app.use(async (req, res, next) => {
  try {
    const user = await User.findById("5f0bdbcd43320944f0f049af");
    if (user) {
      req.user = user;
      const cookiesObject = getCookiesObject(req);
      req.isLoggedIn = req.isAdmin = cookiesObject["isLoggedIn"];
      next();
    } else {
      GetErrorPage(req, res, next);
    }
  } catch (err) {
    GetErrorPage(req, res, next);
  }
});

app.use("/admin", AdminRoute);
app.use("/", ShopRoute);
app.use("/", AuthRoute);

app.use(GetErrorPage);

mongoConnect()
  // .then(() => {
  //   const user = new User({
  //     name: "Atiqur Rahman",
  //     email: "atiqur.rahman951@gmail.com",
  //     contact_number: "+8801771765449",
  //     password: "13558766874",
  //     role: 1,
  //     cart: {
  //       items: [],
  //       total_price: 0.0,
  //     }
  //   })
  //   user.save();
  // })
  .then(() => {
    console.log("Server started..");
    app.listen(3000);
  })
  .catch((error) => {
    console.log(error);
  });
