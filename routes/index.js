const express = require("express");
const router = express.Router();
const User = require("../models/User");
const validations = require("../helpers/validations");

/* GET home page */
router.get("/", (req, res) => {
  let isAuth = req.isAuthenticated();

  if (isAuth) {
    User.findById(req.user._id).then((user) => {
      res.render("index", {
        user,
        [user.role.toLowerCase()]: true,
      });
    });
  } else {
    res.render("index", {
      user: isAuth,
    });
  }
});

router.get("/logout", (req, res) => {
  res.redirect("/");
});

router.get("/register", (req, res) => {
  res.redirect("/");
});

module.exports = router;
