var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//路由分发
var routes = require('./routes/index');
var aboutUs = require('./routes/aboutUs')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));  //views 视图
app.set('view engine', 'jade'); //模板引擎 解析模板的一坨复杂代码 ejs

//中间件 middleware  software  hardware
//

// uncomment after placing your favicon in /dist
//app.use(favicon(path.join(__dirname, 'dist', 'favicon.ico')));
app.use(logger('dev'));   //log 日志
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist')));

//首页
// app.get('/',function (req,res) {
//   console.log(req.url)
//   console.log(req.method);
//   res.end('hello')
// })
app.get('/login',function (req,res) {
  res.redirect('/login.html')
})
app.use('/', routes);
app.use('/aboutus', aboutUs);

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
