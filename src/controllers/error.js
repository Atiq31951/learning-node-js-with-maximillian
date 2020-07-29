module.exports.GetErrorPage = (req, res, next) => {
  res.status(404);
  res.render("pages/404", { pageTitle: "Page not found", path: "error" });
};
