const express = require("express");
const router = express.Router();
//const validations = require("../helpers/validations");
const User = require("../models/User");
const Message = require("../models/Message");
const mail = require("../helpers/mailer");

router.post("/", (req, res) => {
  const sender_id = req.body.sender;
  const received_id = req.body.addressee;

  Message.create(req.body).then(message => {
    User.findByIdAndUpdate(sender_id, {
      $push: { sent: message._id }
    })
      .then(() => {
        User.findByIdAndUpdate(
          received_id,
          {
            $push: { received: message._id }
          },
          { new: true }
        ).then(receiver => {
          const options = {
            id: receiver._id,
            name: `${receiver.name} ${receiver.last_name}`,
            email: receiver.email,
            filename: "message"
          };
          mail.send(options);
          res.redirect("/");
        });
      })
      .catch(e => {
        throw new Error(e);
      });
  });
});

module.exports = router;
