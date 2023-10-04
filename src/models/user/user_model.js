const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        maxlength: 50,
    },
    lastName:{
        type: String,
        required: true,
        maxlength: 50,
    },
    age: {
        type: Number,
        required: true,
        maxlength: 4,
    },
    country:{
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
        maxlength: 50,
    },
    phone: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    imagePath: {
        type: String,
        required: true,
    },
    userType: {
        type: String,
        default: 'User',
    },
    emailConfirmed: {
        type: String,
        default: 'no',
    },
    created: {
        type: Date,
        default: Date.now,
    },
});

module.exports = userSchema;