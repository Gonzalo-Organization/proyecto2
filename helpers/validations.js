exports.isMemberLoggedIn = (req, res, next) => {
  if (
    req.isAuthenticated() &&
    (req.user.role === "MEMBER" || req.user.role === "BOTH")
  )
    return next();
  res.redirect("/");
};

exports.isClientLoggedIn = (req, res, next) => {
  if (req.isAuthenticated() && req.user.role === "CLIENT") return next();
  res.redirect("/");
};
