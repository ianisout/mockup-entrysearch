const express = require('express');
const router = express.Router();
const userMerchantController = require('../controllers/userMerchantController');

router.get('/', (req, res) => {
  res.render('index', { title: 'Mock up entry search site' });
});

router.get('/search', (req, res) => {
  if (!req.session.user) {
    return res.redirect('request-login');
  }
  let user = req.session.user;

  res.render('search', { user });
});

router.get('/request-login', (req, res) => {
  res.render('requestLogin');
});

router.post('/searchSelection', (req, res) => {
  const { id } = req.body;

  const userMerchant = userMerchantController.findById(id);

  if (!userMerchant) {
    return res.send('user/merchant not found');
  }

  res.render('searchSelection', userMerchant);
});

module.exports = router;
