const { category, cart_item, brand } = require('../../../models/modelsInitialization');
const get_cart_quantity = require('../../helpers/cart_quantity');

const renderProduct = async (req, res) => {

    const categories = await category.find();

    const brands = await brand.find();

    //obtener la cantidad en el carrito de compras
    let totalQuantity = 0;

    if ( req.session.user ) {
      totalQuantity = await get_cart_quantity(req.session.user._id);
    }

    res.render('products/insertProduct', {
        title: 'Insert product',
        layout: 'layouts/main',
        categories,
        cart_items: totalQuantity,
        brand: brands,
    });

};

module.exports = renderProduct;