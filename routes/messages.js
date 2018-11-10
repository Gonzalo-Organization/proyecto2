const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Message = require("../models/Message");
const mail = require("../helpers/mailer");
const upload = require("../helpers/multer");

router.post("/", upload.array("images"), (req, res) => {
  const sender_id = req.body.sender;
  const received_id = req.body.addressee;

  req.body.images = req.files.map(file => {
    return file.url;
  });

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
            subject: message.title,
            filename: "message",
            data: message
          };
          mail.send(options);
          res.redirect("/client");
        });
      })
      .catch(e => {
        throw new Error(e);
      });
  });
});

module.exports = router;
