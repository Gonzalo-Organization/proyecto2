const express = require("express");
const router = express.Router();
const Quote = require("../models/Quote");
const Problem = require("../models/Problem");

router.post("/new", (req, res) => {});

router.post("/", (req, res) => {
  req.body.user_create = req.user._id;
  Quote.create(req.body).then(quote => {
    Problem.findByIdAndUpdate(
      quote.problem,
      {
        $push: { quotes: quote._id }
      },
      { new: true }
    ).then(problem => {
      res.redirect(`/member/quote/${problem._id}`);
    });
  });
});

module.exports = router;
