const express = require("express");
const router = express.Router();
const {
  isAuthenticated,
  isAuthenticatedAsAdmin,
} = require("./controllers/session/authSession_controller");
const controllers =  require('./controllers/index');

// Unprotected routes
//GET
router.get("/", controllers.indexController);
router.get("/login", controllers.loginController);
router.get("/register", controllers.registerController);
router.get("/product/:id/information", controllers.renderProductInformation);
router.get("/delete_product", controllers.deleteProduct);
router.get("/searched", controllers.renderSearch);
router.get("/emailVerification", controllers.emailConfirmed);
router.get("/sellerInformation/:id/information", controllers.sellerInformationController);
//POST
router.post("/insert_user", controllers.multerSingle, controllers.insertUserData);
router.post("/login", controllers.loginUserController);
router.post("/insert_product", controllers.multerMultiple, controllers.inserProduct);
router.post("/edit_product", controllers.uploadMultipleWithDifferentNames, controllers.editProductPost);
router.post("/add_category", controllers.addCategory);
router.post("/user/edit", controllers.editUserProfileController);

//Protected routes
//GET
router.get("/logout", isAuthenticated, controllers.userLogout);
router.get("/products", isAuthenticated, controllers.productsController);
router.get("/insertProduct", isAuthenticated, controllers.renderProduct);
router.get("/editProduct", isAuthenticated, controllers.editProduct);
router.get("/favorites", isAuthenticated, controllers.renderFavorites);
router.get("/add_favorite", isAuthenticated, controllers.addFavorite);
router.get("/delete_favorite", isAuthenticated, controllers.deleteFavorite);
router.get("/category", isAuthenticatedAsAdmin, controllers.renderCategories);
router.get("/user/:id/profile", isAuthenticated, controllers.userProfileController);
router.get("/product/:id/delete", isAuthenticated, controllers.userProfileController);
router.get("/cart", isAuthenticated, controllers.cart_controller);
router.get("/reduce_cart/:id", isAuthenticated, controllers.reduce_cart);
router.post("/payment", isAuthenticated, controllers.paymentController);
router.get("/payment_cancel", isAuthenticated, controllers.payment_cancel_controller);
router.get("/payment_success", isAuthenticated, controllers.payment_success_controller);
router.get("/brands", isAuthenticatedAsAdmin, controllers.brand_controller);
//POST
router.post("/add_to_cart", isAuthenticated, controllers.add_to_cart);
router.post("/rate_product", isAuthenticated, controllers.rate_product);
router.post("/add_new_brand", isAuthenticatedAsAdmin, controllers.add_brand_controller);

module.exports = router;