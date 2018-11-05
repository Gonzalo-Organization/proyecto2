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

router.post("/login", passport.authenticate("local"), (req, res) => {
  if (req.user.role === "CLIENT") {
    res.redirect("/client/search");
  } else {
    res.redirect("/member/problem");
  }
});

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
  const { name, last_name, email, gender, password, member } = req.body;
  let role;
  let profile_pic;
  if (member === "on") role = "MEMBER";
  if (gender === "MALE") {
    profile_pic =
      "https://res.cloudinary.com/royquiroz/image/upload/v1541363947/Tfixeo/male.png";
  } else {
    profile_pic =
      "https://res.cloudinary.com/royquiroz/image/upload/v1541363947/Tfixeo/female.png";
  }
  User.register({ name, last_name, email, gender, role, profile_pic }, password)
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

/*router.get('/verificar/:id', (req, res) => {

})*/

module.exports = router;
