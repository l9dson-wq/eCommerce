const mongoose = require('mongoose');

const userProfileDescription = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  webSite: {
    type: String,
    required: false,
  },
  socialProfile1: {
    type: String,
    required: false,
  },
  // socialProfile2: {
  //   type: String,
  //   required: false,
  // },
  // socialProfile3: {
  //   type: String,
  //   required: false,
  // },
  companyName: {
    type: String, 
    required: false,
  },
  created:{
    type: Date,
    default: Date.now,
    required: false,
  },
  modified:{
      type: Date,
      deafult: Date.now,
      required: false,
  }
});

module.exports = userProfileDescription;