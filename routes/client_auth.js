const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/User");
//const mail = require("../helpers/mailer");

router.get("/login", (req, res) => {
  res.render("login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/client",
    failureRedirect: "/client/login"
  })
);

router.get("/register", (req, res) => {
  res.render("register", {
    member: false
  });
});

router.post("/register", (req, res) => {
  if (req.body.password !== req.body["password-confirm"])
    return res.render("register", { msg: "Las contraseñas no son iguales" });
  const { name, last_name, email, password } = req.body;
  User.register({ name, last_name, email, role: "CLIENT" }, password)
    .then(user => {
      const options = {
        email: user.email,
        subject: "Confirma tu correo",
        message: "O confirmas o cuello"
      };
      //mail.send(options);
      res.redirect("/client/login");
      //res.send(user);
    })
    .catch(err => {
      res
        .status(500)
        .render("register", { err, msg: "No pudimos registrarte" });
    });
});

router.post("/logout", (req, res) => {
  req.logout();
  res.redirect("/client/login");
});

module.exports = router;
