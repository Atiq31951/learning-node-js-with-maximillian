exports.isAuthenticated = (req, res, next) => {
  if (req.session.user && req.session.isAuthenticated) {
    next();
    return;
  }
  res.redirect("/login");
};

exports.isAdmin = (req, res, next) => {
  if (req.session.user && req.session.isAuthenticated && req.session.isAdmin) {
    next();
    return;
  }
  if (req.session.user && req.session.isAuthenticated) {
    res.redirect("/");
    return;
  }
  res.redirect("/login");
  return;
};
