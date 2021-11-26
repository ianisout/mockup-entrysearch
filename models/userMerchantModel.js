const userMerchantList = require('../database/userMerchantList.json');

exports.findById = (id) =>
  userMerchantList.find((userMerchant) => userMerchant.ID === Number(id));
