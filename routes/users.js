const express = require('express');
const usersController = require('../controllers/usersController');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('respond with a resource');
});

router.get('/create', (req, res) => {
  res.render('createUser');
});

router.post('/create', (req, res) => {
  const { name, email, password } = req.body;

  const user = usersController.createUser(name, email, password);

  const { hashed, ...loggedUser } = user;

  req.session.user = loggedUser;

  res.redirect('../search');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = usersController.login(email, password);

  if (!user) {
    throw new Error('email or password incorrect');
  }

  const { hashed, ...loggedUser } = user;
  req.session.user = loggedUser;

  res.redirect('/search');
});

module.exports = router;
