const express = require("express");
const router = express.Router();
const validations = require("../helpers/validations");
const User = require("../models/User");
const Message = require("../models/Message");

router.post("/", (req, res) => {
  console.log(req.body);

  Message.create(req.body).then(() => {
    res.redirect("/");
  });
});

/*
router.get("/message/:id", validations.isLoggedIn, (req, res) => {
  User.findById(req.params.id).then(user => {
    res.send(user);
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
*/

module.exports = router;
