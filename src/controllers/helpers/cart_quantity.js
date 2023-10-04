const { cart_item } = require("../../models/modelsInitialization");
const mongoose = require('mongoose');

const get_cart_quantity = async (user_id, ) => {

    //obtener la cantidad en el carrito de compras
    const user_id_to_objectId = new mongoose.Types.ObjectId(user_id);

    const cart_item_quantity = await cart_item.aggregate([
    { $match: { user_id: user_id_to_objectId } },
    { $group: { _id: "$user_id", totalQuantity: { $sum: "$quantity" } } }
    ]);
    

    let totalQuantity = 0;

    if ( !cart_item_quantity.length == 0 ) {
        totalQuantity = cart_item_quantity[0].totalQuantity
    } 

    return totalQuantity;
}

module.exports = get_cart_quantity;