const tracks = require('../models/tracks');

const getTracks = async (req, res) => {
  tracks.find({}, '', (err, result) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      if (!result) {
        res.status(404).json({
          data: result,
        });
      } else {
        res.json({
          data: result,
        });
      }
    }
  });
};

const getTracksByCodePet = async (req, res) => {
  codePet = Number(req.params.code);
  tracks.find({ codePet }, '', (err, result) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      if (!result) {
        res.status(404).json({
          data: result,
        });
      } else {
        res.json({
          data: result,
        });
      }
    }
  });
};

const createTrack = async (req, res) => {
  body = req.body;
  tracks.insertMany([body], (err, result) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.json({
        data: result,
      });
    }
  });
};

module.exports = {
  get: getTracks,
  getByPet: getTracksByCodePet,
  create: createTrack,
};
