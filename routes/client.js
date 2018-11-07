const express = require("express");
const router = express.Router();
const validations = require("../helpers/validations");
const User = require("../models/User");
const Problem = require("../models/Problem");

router.get("/", validations.isClientLoggedIn, (req, res) => {
  res.render("home", {
    client: true,
    user: req.user
  });
});

router.get("/search", validations.isClientLoggedIn, (req, res) => {
  User.find({ $or: [{ role: "MEMBER" }, { role: "BOTH" }] })
    .then(users => {
      res.render("search", {
        client: true,
        user: req.user,
        users
      });
      //res.send(users);
    })
    .catch(err => {
      throw new Error(err);
    });
});

router.post("/update", validations.isClientLoggedIn, (req, res) => {
  let id = req.user._id;
  let user = req.body;
  User.findByIdAndUpdate(id, { $set: user })
    .then(() => {
      res.redirect("/client");
    })
    .catch(err => {
      throw new Error(err);
    });
});

// ruta para los problemas
router.get("/problem", validations.isClientLoggedIn, (req, res) => {
  Problem.find()
    .populate("author", "role profile_pic name last_name")
    .then(data => {
      problems = data.filter(p => {
        if (req.user._id.toString() == p.author._id.toString()) {
          p.client = true;
          return p;
        }
      });
      res.render("problemList", {
        client: true,
        user: req.user,
        problems
      });
    });
});

router.get("/quote/:id", validations.isClientLoggedIn, (req, res) => {
  Problem.findById(req.params.id)
    .populate("author", "role profile_pic name last_name")
    .populate({
      path: "quotes",
      populate: { path: "user_create", model: "User" }
    })
    .then(problem => {
      res.render("quote", {
        client: true,
        user: req.user,
        problem
      });
    });
});

/*
router.get("/quote/member/:id", (req, res) => {
  req.params.id;
  Problem.findByIdAndUpdate(
    req.params.id,
    {
      $set: { member: req.params.id }
    },
    { new: true }
  ).then(problem => {
    console.log(problem);
    res.redirect(`/client/quote/${problem._id}`);
  });
});*/

module.exports = router;
