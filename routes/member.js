const express = require("express");
const router = express.Router();
const validations = require("../helpers/validations");

router.get("/", validations.isLoggedIn, (req, res) => {
  res.render("home", {
    user: req.user
  });
});

router.get("/profile", validations.isLoggedIn, (req, res) => {
  res.render("profile", {
    user: req.user
  });
  //res.send("<h1>Bienvenido</h1>");
});

module.exports = router;
