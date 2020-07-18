const Express = require("express");
const Route = Express.Router();

// Controllers
const { GetLogin, PostLogin } = require("../controllers/auth");

Route.get("/login", GetLogin);
Route.post("/login", PostLogin);

module.exports = Route;
