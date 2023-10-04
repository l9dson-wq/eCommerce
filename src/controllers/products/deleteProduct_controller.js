const { user, product, imagesCollection, cart_item } = require("../../models/modelsInitialization");

const deleteProduct = async (req, res) => {

  //get product's id
  const productId = req.query.productId;

  //get product's images collection
  const get_image_collection = await imagesCollection.find({ productId });

  //get all cars with this id
  const get_carts = await cart_item.find({ product_id: productId });

  try {
    await product.deleteOne({ _id: productId });

    await imagesCollection.findByIdAndDelete(get_image_collection[0]._id)
      .then(() => console.log("the product's images were successfully deleted"))
      .catch(err => console.log(err));

    get_carts.forEach( async (cart) => {
      await cart_item.findByIdAndDelete({ _id: cart._id });
    });

    res.redirect("/products");
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = deleteProduct;
