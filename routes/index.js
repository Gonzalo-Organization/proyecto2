const express = require("express");
const router = express.Router();

/* GET home page */
router.get("/", (req, res) => {
  res.render("index");
});

router.get("/logout", (req, res) => {
  res.redirect("/");
});

module.exports = router;
