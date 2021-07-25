const fs = require('fs');
const GuitarModel = require('../models/GuitarModel');

exports.compileListOfGuitars = () => {
  const listGuitars = GuitarModel.returnListOfGuitars();

  return listGuitars;
};

exports.findById = (id) => {
  guitar = GuitarModel.findById(id);

  return guitar;
};

exports.addGuitar = (maker, model, year, price, stock) =>
  GuitarModel.addGuitar(maker, model, year, price, stock);

exports.importGuitars = (path) => {
  const guitarInfoTxt = fs.readFileSync(path, 'UTF-8');
  const guitarInfo = JSON.parse(guitarInfoTxt);

  guitarInfo.forEach((item) =>
    GuitarModel.addGuitar(
      item.maker,
      item.model,
      item.year,
      item.price,
      item.stock
    )
  );

  fs.unlinkSync(path);
};