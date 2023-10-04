const { user, product, imagesCollection, cart_item, viewCount } = require('../../models/modelsInitialization');
const session = require('express-session');
const get_cart_quantity = require('../helpers/cart_quantity');

const productsController = async (req, res) => {

    if( req.session && req.session.user ){
        //traigo todos los productos del usuario registrado
        const productList = await product.find({ userId: req.session.user._id });

        //Traer las imagenes del producto
        const imagesCollectionFound = await imagesCollection.find();

        //obtener la cantidad en el carrito de compras
        let totalQuantity = 0;

        if ( req.session.user ) {
            totalQuantity = await get_cart_quantity(req.session.user._id);
        }

        //Get view counts for each product
        const get_view_count = await viewCount.find();
        
        res.render('products/products', {
            title: 'products',
            layout: 'layouts/main',
            products: productList,
            imagesCollectionFound,
            cart_items: totalQuantity,
            views: get_view_count,
        });

    }else {
        return res.redirect('/');
    }

};

module.exports = {
    productsController,
};