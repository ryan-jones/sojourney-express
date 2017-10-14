const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const session    = require('express-session');
const passport   = require('passport');
const mongoose = require('mongoose');
const dotenv = require("dotenv");

require('./config/database');

const index = require('./routes/index');
const countriesApi = require('./routes/countries-api');
const usersApi = require('./routes/users-api');
const authRoutes = require('./routes/auth-routes');
const itinerariesApi = require('./routes/itinerary-api');

const corsOptions = {credentials: true, origin: 'http://localhost:4200'};
const app = express();

dotenv.config();
dotenv.load();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.options('*', cors(corsOptions));
app.use(cors(corsOptions));

app.use(passport.initialize());
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
//parses http headers
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
  const err = new Error('Not Found');
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
