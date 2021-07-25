const bcryptjs = require('bcryptjs');
const usersModel = require('../models/usersModel');

exports.createUser = (name, email, password) => {
  const user = usersModel.createUser(name, email, password);

  return user;
};

exports.login = (email, password) => {
  const user = usersModel.findByEmail(email);

  console.log(user);

  if (!user) {
    throw new Error('Not in the database');
  }

  if (!bcryptjs.compareSync(password, user.hashed)) {
    throw new Error('Password shit');
  }

  return user;
};
