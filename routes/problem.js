const express = require("express");
const router = express.Router();
const Problem = require("../models/Problem");
const User = require("../models/Problem");
const upload = require("../helpers/multer");

router.post("/", upload.array("images"), (req, res) => {
  req.body.author = req.user._id;
  req.body.images = req.files.map(file => {
    return file.url;
  });
  Problem.create(req.body).then(() => {
    res.redirect("/client/problem");
  });
});

router.post("/:id", (req, res) => {
  console.log(req.body, req.params.id);
  Problem.findByIdAndUpdate(req.params.id, { $set: req.body }).then(() => {
    res.redirect("/client/problem");
  });
});

router.delete("/:id", (req, res) => {
  Problem.findByIdAndDelete(req.params.id).then(() => {
    res.redirect("/client/problem");
  });
});

module.exports = router;
