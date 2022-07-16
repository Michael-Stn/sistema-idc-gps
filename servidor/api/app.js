var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// servicios
require('./services/mongo');
require('./services/mqtt');

var indexRouter = require('./routes/index');
var petsRouter = require('./routes/pets');
var alertsRouter = require('./routes/alerts');
var tracksRouter = require('./routes/tracks');
var configsRouter = require('./routes/configs');

var app = express();

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
