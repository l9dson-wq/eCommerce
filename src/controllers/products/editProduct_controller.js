const { user, product, imagesCollection, category, cart_item } = require("../../models/modelsInitialization");
const session = require("express-session");
const fs = require("fs");
const get_cart_quantity = require('../helpers/cart_quantity');

//RENDERIZAR
const editProduct = async (req, res) => {
  const productId = req.query.productId;

  //OBTENER LA INFORMACION DEL PRODUCTO
  const productFound = await product.find({ _id: productId });

  //TRAER LAS IMAGENES
  const imagesCollectionFound = await imagesCollection.find({ productId: productFound[0]._id });

  //GET ALL CATEGORIES
  const getAllCategories = await category.find();


  //obtener la cantidad en el carrito de compras
  let totalQuantity = 0;

  if ( req.session.user ) {
      totalQuantity = await get_cart_quantity(req.session.user._id);
  }

  res.render("products/editProducts", {
    title: "editing",
    layout: "layouts/main",
    product: productFound[0],
    imagesCollectionFound: imagesCollectionFound[0],
    categories: getAllCategories,
    cart_items: totalQuantity,
  });
};

//EJECUTAR EDICION
const editProductPost = async (req, res) => {

  const productId = req.body.productId;
  const userId = req.session.user._id;
  const files = req.files;

  const { name, price, rate, quantity, category, companyName, description, imagesCollectionId } = req.body;

  let rutaArchivo = "";
  let newImagesPaths = [];

  if (files) {

    let editImage1 = '';
    let editImage2 = '';
    let editImage3 = '';
    let editImage4 = '';
    
    for (let i = 1; i < 5; i++) {
      if (files[`image${i}`]) {
        const imageContent = files[`image${i}`][0];
    
        let rutaArchivo = "uploads/pfps/" + imageContent.originalname;
    
        fs.rename(imageContent.path, "public/uploads/pfps/" + imageContent.originalname, (err) => {
          if (err) throw err;
        });
    
        switch (i) {
          case 1:
            editImage1 = rutaArchivo;
            console.log("🚀 ~ file: editProduct_controller.js:52 ~ editProductPost ~ editImage1:", editImage1);
            await imagesCollection.findByIdAndUpdate(imagesCollectionId, { imagePath1: editImage1 });
            break;
          case 2:
            editImage2 = rutaArchivo;
            console.log("🚀 ~ file: editProduct_controller.js:56 ~ editProductPost ~ editImage2:", editImage2);
            await imagesCollection.findByIdAndUpdate(imagesCollectionId, { imagePath2: editImage2 });
            break;
          case 3:
            editImage3 = rutaArchivo;
            console.log("🚀 ~ file: editProduct_controller.js:60 ~ editProductPost ~ editImage3:", editImage3);
            await imagesCollection.findByIdAndUpdate(imagesCollectionId, { imagePath3: editImage3 });
            break;
          case 4:
            editImage4 = rutaArchivo;
            console.log("🚀 ~ file: editProduct_controller.js:64 ~ editProductPost ~ editImage4:", editImage4);
            await imagesCollection.findByIdAndUpdate(imagesCollectionId, { imagePath4: editImage4 });
            break;
          default:
            break;
        }
      }
    }    
  }
  

  try {
    await product.findByIdAndUpdate(productId, {
      name,
      price,
      imagePath: imagesCollectionId,
      rate,
      quantity,
      category,
      companyName,
      description,
    });

    const get_product = await product.find({ _id: productId });

    if ( get_product[0].quantity > 0 ) {
      await product.findByIdAndUpdate(get_product[0]._id, {
        available: 'yes',
      })
        .then(() => console.log('available was retore in edition'))
        .catch(err => console.log(err));
    }

    return res.redirect("/products");
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  editProduct,
  editProductPost,
};
