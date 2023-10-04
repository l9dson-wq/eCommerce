const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        maxlength: 50,
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    imagePath:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'imagescollections',
        required: false,
    },
    rate:{
        type: Number,
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
    quantity:{
        type: Number,
        required: true, 
    },
    companyName:{
        type: String,
        required: true,
        maxLength: 100,
    },
    description: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: false,
    },
    available: {
        type: String,
        required: true,
    },
    created:{
        type: Date,
        default: Date.now,
    },
    modified:{
        type: Date,
        deafult: Date.now,
        required: false,
    }
});

module.exports = productSchema;