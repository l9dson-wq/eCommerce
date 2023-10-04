const session = require("express-session");
const { user, product, imagesCollection, userProfileDescription, cart_item } = require("../../../models/modelsInitialization");
const get_cart_quantity = require('../../helpers/cart_quantity');

const userProfileController = async (req, res) => {

  const userId = req.params.id;
  
  const getUserInformation = await user.find({ _id: userId });

  //Si el usuario que intenta acceder no es el usuario del perfil este vuelve a la pagina principal
  if ( getUserInformation[0]._id.toString() !== req.session.user._id ) {
    return res.redirect('/');
  }

  const getuserProfileDescription = await userProfileDescription.find({ userId: req.session.user._id });

  //obtener la cantidad en el carrito de compras
  let totalQuantity = 0;

  if ( req.session.user ) {
      totalQuantity = await get_cart_quantity(req.session.user._id);
  }

  res.render('user/userProfile/userProfile', {
    title: 'User profile',
    layout: 'layouts/main',
    user: getUserInformation[0],
    description: getuserProfileDescription[0],
    cart_items: totalQuantity,
  });

};

module.exports = userProfileController;