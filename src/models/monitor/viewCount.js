const mongoose = require('mongoose');

const viewCountSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'products',
    required: true,
  },
  count: {
    type: Number,
    required: true,
  }
});

module.exports = viewCountSchema;