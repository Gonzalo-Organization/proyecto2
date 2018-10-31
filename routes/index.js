const express = require("express");
const router = express.Router();
const validations = require("../helpers/validations");

/* GET home page */
router.get("/", (req, res) => {
  console.log(req.isAuthenticated());
  let user = req.isAuthenticated();

  res.render("index", {
    user
  });
});

router.get("/logout", (req, res) => {
  res.redirect("/");
});

module.exports = router;
