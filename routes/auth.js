const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/User");
//const mail = require("../helpers/mailer");

/*
router.get("/login", (req, res) => {
  res.render("login", {
    member: true
  });
});
*/

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/member",
    failureRedirect: "/"
  })
);

/*
router.get("/register", (req, res) => {
  res.render("register", {
    member: true
  });
});
*/

router.post("/register", (req, res) => {
  if (req.body.password !== req.body["password-confirm"])
    return res.render("index", { msg: "Las contraseñas no son iguales" });
  const { name, last_name, email, password, member } = req.body;
  if (member === "on") role = "MEMBER";
  User.register({ name, last_name, email, role }, password)
    .then(user => {
      const options = {
        email: user.email,
        subject: "Confirma tu correo",
        message: "O confirmas o cuello"
      };
      //mail.send(options);
      res.redirect("/member");
      //res.send(user);
    })
    .catch(err => {
      res.status(500).render("index", { err, msg: "No pudimos registrarte" });
    });
});

router.post("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
