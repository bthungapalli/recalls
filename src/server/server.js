var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var mainRoute = require('./routes/mainRoute');
var registrationRoute = require('./routes/registrationRoute');
var loginRoute = require('./routes/loginRoute');
var profileRoute = require('./routes/profileRoute');
var userManagementRoute = require('./routes/userManagementRoute');
var categoriesRoute = require('./routes/categoriesRoute');



var app = express();
mongoose.connect('mongodb://localhost/recalls');
// view engine setup
app.set('views',path.resolve(__dirname, '../client/views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/node_modules",express.static(path.resolve(__dirname, '../../node_modules')));
app.use("/app",express.static(path.resolve(__dirname, '../client/app')));
app.use("/public",express.static(path.resolve(__dirname, '../client/public')));
app.use('/', mainRoute);
app.use('/registration', registrationRoute);
app.use('/login', loginRoute);
app.use('/profile', profileRoute);
app.use('/userManagement', userManagementRoute);
app.use('/categories', categoriesRoute);





// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

var server = app.listen(3000, function() {
    var host = 'localhost';
    var port = server.address().port;
    console.log('App listening at http://%s:%s', host, port);
});

module.exports = app;
