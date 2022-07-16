const mongoose = require('mongoose');

const { MONGO_USER, MONGO_PASS, MONGO_HOST, MONGO_DBAS } = process.env;
const MONGO_URL = `mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}/${MONGO_DBAS}`;
console.log(MONGO_URL);
mongoose.connect(MONGO_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
const connection = mongoose.connection;

connection.once('open', function () {
  console.log('MongoDB database connection established successfully');
});
