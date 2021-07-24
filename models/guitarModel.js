const guitars = require('../database/guitars.json');
const { v4 } = require('uuid');
const fs = require('fs');

exports.returnListOfGuitars = () => {
  return guitars;
};

exports.addGuitar = (maker, model, year, price, stock) => {
  let id = v4();
  const newGuitar = { id, maker, model, year, price, stock };
  guitars.push(newGuitar);

  fs.writeFileSync('./database/guitars.json', JSON.stringify(guitars));

  return newGuitar;
};
