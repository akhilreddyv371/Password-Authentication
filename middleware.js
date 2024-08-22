module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.status(300).json({ message: "User needs to login" });
  }
  next();
};
