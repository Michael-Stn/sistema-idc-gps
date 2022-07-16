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
  },
  { collection: 'Tracks' }
);

module.exports = mongoose.model('Tracks', tracks);
