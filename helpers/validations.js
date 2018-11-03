exports.isLoggedIn = (req, res, next) => {
  if (
    req.isAuthenticated() &&
    (req.user.role === "MEMBER" || req.user.role === "BOTH")
  )
    return next();
  res.redirect("/");
};
