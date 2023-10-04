const mongoose = require('mongoose');
const express = require('express-session');
const {brand, user, product} = require('../../models/modelsInitialization');

const DeleteBrand = async (req, res) => {

    const brandId = req.params.id;

};

module.exports = DeleteBrand;