const mongoose = require('mongoose');

const brand_schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    modified_at: {
        type: Date,
        deafult: Date.now,
        required: false,
    }
});

module.exports = brand_schema;