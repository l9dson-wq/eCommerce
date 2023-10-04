const mongoose = require('mongoose');

const imagesCollectionSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'products',
    required: false,
  },
  imagePath1: {
    type: String,
    required: true,
  },
  imagePath2: {
    type: String,
    required: false,
  },
  imagePath3: {
    type: String,
    required: false,
  },
  imagePath4: {
    type: String,
    required: false,
  },
});

module.exports = imagesCollectionSchema;