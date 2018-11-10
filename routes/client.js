const express = require("express");
const router = express.Router();
const validations = require("../helpers/validations");
const User = require("../models/User");
const Problem = require("../models/Problem");
const Message = require("../models/Message");
const upload = require("../helpers/multer");

router.get("/", validations.isClientLoggedIn, (req, res) => {
  User.findById(req.user._id)
    .populate({ path: "sent", populate: { path: "addressee" } })
    .populate({ path: "received", populate: { path: "sender" } })
    .then(user => {
      res.render("home", {
        client: true,
        user
      });
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

router.post(
  "/image",
  validations.isClientLoggedIn,
  upload.single("photo"),
  (req, res) => {
    req.body.profile_pic = req.file.url;
    User.findByIdAndUpdate(req.user._id, { $set: req.body }).then(() => {
      res.redirect("/client");
    });
  }
);

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

router.get("/message/:id", validations.isClientLoggedIn, (req, res) => {
  User.findById(req.params.id).then(user => {
    res.render("message", {
      client: true,
      user: req.user,
      user
    });
  });
});

/*
router.post("/message", validations.isClientLoggedIn, (req, res) => {
  console.log(req.body);

  Message.create(req.body).then(message => {
    const sender_id = req.body.sender;
    const received_id = req.body.addressee;

    User.findByIdAndUpdate(sender_id, {
      messages: { $push: { sent: message._id } }
    })
      .then(() => {
        User.findByIdAndUpdate(received_id, {
          messages: { $push: { received: message._id } }
        }).then(() => {
          res.redirect("/search");
        });
      })
      .catch(e => {
        throw new Error(e);
      });
  });
});
*/

module.exports = router;
