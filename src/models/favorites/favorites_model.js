const mongoose = require('mongoose');

const favoritesSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    created:{
        type: Date,
        default: Date.now,
    },
});

module.exports = favoritesSchema;