const alerts = require('../models/alerts');
const pets = require('../models/pets');

const _getPetByCode = async (code) => {
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

const getAlerts = async (req, res) => {
  alerts.find({ deleted: false }, '', async (err, result) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      if (!result) {
        res.status(404).json({
          data: result,
        });
      } else {
        for (const i in result) {
          result[i] = JSON.parse(JSON.stringify(result[i]));
          result[i].infoPet = await _getPetByCode(result[i].codePet);
        }
        res.json({
          data: result,
        });
      }
    }
  });
};

const getAlertsByCode = async (req, res) => {
  code = Number(req.params.code);
  alerts.findOne({ code }, '', async (err, result) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      if (!result) {
        res.status(404).json({
          data: result,
        });
      } else {
        for (const i in [result]) {
          result = JSON.parse(JSON.stringify(result));
          result.infoPet = await _getPetByCode(result.codePet);
        }
        res.json({
          data: result,
        });
      }
    }
  });
};

const createAlert = async (req, res) => {
  body = req.body;
  alerts.insertMany([body], (err, result) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.json({
        data: result,
      });
    }
  });
};

const updateAlert = async (req, res) => {
  code = Number(req.params.code);
  body = req.body;
  alerts.updateOne({ code }, body, (err, result) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.json({
        data: result,
      });
    }
  });
};

const deleteAlert = async (req, res) => {
  res.status(501).json({ message: 'Metodo no implementado' });
};

module.exports = {
  get: getAlerts,
  getByCode: getAlertsByCode,
  create: createAlert,
  update: updateAlert,
  delete: deleteAlert,
};
