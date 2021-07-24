const GuitarModel = require('../models/GuitarModel');
const fs = require('fs');

exports.compileListOfGuitars = () => {
  const listGuitars = GuitarModel.returnListOfGuitars();

  return listGuitars;
};

exports.addGuitar = (maker, model, year, price, stock) => {
  GuitarModel.addGuitar(maker, model, year, price, stock);
};

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
