const express = require("express");
const bodyParser = require("body-parser");
const { urlencoded } = require("body-parser");
const Path = require("path");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const flash = require("connect-flash");

const AdminRoute = require("./src/routes/admin");
const ShopRoute = require("./src/routes/shop");
const AuthRoute = require("./src/routes/auth");

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

// Session section

const store = new MongoDBStore({
  uri:
    "mongodb+srv://test:test@cluster0.mnh64.mongodb.net/shop?retryWrites=true&w=majority",
  collection: "session",
});

app.use(
  session({
    secret: "73KsRFBcLaTp32npRgP_Ltpmn92_qaP2@dDqf",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 2592000,
    },
    store,
  })
);

const User = require("./src/models/User");
app.use(async (req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  try {
    const user = await User.findById(req.session.user._id);
    if (user) {
      req.user = user;
      next();
    } else {
      GetErrorPage(req, res, next);
    }
  } catch (err) {
    GetErrorPage(req, res, next);
  }
});

// Flash global variables

app.use(flash());

app.use("/admin", AdminRoute);
app.use("/", ShopRoute);
app.use("/", AuthRoute);

app.use(GetErrorPage);

mongoConnect()
  .then(() => {
    console.log("Server started..");
    app.listen(3000);
  })
  .catch((error) => {
    console.log("Error in connectMongoDb", error);
  });
