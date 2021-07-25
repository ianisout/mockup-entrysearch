const fs = require('fs');
const { v4 } = require('uuid');
const bcryptjs = require('bcryptjs');
const users = require('../database/users.json');

exports.createUser = (name, email, password) => {
  let id = v4();
  let hashed = bcryptjs.hashSync(password);
  const newUser = { id, name, email, hashed };

  users.push(newUser);

  fs.writeFileSync('./database/users.json', JSON.stringify(users));

  return newUser;
};

exports.findByEmail = email => {
  const user = users.find(user => user.email === email);

  return user;
}