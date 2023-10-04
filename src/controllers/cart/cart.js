const { user, product, cart_item, imagesCollection } = require("../../models/modelsInitialization");
const session = require('express-session');
const get_cart_quantity = require('../helpers/cart_quantity');

const cart_controller = async (req, res) => {

    const user_id = req.session.user._id;

    //obtener la cantidad en el carrito de compras
    let totalQuantity = 0;

    if ( req.session.user ) {
        totalQuantity = await get_cart_quantity(req.session.user._id);
    }

    //get cart from logged user
    const get_cart = await cart_item.find({ user_id: user_id });

    //Get all products id from cart list
    const get_all_product_id = get_cart.map(
        (products) => products.product_id
    );

    //get all products
    const get_products = await product.find({ _id: { $in: get_all_product_id } });

    //get all images
    const get_images = await imagesCollection.find({ productId: { $in: get_all_product_id } });

    //setting a totalPrice
    let totalPrice = 0;

    //code made to in order to get the total price.
    for (let i = 0; i < get_products.length; i++) {
        const productId = get_products[i]._id.toString();
        let totalPriceForProduct = 0;
      
        for (let j = 0; j < get_cart.length; j++) {
          if (productId === get_cart[j].product_id.toString()) {
            totalPriceForProduct = get_products[i].price * get_cart[j].quantity;
            // console.log(totalPriceForProduct);
            break; // Salir del bucle interior una vez que se encuentre una coincidencia
          }
        }
      
        totalPrice += totalPriceForProduct;
    }

    res.render('cart/cart', {
        title: 'Carrito de compras',
        layout: 'layouts/main',
        cart_items: totalQuantity,
        products: get_products,
        images: get_images,
        cart: get_cart,
        totalPrice,
    });

};

const add_to_cart = async (req, res) => {

    const user_id = req.session.user._id;

    const product_id = req.body.product_id;

    //get product information
    const get_product_information = await product.find({ _id: product_id });

    //check if product stock is available
    if ( get_product_information[0].quantity < 1 ) {
    
        await product.findByIdAndUpdate( product_id, {
            available: 'no',
        } )
            .then(() => console.log('the product is no longer available'))
            .catch(err => console.log(err));

        return res.status(400).send("No hay suficiente stock disponible para este producto.");
    }

    //see if there's already a cart item created for this user in the database
    const get_cart_item_to_prevent = await cart_item.find({ product_id, user_id });

    //so now we have to reduce the amount of quantity
    await product.findByIdAndUpdate( product_id, {
        $inc: { quantity: -1 }, //reduce less in 1 this porperty of the object
    });

    if ( get_cart_item_to_prevent.length == 0 ) {
        //add the producto to cart list
        const new_cart_item = new cart_item({
            product_id,
            user_id,
            quantity: 1,
        });

        //save the new cart item object
        await new_cart_item.save()
            .then(() => { console.log('new cart item added ok'); })
            .catch((err) => { console.log(err); });
    } else {
        //edit the current cart items
        await cart_item.findByIdAndUpdate( get_cart_item_to_prevent[0]._id, {
            $inc: { quantity: +1 },
        });
    }

    //return the user to the product information view
    return res.redirect(`product/${product_id}/information`);

};

const reduce_cart = async (req, res) => {
    const user_id = req.session.user._id;

    const cart_id = req.params.id;

    //reducing quantity from user's cart
    const get_cart = await cart_item.findByIdAndUpdate( cart_id, {
        $inc: { quantity: -1 }
    });

    //so we restore available to yes
    await product.findByIdAndUpdate( get_cart.product_id, {
        available: 'yes',
    } )
        .then(() => console.log('the product is available'))
        .catch(err => console.log(err));

    const get_cart_object = await cart_item.find({ _id: cart_id });

    const product_id = get_cart_object[0].product_id;

    const get_product_object = await product.find({ _id: product_id });

    if ( get_cart_object[0].quantity == 0 ) {
        await cart_item.findOneAndDelete({ _id: cart_id });
    }

    await product.findByIdAndUpdate( product_id , {
        $inc: { quantity: +1 }
    });

    return res.redirect('/cart');
};

module.exports = {
    cart_controller,
    add_to_cart,
    reduce_cart,
};