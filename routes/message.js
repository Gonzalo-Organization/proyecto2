const express = require("express");
const router = express.Router();
const validations = require("../helpers/validations");
const User = require("../models/User");

router.get("/", validations.isLoggedIn, (req, res) => {
  res.render("home", {
    user: req.user
  });
});

router.post("/update", validations.isLoggedIn, (req, res) => {
  let id = req.user._id;
  let user = req.body;
  User.findByIdAndUpdate(id, { $set: user })
    .then(() => {
      res.redirect("/member");
    })
    .catch(err => {
      throw new Error(err);
    });
});

module.exports = router;
