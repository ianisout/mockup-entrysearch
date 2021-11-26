const userMerchantModel = require('../models/userMerchantModel');

exports.findById = (id) => {
  userMerchant = userMerchantModel.findById(id);

  return userMerchant;
};
