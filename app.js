const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const bodyParser = require("body-parser");

const {isLoggedIn} = require('./middleware')
require("./config/passport.js");



const app = express();

mongoose
  .connect("mongodb://localhost:27017/PassportAuthentication")
  .then(() => {
    console.log("Connection successful");
  })
  .catch((err) => {
    console.error("MongoDD Connection Error");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: "your secret here",
    resave: false,
    saveUninitialized: false,
  })
);

app.use((req, res, next) => {
  next();
});

app.use(passport.initialize());
app.use(passport.session());


app.use("/auth", require("./routers/user"))


app.get("/", isLoggedIn, (req, res) => {
    res.send("Hello")
})

app.all("*",(req, res, next)=>{
    res.send("Page not found")
})

require("dotenv").config();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
