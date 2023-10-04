const indexController = require("./index_controller");
const loginController = require("./user/login_controller");
const registerController = require("./user/register_controller");
const insertUserData = require("./user/insertUser_controller");
const loginUserController = require("./user/loginUser_controller");
const userLogout = require("./session/logOut_controller");
const { productsController } = require("./products/products_controller");
const inserProduct = require("./products/insertProduct_controller");
const renderProduct = require("./products/render/renderProduct_controller");
const renderProductInformation = require("./products/render/renderProductInformation_controller");
const {
  editProduct,
  editProductPost,
} = require("./products/editProduct_controller");
const deleteProduct = require("./products/deleteProduct_controller");
const { renderFavorites, addFavorite, deleteFavorite } = require("./favorites/render/renderFavorites");
const renderCategories = require('./categories/render/renderCategories_controller');
const addCategory = require('./categories/addCategory_controller');
const renderSearch = require('./searching/renderSearch');
const emailConfirmed = require('./email/emailConfirmed_controller');
const multerSingle = require('./middlewares/multerSingleFile');
const multerMultiple = require('./middlewares/multerMultipleFiles');
const uploadMultipleWithDifferentNames = require('./middlewares/multerForEachOne');
const sellerInformationController = require('./seller/sellerInformationController');
const userProfileController = require('./user/userProfile/userProfileController');
const editUserProfileController = require('./user/userProfile/editUserProfileController');
const { add_to_cart, cart_controller, reduce_cart} = require('./cart/cart');
const {
  paymentController,
  payment_cancel_controller,
  payment_success_controller,
} = require('./payments/payment.controller');
const rate_product = require('./rate/product_rating');
const { brand_controller,add_brand_controller } = require('./brands/brands_controller');

module.exports = {
  indexController,
  loginController,
  registerController,
  insertUserData,
  loginUserController,
  userLogout,
  productsController,
  inserProduct,
  renderProduct,
  renderProductInformation,
  editProduct,
  editProductPost,
  deleteProduct,
  renderFavorites,
  addFavorite,
  deleteFavorite,
  renderCategories,
  addCategory,
  renderSearch,
  emailConfirmed,
  multerSingle,
  multerMultiple,
  uploadMultipleWithDifferentNames,
  sellerInformationController,
  userProfileController,
  editUserProfileController,
  cart_controller,
  add_to_cart,
  reduce_cart,
  paymentController,
  payment_cancel_controller,
  payment_success_controller,
  rate_product,
  brand_controller,
  add_brand_controller,
};
