const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let pets = new Schema(
  {
    code: {
      type: Number,
    },
    name: {
      type: String,
    },
    doTrack: {
      type: Boolean,
      default: true
    },
    color: {
      type: String,
    },
    deleted: {
      type: Boolean,
      default: false
    },
  },
  { collection: 'Pets' }
);

module.exports = mongoose.model('Pets', pets);
