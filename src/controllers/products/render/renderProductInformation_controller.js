const session = require("express-session");
const { user, product, imagesCollection, viewCount, cart_item } = require("../../../models/modelsInitialization");
const DeleteVerify = require("../helpers/DeleteVerify");
const get_cart_quantity = require('../../helpers/cart_quantity');

const renderProductInformation = async (req, res) => {

  const productId = req.params.id;
  let user_id = undefined;

  if ( req.session && req.session.user ) {
    user_id = req.session.user._id;
  }

  //Busco la informacion del producto por su ID
  const productFound = await product.find({ _id: productId });

  const sellerID = productFound[0].userId;

  //Traer la informacion del vendedor por ID
  const seller = await user.find({ _id: sellerID });

  //Verifico que el vendedor existe, sino el producto es eliminado
  if (seller.length == 0) {
    DeleteVerify(productFound[0]._id);
    return res.redirect("/");
  }

  //traer la coleccion de imagenes
  const imagesCollectionGot = await imagesCollection.find({ productId: productFound[0]._id });

  //ejecutar la accion de las vistas
  const getViewcount = await viewCount.find({ productId: productId });
  
  if ( getViewcount.length == 0 ) {

    const newViewCount = new viewCount({
      productId,
      count: 1,
    });

    await newViewCount.save()
      .then( () => console.log('new view count added') )
      .catch(err => console.log(err));

  } 

  // if ( session && req.session.user ) {

  //   if ( sellerID.toString() !== req.session.user._id ) {

  //     const getIdFromViewCount = getViewcount[0]._id;
  
  //     await viewCount.findByIdAndUpdate( getIdFromViewCount, {
  //       $inc: { count: 1 }, //Incrementamos el campo
  //     } )
  //       .then( () => console.log('view count ++') )
  //       .catch( err => console.log(err) );
  
  //   }

  // }

  //obtener la cantidad en el carrito de compras
  let totalQuantity = 0;

  if ( req.session.user ) {
      totalQuantity = await get_cart_quantity(req.session.user._id);
  }

  res.render("products/productInformation", {
    title: "Product information",
    layout: "layouts/main",
    product: productFound[0],
    seller: seller[0],
    imagesCollectionGot: imagesCollectionGot[0],
    cart_items: totalQuantity,
  });
};

module.exports = renderProductInformation;