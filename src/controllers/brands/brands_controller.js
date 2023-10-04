const mongoose = require('mongoose');
const express = require('express-session');
const {brand, user, product} = require('../../models/modelsInitialization');
const get_cart_quantity = require('../helpers/cart_quantity');

const brand_controller = async (req, res) => {

    const brand_found = await brand.find();

    const user_id = brand_found.map(brand => brand.user_id);

    const user_found = await user.find({ _id: user_id });

    const products_got = await product.find();

    let total_quantity = 0;

    if ( req.session.user ) {
        const current_user_id = req.session.user._id;
        total_quantity = await get_cart_quantity(current_user_id);
    }

    res.render('brand/brand', {
        title: 'Brand',
        layout: 'layouts/main',
        brands: brand_found,
        products: products_got,
        cart_items: total_quantity,
    });

};

const add_brand_controller = async (req, res) => {
    const name = req.body.category_name_data;
    const userId = req.session.user._id;
  
    const brand_found = await brand.find({ name });
  
    if ( brand_found.length !== 0 ) {
      return res.redirect('/category');
    }
  
    const new_brand = new brand({
      name,
      user_id: userId,
    });
  
    new_brand.save()
      .then(() => {
        console.log('New Brand added');
        return res.redirect('/brands?categoryAdded=true');
      })
      .catch((error) => console.log(error));
};

module.exports = {
    brand_controller,
    add_brand_controller,
};