var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var expressValidator = require('express-validator');

var cookieParser = require('cookie-parser');
var config = require('./config/auth.js');

var bodyParser = require('body-parser');
var flash = require('connect-flash');

var routes = require('./routes/index');
var users = require('./routes/users');
var clients = require('./routes/clients');
var products = require('./routes/products');
var salesorder = require('./routes/salesorder');
var unitmeasurement = require('./routes/unitmeasurement');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('superSecret', config.secret);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use(expressValidator({
  errorFormatter: function (param, msg, value) {
    var namespace = param.split('.'),
        root = namespace.shift(),
        formParam = root;

    while (namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param: formParam,
      msg: msg,
      value: value
    };
  }
}));


app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '127.0.0.1:5000, 127.0.0.1:63342');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials', 'true');
  req.token = req.body.token || req.params['token'] || req.headers['x-access-token'];
  req.superSecret = app.get('superSecret');
  next();
});

app.use(flash());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

app.get('*', function(req, res, next){
  res.locals.user = req.user || null;
  next();
});

app.use('/', routes);
app.use('/users', users);
app.use('/clients', clients);
app.use('/products', products);
app.use('/salesorder', salesorder);
app.use('/unitmeasurement', unitmeasurement);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
