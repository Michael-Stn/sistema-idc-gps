const mqtt = require('mqtt');

const mqttClient = mqtt.connect(`mqtt://${process.env.MQ_HOST}`, {
  username: process.env.MQ_USER,
  password: process.env.MQ_PASS,
});

mqttClient.on('connect', function () {
  console.log('HiveMQ broker connection established successfully');
  mqttClient.subscribe('iot/track', function (err) {
    console.log('MQTT suscripción con iot/track');
    if (err) {
      console.log('MQTT suscripción con iot/track error', err);
    }
  });
  mqttClient.subscribe('iot/configs', function (err) {
    console.log('MQTT suscripción con iot/configs');
    if (err) {
      console.log('MQTT suscripción con iot/configs error', err);
    }
  });
});

mqttClient.on('message', function (topic, message) {
  switch (topic) {
    case 'iot/track':
      body = JSON.parse(message.toString());
      console.log('Tracks MQ payload', body);
      const handler = require('../handlers/tracks');
      handler.createMQ(body);
      break;
    case 'iot/configs':
      body = JSON.parse(message.toString());
      console.log('Configs MQ payload', body);
      break;
    default:
      console.log(`TOPIC: ${topic} no soportado`);
      break;
  }
});

/* Notificar actualización
const mqttClient = require('../services/mqtt');
mqttClient.publish(
  'iot/track',
  JSON.stringify({
    codePet: 5432234,
    lat: 4.213213,
    lon: -70.213431,
  })
);
*/
module.exports = mqttClient;
