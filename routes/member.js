const express = require("express");
const router = express.Router();
const validations = require("../helpers/validations");
const User = require("../models/User");
const Problem = require("../models/Problem");
const Message = require("../models/Message");
const upload = require("../helpers/multer");

router.get("/", validations.isMemberLoggedIn, (req, res) => {
  User.findById(req.user._id)
    .populate({ path: "sent", populate: { path: "addressee" } })
    .populate({ path: "received", populate: { path: "sender" } })
    .then(user => {
      res.render("home", {
        member: true,
        user
      });
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

router.post(
  "/image",
  validations.isClientLoggedIn,
  upload.single("photo"),
  (req, res) => {
    req.body.profile_pic = req.file.url;
    User.findByIdAndUpdate(req.user._id, { $set: req.body }).then(() => {
      res.redirect("/member");
    });
  }
);

router.get("/quote/:id", validations.isMemberLoggedIn, (req, res) => {
  Problem.findById(req.params.id)
    .populate("author", "role profile_pic name last_name")
    .populate({
      path: "quotes",
      populate: { path: "user_create", model: "User" }
    })
    .then(problem => {
      res.render("quote", {
        member: true,
        user: req.user,
        problem
      });
    });
});

module.exports = router;
