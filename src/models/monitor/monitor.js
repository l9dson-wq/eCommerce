const mongoose = require('mongoose');

const monitorSchema = new mongoose.Schema({
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'products',
    required: true,
  },
  timeStamp: {
    type: Date,
    default: Date.now,
  }
});

module.exports = monitorSchema;