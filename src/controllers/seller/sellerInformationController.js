const session = require("express-session");
const { user, product, imagesCollection, userProfileDescription } = require("../../models/modelsInitialization");
const get_cart_quantity = require('../helpers/cart_quantity');

const sellerInformationController = async (req, res) => {

  const obtainSellerId = req.params.id;;

  const getSellerInformation = await user.find({ _id: obtainSellerId });

  const getAllProductOfTheSeller = await product.find({ userId: obtainSellerId });

  const quantityOfProducts = getAllProductOfTheSeller.length;

  const getSellerIdFromDb = getSellerInformation[0]._id;

  const getUserProfileDescription = await userProfileDescription.find({ userId: getSellerIdFromDb });

  //obtener la fecha de creacion del perfil
  const userDate = getSellerInformation[0].created;
  const day = userDate.getDate();
  const month = userDate.getMonth() + 1;
  const year = userDate.getFullYear();

  const fullDate = `${day}/${month}/${year}`;

  //obtener la cantidad en el carrito de compras
  let totalQuantity = 0;

  if ( req.session.user ) {
      totalQuantity = await get_cart_quantity(req.session.user._id);
  }

  res.render('seller/sellerInformation', {
    title: 'seller information',
    layout: 'layouts/main',
    sellerInformation: getSellerInformation[0],
    allProducts: getAllProductOfTheSeller,
    quantityOfProducts,
    sellerExtraInformation: getUserProfileDescription[0],
    userCreatedProfile: fullDate,
    cart_items: totalQuantity,
  });

};

module.exports = sellerInformationController;