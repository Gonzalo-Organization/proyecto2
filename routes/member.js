const express = require("express");
const router = express.Router();
const validations = require("../helpers/validations");
const User = require("../models/User");

router.get("/", validations.isLoggedIn, (req, res) => {
  res.render("home", {
    user: req.user
  });
});

router.get("/search", validations.isLoggedIn, (req, res) => {
  User.find({ role: "CLIENT" })
    .then(users => {
      res.render("search", {
        user: req.user,
        users
      });
      //res.send(users);
    })
    .catch(err => {
      throw new Error(err);
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
