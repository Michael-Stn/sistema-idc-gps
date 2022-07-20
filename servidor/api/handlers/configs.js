const configs = require('../models/configs');

const getConfigs = async (req, res) => {
  configs.findOne({}, '', (err, result) => {
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

const createConfig = async (req, res) => {
  body = req.body;
  configs.insertMany([body], (err, result) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.json({
        data: result,
      });
    }
  });
};

const updateConfig = async (req, res) => {
  body = req.body;
  configs.updateOne({}, body, (err, result) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      if ('doSync' in body || 'intervalSync' in body) {
        configsMQ = {};
        if ('doSync' in body) {
          configsMQ.doSync = body.doSync;
        }
        if ('intervalSync' in body) {
          configsMQ.intervalSync = body.intervalSync;
        }
        const mqttClient = require('../services/mqtt');
        mqttClient.publish('iot/configs', JSON.stringify(configsMQ));
      }
      res.json({
        data: result,
      });
    }
  });
};

const getConfigData = async () => {
  const promise = new Promise((resolve, reject) => {
    configs.findOne({}, '', (err, result) => {
      if (err) {
        reject('Error get configs:', err);
      } else {
        resolve(result);
      }
    });
  });
  return promise;
};

module.exports = {
  get: getConfigs,
  getData: getConfigData,
  create: createConfig,
  update: updateConfig,
};
