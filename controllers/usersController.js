const bcryptjs = require('bcryptjs');
const usersModel = require('../models/usersModel');

exports.createUser = (name, email, password) => {
  const user = usersModel.createUser(name, email, password);

  return user;
};

exports.login = (email, password) => {
  const user = usersModel.findByEmail(email);

  if (!user) {
    throw new Error("Something's wrong");
  }

  if (!bcryptjs.compareSync(password, user.hashed)) {
    throw new Error("Something's wrong");
  }

  return user;
};
