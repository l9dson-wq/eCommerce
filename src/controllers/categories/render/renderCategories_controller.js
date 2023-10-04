const { user, product, category, cart_item } = require("../../../models/modelsInitialization");
const session = require('express-session');
const get_cart_quantity = require('../../helpers/cart_quantity');

const renderCategories = async (req, res) => {
  const categoryFound = await category.find();

  const userIds = categoryFound.map(users => users.createdBy);

  const userFound = await user.find({ _id: userIds });

  // Formatear los campos "created" de categoryFound
  const formattedCategories = categoryFound.map(category => {
    const createdDate = new Date(category.created);
    const dia = createdDate.getDate();
    const mes = createdDate.getMonth() + 1; // Los meses comienzan desde 0, se suma 1
    const anio = createdDate.getFullYear();
    const formattedDate = `${dia}/${mes}/${anio}`;

    return {
      ...category,
      created: formattedDate,
    };
  });

  //Obtener la cantidad de productos por categoria
  const productsGot = await product.find();

  //obtener la cantidad en el carrito de compras
  let totalQuantity = 0;

  if ( req.session.user ) {
    totalQuantity = await get_cart_quantity(req.session.user._id);
  }

  res.render("category/categories", {
    title: "Category",
    layout: "layouts/main",
    categories: formattedCategories,
    users: userFound,
    products: productsGot,
    cart_items: totalQuantity,
  });
};

module.exports = renderCategories;