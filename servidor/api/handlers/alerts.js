const alerts = require('../models/alerts');
const petsHandler = require('../handlers/pets');

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
          result[i].infoPet = await petsHandler.getByCodeData(
            result[i].codePet
          );
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
          result.infoPet = await petsHandler.getByCodeData(result.codePet);
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

const getLastAlertData = async (codePet) => {
  const promise = new Promise((resolve, reject) => {
    alerts
      .findOne({ codePet })
      .sort({ date: -1 })
      .exec((err, result) => {
        if (err) {
          reject('ERROR get last alert:', err);
        } else {
          resolve(result);
        }
      });
  });
  return promise;
};

const createAlertData = async (data) => {
  const promise = new Promise((resolve, reject) => {
    alerts.insertMany([data], (err, result) => {
      if (err) {
        reject('ERROR create alert', err);
      } else {
        resolve(result);
      }
    });
  });
  return promise;
};

module.exports = {
  get: getAlerts,
  getByCode: getAlertsByCode,
  getLastData: getLastAlertData,
  create: createAlert,
  createData: createAlertData,
  update: updateAlert,
  delete: deleteAlert,
};
