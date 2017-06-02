var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var countriesApi = require('./routes/countries-api');
var usersApi = require('./routes/users-api');
var cors = require('cors');
var authRoutes = require('./routes/auth-routes');
var itinerariesApi = require('./routes/itinerary-api');
const session    = require('express-session');
const passport   = require('passport');
const mongoose = require('mongoose');
const dotenv = require("dotenv");


require('./config/database');
var app = express();

dotenv.config();
dotenv.load();

var corsOptions = {credentials: true, origin: 'http://localhost:4200'};
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.options('*', cors(corsOptions));
app.use(cors(corsOptions));

app.use(passport.initialize());
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', authRoutes)
app.use('/api', countriesApi);
app.use('/api', usersApi);
app.use('/api', itinerariesApi);

// This will be the default route is nothing else is caught
app.use(function(req, res) {
  res.sendfile(__dirname + '/public/index.html');
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
