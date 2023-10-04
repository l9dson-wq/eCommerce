const mongoose = require("mongoose");

// Imports
const userModel = require("./user/user_model");
const productSchema = require("./products/product_model");
const categorySchema = require("./categories/category_model");
const favoritesSchema = require("./favorites/favorites_model");
const imagesCollectionSchema = require("./ImagesCollection/imagesCollection");
const userProfileDescription = require("./user/userProfileDescription");
const viewCountSchema = require('./monitor/viewCount');
const cart_item = require('./shopping_car/cart_item');
const userActivitySchema = require('./userActivity/userActivity');
const product_rate_schema = require('./product_rate/product_rate');
const brand_schema = require('./brands/brands');

module.exports = {
  user: mongoose.model("users", userModel),
  product: mongoose.model("products", productSchema),
  category: mongoose.model("categories", categorySchema),
  favorites: mongoose.model("favorites", favoritesSchema),
  imagesCollection: mongoose.model("imagesCollection", imagesCollectionSchema),
  userProfileDescription: mongoose.model("userProfileDescription", userProfileDescription),
  viewCount: mongoose.model('viewCount', viewCountSchema),
  cart_item: mongoose.model('cart_item', cart_item),
  user_activity: mongoose.model('user_activity', userActivitySchema),
  product_rate: mongoose.model('product_rate', product_rate_schema),
  brand: mongoose.model('brands', brand_schema),
};
