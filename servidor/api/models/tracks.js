const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let tracks = new Schema(
  {
    codePet: {
      type: Number,
    },
    datetime: {
      type: Date,
      default: Date.now,
    },
    lat: {
      type: Number,
    },
    lon: {
      type: Number,
    },
    distance: {
      type: Number,
      default: 0,
    },
  },
  { collection: 'Tracks' }
);

module.exports = mongoose.model('Tracks', tracks);
