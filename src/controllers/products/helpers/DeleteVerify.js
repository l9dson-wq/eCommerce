const { user, product } = require("../../../models/modelsInitialization");

const DeleteVerify = async (productId) => {
  await product.findByIdAndDelete(productId);
};

module.exports = DeleteVerify;
