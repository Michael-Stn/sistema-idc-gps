const pets = require('../models/pets');

const getPets = async (req, res) => {
  pets.find({ deleted: false }, '', (err, result) => {
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

const getPetsByCode = async (req, res) => {
  code = Number(req.params.code);
  pets.findOne({ code, deleted: false }, '', (err, result) => {
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

const getPetByCodeData = async (code) => {
  const myPromise = new Promise((resolve, reject) => {
    pets.findOne({ code, deleted: false }, '', (err, result) => {
      if (err) {
        reject('Error buscando mascota:' + err);
      } else {
        if (!result) {
          reject('No se encontró mascota:' + code);
        } else {
          resolve(result);
        }
      }
    });
  });
  return myPromise;
};

const createPet = async (req, res) => {
  body = req.body;
  pets.insertMany([body], (err, result) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.json({
        data: result,
      });
    }
  });
};

const updatePet = async (req, res) => {
  code = Number(req.params.code);
  body = req.body;
  pets.updateOne({ code }, body, (err, result) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.json({
        data: result,
      });
    }
  });
};

const deletePet = async (req, res) => {
  code = Number(req.params.code);
  pets.updateOne({ code }, { deleted: true }, (err, result) => {
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
  get: getPets,
  getByCode: getPetsByCode,
  getByCodeData: getPetByCodeData,
  create: createPet,
  update: updatePet,
  delete: deletePet,
};
