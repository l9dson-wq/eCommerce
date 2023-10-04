const { user, product, cart_item, imagesCollection } = require("../../models/modelsInitialization");
const Stripe = require('stripe');
const session = require('express-session');
const get_cart_quantity = require("../helpers/cart_quantity");

//My Stripe key ( only for testing ).
const stripe = new Stripe('sk_test_51NUtQKJSpEXxQWaJ8sDrJheNWf07e9mzAzfn8NHlSAsdKhDl9A5MyhZQlU7S9oCjGFyyQMX763dZnp7PpPMIFy0b002XDKPhy5');

const paymentController = async (req, res) => {

    // get current user ID
    const user_id = req.session.user._id;

    //get cart from logged user
    const get_cart = await cart_item.find({ user_id: user_id });

    if ( get_cart.length > 0 ) {
        //Get all products id from cart list
        const get_all_product_id = get_cart.map(
            (products) => products.product_id
        );

        //get all products
        const get_products = await product.find({ _id: { $in: get_all_product_id } });

        //get all images
        const get_images = await imagesCollection.find({ productId: { $in: get_all_product_id } });

        const lineItemsList = [];

        get_products.forEach((product) => {
            // const matchingImage = get_images.find((image) => image.productId.toString() === product._id.toString());
            const matchingCartItem = get_cart.find((cartItem) => cartItem.product_id.toString() === product._id.toString());

            const line_items = {
                price_data: {
                    product_data: {
                        name: product.name,
                        description: product.description,
                    },
                    currency: 'usd',
                    unit_amount: product.price * 100, // 20000 = 200.00
                },
                quantity: matchingCartItem.quantity,
            };

            lineItemsList.push(line_items);
        });
        
        const stripe_session = await stripe.checkout.sessions.create({
            line_items: lineItemsList,
            mode: 'payment',
            success_url: 'http://localhost:5000/payment_success',
            cancel_url: 'http://localhost:5000/payment_cancel',
        })

        return res.json(stripe_session);
    } else {
        return res.redirect('/cart');
    }
}

const payment_cancel_controller = async (req, res) => {

    //get cart quantity
    let totalQuantity = 0;

    if ( req.session.user ) {
        totalQuantity = await get_cart_quantity(req.session.user._id);
    }

    res.render('payments/payment_cancel', {
        title: 'Payment Cancel',
        layout: 'layouts/main',
        cart_items: totalQuantity,
    });
};

const payment_success_controller = async (req, res) => {

    //get cart quantity
    let totalQuantity = 0;

    if ( req.session.user ) {
        totalQuantity = await get_cart_quantity(req.session.user._id);
    }

    //Get user Id
    const user_id = req.session.user._id;

    //get user's cart
    const get_cart_of_user = await cart_item.find({ user_id: user_id });

    //delete the user's cart
    get_cart_of_user.forEach(async (cart) => {
        await cart_item.findByIdAndDelete(cart._id)
            .then(() => console.log('cart has been deleted successfully'))
            .catch(err => console.log(err));
    });

    res.render('payments/payment_success', {
        title: 'Payment success',
        layout: 'layouts/main',
        cart_items: totalQuantity,
    });
};


module.exports = {
    paymentController,
    payment_cancel_controller,
    payment_success_controller,
};