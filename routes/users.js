const express = require('express');
const usersController = require('../controllers/usersController');
const sessionController = require('../controllers/sessionController');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('respond with a resource');
});

// USER CREATION
router.get('/create', (req, res) => {
  res.render('createUser');
});

router.post('/create', (req, res) => {
  const { name, email, password } = req.body;

  const user = usersController.createUser(name, email, password);
  // saved in a variable so you can use it inside the session

  sessionController.createSession(user.id, { user }); // req.session.user = user;
  //  CREATES ".user" inside the session and passing the user

  res.cookie('IDsession', user.id);
  res.redirect('../guitars');
});

// USER LOGIN
router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = usersController.login(email, password);

  if (!user) {
    throw new Error("can't log in with these credentials");
  }

  sessionController.createSession(user.id, { user });

  res.cookie('IDsession', user.id);

  res.redirect('/guitars');
});

// USER LOGOUT

router.get('/logout', (req, res) => {
  let sessionID = sessionController.getSession(req.cookies.IDsession);

  sessionController.logout(sessionID)

  res.redirect('/');
});

module.exports = router;
