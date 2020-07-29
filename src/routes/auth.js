const Express = require("express");
const Route = Express.Router();

// Controllers
const {
  GetLogin,
  PostLogin,
  PostLogout,
  GetSignUp,
  PostSignUp,
  GetActivate,
  PostActivate,
} = require("../controllers/auth");

Route.get("/login", GetLogin);
Route.post("/login", PostLogin);
Route.post("/logout", PostLogout);
Route.get("/sign-up", GetSignUp);
Route.post("/sign-up", PostSignUp);
Route.get("/activate", GetActivate);
Route.post("/activate", PostActivate);

module.exports = Route;
