const express = require("express");
const router = express.Router();
const validations = require("../helpers/validations");

/* GET home page */
router.get("/", (req, res) => {
  let user = req.isAuthenticated();

  res.render("index", {
    user
  });
});

router.get("/logout", (req, res) => {
  res.redirect("/");
});

router.get("/register", (req, res) => {
  res.redirect("/");
});

module.exports = router;
