const {
  user,
  product,
  favorites,
  imagesCollection,
  viewCount,
  cart_item, 
} = require("../../../models/modelsInitialization");
const session = require("express-session");
const get_cart_quantity = require('../../helpers/cart_quantity');

const renderFavorites = async (req, res) => {

  if ( !req.session ) {
    res.redirect('/login');
  }

  try {
    //Find favorites list of the current user logged
    const favoritesFound = await favorites.find({
      userId: req.session.user._id,
    });

    //Get all products id from the favorite list
    const favoritesProductsId = favoritesFound.map(
      (favorites) => favorites.productId
    );

    //get all favorites products
    const favoriteProducts = await product.find({
      _id: { $in: favoritesProductsId },
    });


    //get all sellers id from the products
    const productsSellersId = favoriteProducts.map(
      (userIds) => userIds.userId
    );

    //get sellers information
    const sellersInformationGot = await user.find({
      _id: { $in: productsSellersId },
    });

    //get products images
    const getImageCollection = await imagesCollection.find({
      productId: { $in: favoritesProductsId }
    });
    
    //obtener la cantidad en el carrito de compras
    let totalQuantity = 0;

    if ( req.session.user ) {
      totalQuantity = await get_cart_quantity(req.session.user._id);
    }

    res.render("favorites/favorites", {
      title: "favorites",
      layout: "layouts/main",
      favorites: favoriteProducts,
      seller: sellersInformationGot,
      productImages: getImageCollection,
      cart_items: totalQuantity,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("error trying to obtaing favorite products");
  }
};

const addFavorite = async (req, res) => {
  const userId = req.session.user._id;
  const productId = req.query.productId;

  const favoriteData = new favorites({
    productId,
    userId,
  });

  try {
    await favoriteData.save();

    console.log("favorite added");

    res.redirect("/");
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deleteFavorite = async (req, res) => {
  const userId = req.session.user._id;
  const productId = req.query.productId;

  try {
    await favorites.findOneAndDelete({ userId: userId, productId: productId });

    console.log("favorite deleted");

    res.redirect("/");
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  renderFavorites,
  addFavorite,
  deleteFavorite,
};
