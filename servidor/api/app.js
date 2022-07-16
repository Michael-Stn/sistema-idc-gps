var createError = require('http-errors');
const mongoose = require('mongoose');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var petsRouter = require('./routes/pets');
var alertsRouter = require('./routes/alerts');
var tracksRouter = require('./routes/tracks');
var configsRouter = require('./routes/configs');

var app = express();

mongoose.connect('mongodb://msavila:msavila@134.122.8.119:27017/admin', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
const connection = mongoose.connection;

connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/pets', petsRouter);
app.use('/alerts', alertsRouter);
app.use('/tracks', tracksRouter);
app.use('/configs', configsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  console.log(req.path);
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
