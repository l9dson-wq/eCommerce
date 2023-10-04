const { product, favorites, category, imagesCollection, cart_item } = require("../models/modelsInitialization");
const session = require("express-session");
const get_cart_quantity = require("./helpers/cart_quantity");
const create_admin_user = require('./helpers/admin_user');

const indexController = async (req, res) => {

  create_admin_user();

  let favoritesProductsId = []; //creo una lista vacio
  const dataSearched = req.query.searched;

  if (req.session.user != undefined) {

    //obtengo el ID del usuario que esta logeado
    const userId = req.session.user._id; 

    //obtengo todos sus favoritos
    const favoritesFound = await favorites.find({ userId: userId }); 

    //almaceno todos los Id de los productos en mi lista vacia
    favoritesProductsId = favoritesFound.map(
      (favorites) => favorites.productId.toString()
    );

  }

  //Traer las categorias
  const categoriesList = await category.find();

  //Traer las fotos
  const imagesCollectionGot = await imagesCollection.find();

  let productList = undefined;

  if (dataSearched) {
    // Esta consulta debe devolver los primeros 5 productos que coincidan con el texto buscado y estén disponibles.
    productList = await product.find({ name: { $regex: dataSearched, $options: 'i' }, available: 'yes' }).limit(5);
  } else {
    // Esta consulta debe devolver los primeros 5 productos que estén disponibles.
    productList = await product.find({ available: 'yes' }).limit(5);
  }

  //obtener la cantidad en el carrito de compras
  let totalQuantity = 0;

  if ( req.session.user ) {
    totalQuantity = await get_cart_quantity(req.session.user._id);
  }

  res.render("index", {
    title: "index",
    layout: "layouts/main",
    products: productList,
    favoritesProducts: favoritesProductsId,
    category: categoriesList,
    imagesCollectionGot,
    cart_items: totalQuantity,
  });
};

module.exports = indexController;
