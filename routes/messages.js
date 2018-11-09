const express = require("express");
const router = express.Router();
const validations = require("../helpers/validations");
const User = require("../models/User");
const Message = require("../models/Message");

router.post("/", (req, res) => {
  const sender_id = req.body.sender;
  const received_id = req.body.addressee;

  Message.create(req.body).then(message => {
    User.findByIdAndUpdate(sender_id, {
      $push: { sent: message._id }
    })
      .then(() => {
        User.findByIdAndUpdate(received_id, {
          $push: { received: message._id }
        }).then(() => {
          res.redirect("/");
        });
      })
      .catch(e => {
        throw new Error(e);
      });
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
