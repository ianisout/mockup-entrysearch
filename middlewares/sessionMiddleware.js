exports.isLoggedIn = app.use((req, res, next) => {
  req.session.user;

  if (!req.session.user) {
    res.send(`You're not logged in`);
  }

  next();
});