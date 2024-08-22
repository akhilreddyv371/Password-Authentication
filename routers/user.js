const express = require("express");
const router = express.Router();
const User = require("../modle/user");
const passport = require("passport");

router.post("/register", async (req, res) => {
  const { username, password, email } = req.body;
  User.register(new User({ username, email }), password, (err, user, info) => {
    if (err) {
      res.status(500).json({ message: err.message });
    }
    passport.authenticate("local")(req, res, () => {
      res.status(200).json({ message: "Registered Successfully" });
    });
  });
});

router.post("/login", passport.authenticate("local"), (req, res) => {
res.redirect("/")
});

module.exports = router;
