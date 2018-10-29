const express = require("express");
const router = express.Router();

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/member/login");
}

router.get("/", isLoggedIn, (req, res) => {
  res.render("home", {
    user: req.user
  });
});

router.get("/profile", isLoggedIn, (req, res) => {
  res.render("profile", {
    user: req.user
  });
  //res.send("<h1>Bienvenido</h1>");
});

module.exports = router;
