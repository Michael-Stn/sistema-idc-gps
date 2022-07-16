const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let configs = new Schema(
  {
    doSync: {
      type: Boolean,
      default: true,
    },
    intervalSync: {
      type: Number,
      default: 1,
    },
    homeLat: {
      type: Number,
    },
    homeLon: {
      type: Number,
    },
    doAlert: {
      type: Boolean,
      default: true,
    },
    distanceAlert: {
      type: Number,
      default: 20,
    },
    intervalAlert: {
      type: Number,
      default: 15,
    },
  },
  { collection: 'Configs' }
);

module.exports = mongoose.model('Configs', configs);
