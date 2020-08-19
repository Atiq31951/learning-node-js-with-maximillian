const Express = require("express");
const Route = Express.Router();
const { skipIfUserExists } = require("../middlewares/auth");
const { check } = require("express-validator");

// Controllers
const {
  GetLogin,
  PostLogin,
  PostLogout,
  GetSignUp,
  PostSignUp,
  GetActivate,
  PostActivate,
  GetForgetPassword,
  PostForgetPassword,
  GetResetPassword,
  PostResetPassword,
} = require("../controllers/auth");

Route.get("/login", skipIfUserExists, GetLogin);
Route.post("/login", check('email').isEmail().withMessage("Please enter a valid email") ,skipIfUserExists, PostLogin);
Route.post("/logout", skipIfUserExists, PostLogout);

Route.get("/sign-up", skipIfUserExists, GetSignUp);
Route.post("/sign-up", skipIfUserExists, PostSignUp);

Route.get("/activate", skipIfUserExists, GetActivate);
Route.post("/activate", skipIfUserExists, PostActivate);

Route.get("/forget-password", skipIfUserExists, GetForgetPassword);
Route.post("/forget-password", skipIfUserExists, PostForgetPassword);

Route.get("/reset-password/:token", skipIfUserExists, GetResetPassword);
Route.post("/reset-password", skipIfUserExists, PostResetPassword);

module.exports = Route;
