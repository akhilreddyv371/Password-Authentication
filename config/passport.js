const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const User = require("../modle/user.js");

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


