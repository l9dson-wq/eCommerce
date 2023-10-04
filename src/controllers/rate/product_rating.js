const mongoose = require('mongoose');
const { product_rate_schema, user, product } = require('../../models/modelsInitialization');
const session = require('express-session');

const rate_product = async (req, res) => {

    const productId = req.params.productId;
    const rating = req.body.rating;
  
    // Simulación de almacenamiento en una base de datos
    // En un servidor real, aquí debes procesar y guardar la calificación en tu base de datos
    console.log('Recibido productId:', productId);
    console.log('Recibida calificación:', rating);

    //proccess

};

module.exports = rate_product;