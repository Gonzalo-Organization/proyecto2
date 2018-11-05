const express = require("express");
const router = express.Router();
const validations = require("../helpers/validations");
const User = require("../models/User");
const Problem = require("../models/Problem");

router.get("/", validations.isMemberLoggedIn, (req, res) => {
  res.render("home", {
    member: true,
    user: req.user
  });
});

router.get("/problem", validations.isMemberLoggedIn, (req, res) => {
  Problem.find()
    .populate("author", "role profile_pic name last_name")
    .then(problems => {
      res.render("problemList", {
        member: true,
        user: req.user,
        problems
      });
    });
});

router.post("/update", validations.isMemberLoggedIn, (req, res) => {
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
