const fs = require('fs');
const { v4 } = require('uuid');
const guitars = require('../database/guitars.json');

exports.returnListOfGuitars = () => {
  return guitars;
};

exports.findById = (id) => guitars.find((guitar) => guitar.id === id);

exports.addGuitar = (maker, model, year, price, stock) => {
  let id = v4();
  const newGuitar = { id, maker, model, year, price, stock };
  guitars.push(newGuitar);

  fs.writeFileSync('./database/guitars.json', JSON.stringify(guitars));

  return newGuitar;
};

exports.deleteGuitar = (id) => {};
