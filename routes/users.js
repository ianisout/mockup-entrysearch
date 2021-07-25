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
  // saved in a variable so you can use it inside the session

  req.session.user = user;
  //  CREATES ".user" inside the session and passing the user

  console.log({user})

  res.redirect('../guitars');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  let user = usersController.login(email, password);

  if (!user) {
    throw new Error("can't log in");
  }

  console.log({user})

  res.redirect('/guitars');
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.send('worked');
});

module.exports = router;
