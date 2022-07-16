const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let alerts = new Schema(
  {
    code: {
      type: Number,
    },
    title: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    codePet: {
      type: Number,
    },
    distance: {
      type: Number,
    },
  },
  { collection: 'Alerts' }
);

module.exports = mongoose.model('Alerts', alerts);
