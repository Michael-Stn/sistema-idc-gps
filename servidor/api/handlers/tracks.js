const tracks = require('../models/tracks');
const configHandler = require('../handlers/configs');
const alertsHandler = require('../handlers/alerts');
const petsHandler = require('../handlers/pets');

const getTracks = async (req, res) => {
  const { limit, order } = req.query;
  const query = tracks.find({});
  if (order) {
    query.sort({ datetime: order === 'asc' ? 1 : -1 });
  }
  if (limit) {
    query.limit(limit);
  }
  query.exec((err, result) => {
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
  const { limit, order } = req.query;
  const query = tracks.find({ codePet });
  if (order) {
    query.sort({ datetime: order === 'asc' ? 1 : -1 });
  }
  if (limit) {
    query.limit(limit);
  }
  query.exec((err, result) => {
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
  try {
    body = req.body;
    if (body.lat && body.lon) {
      const configs = await configHandler.getData();
      body.distance = _getMeters(
        configs.homeLat,
        configs.homeLon,
        body.lat,
        body.lon
      );
      if (body.distance >= configs.distanceAlert) {
        const lastAlert = await alertsHandler.getLastData(body.codePet);
        const diffMinutes = parseInt(
          (new Date() - new Date(lastAlert.date ?? null)) / (1000 * 60)
        );
        if (!lastAlert || diffMinutes >= configs.intervalAlert) {
          const infoPet = await petsHandler.getByCodeData(body.codePet);
          // Realizar alertamiento
          alertsHandler.createData({
            code: new Date().getTime(),
            title: 'Se ha superado el límite de distancia',
            codePet: body.codePet,
            distance: body.distance,
          });

          // Notificar con IFTTT
          const axios = require('axios');
          axios({
            method: 'post',
            url: 'https://maker.ifttt.com/trigger/distanceOut/with/key/cQzfBsdfVK6PdG8F7ZeRLn',
            data: {
              value1: infoPet.name,
              value2: body.distance,
            },
          });
        }
      }
    }
    tracks.insertMany([body], (err, result) => {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        res.json({
          data: result,
        });
      }
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const _getMeters = (lat1, lon1, lat2, lon2) => {
  rad = (x) => (x * Math.PI) / 180;
  const R = 6378.137; // Radio de la tierra en km
  const dLat = rad(lat2 - lat1);
  const dLong = rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(lat1)) *
      Math.cos(rad(lat2)) *
      Math.sin(dLong / 2) *
      Math.sin(dLong / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c * 1000;
  return d.toFixed(0);
};

const createTrackMQ = async (data) => {
  try {
    if (data.lat && data.lon) {
      const configs = await configHandler.getData();
      data.distance = _getMeters(
        configs.homeLat,
        configs.homeLon,
        data.lat,
        data.lon
      );
      if (data.distance >= configs.distanceAlert) {
        const lastAlert = await alertsHandler.getLastData(data.codePet);
        const diffMinutes = parseInt(
          (new Date() - new Date(lastAlert.date ?? null)) / (1000 * 60)
        );
        if (!lastAlert || diffMinutes >= configs.intervalAlert) {
          const infoPet = await petsHandler.getByCodeData(data.codePet);
          // Realizar alertamiento
          alertsHandler.createData({
            code: new Date().getTime(),
            title: 'Se ha superado el límite de distancia',
            codePet: data.codePet,
            distance: data.distance,
          });

          // Notificar con IFTTT
          const axios = require('axios');
          axios({
            method: 'post',
            url: 'https://maker.ifttt.com/trigger/distanceOut/with/key/cQzfBsdfVK6PdG8F7ZeRLn',
            data: {
              value1: infoPet.name,
              value2: data.distance,
            },
          });
        }
      }
    }
    tracks.insertMany([data], (err, result) => {
      if (err) {
        console.log('Error Create Tracks MQ', err);
      } else {
        console.log('Tracks MQ', result);
      }
    });
  } catch (error) {
    console.log('ERROR createTrackMQ:', error);
  }
};

module.exports = {
  get: getTracks,
  getByPet: getTracksByCodePet,
  create: createTrack,
  createMQ: createTrackMQ,
};
