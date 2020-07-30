exports.isAuthenticated = (req, res, next) => {
  if (req.session.user && req.session.isLoggedIn) {
    next();
    return;
  }
  res.redirect("/login");
};

exports.isAdmin = (req, res, next) => {
  if (req.session.user && req.session.isLoggedIn && req.session.isAdmin) {
    next();
    return;
  }
  if (req.session.user && req.session.isLoggedIn) {
    res.redirect("/");
    return;
  }
  res.redirect("/login");
  return;
};

exports.skipIfUserExists = (req, res, next) => {
  if (
    req.session &&
    (req.session.isLoggedIn || req.session.isAdmin || req.session.user)
  ) {
    res.redirect('/');
    return;
  }
  else {
    next();
  }
};
