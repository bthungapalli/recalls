var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var sessions = require("client-sessions");
var nconf = require('nconf');

var mainRoute = require('./routes/mainRoute');
var registrationRoute = require('./routes/registrationRoute');
var loginRoute = require('./routes/loginRoute');
var profileRoute = require('./routes/profileRoute');
var userManagementRoute = require('./routes/userManagementRoute');
var categoriesRoute = require('./routes/categoriesRoute');
var recallsRoute = require('./routes/recallsRoute');
var forgotPasswordRoute = require('./routes/forgotPasswordRoute');



var app = express();

/************  Loading property file based on env  ****************/

var environmentPropertyFile="";

if(process.env.NODE_ENV!=='development' && process.env.NODE_ENV!=='testing' && process.env.NODE_ENV!=='production'){
	console.log("loading environment::::::::::development");
	environmentPropertyFile="./config/development.json";
}else{
	console.log("loading environment::::::::::"+process.env.NODE_ENV);
	environmentPropertyFile="./config/"+process.env.NODE_ENV+".json";
}

nconf.argv()
     .env()
     .file({ file:environmentPropertyFile
     });

/************   mongo connection  ****************/
var mongoDbConnection=nconf.get('mongoDbConnection');
mongoose.connect('mongodb://'+mongoDbConnection.host+'/'+mongoDbConnection.Db);

/************   session  ****************/
var sessionDetials=nconf.get('sessionDetails');
app.use(sessions({
	  cookieName: sessionDetials.cookieName,
	  secret: sessionDetials.secretKey,
	  duration: sessionDetials.duration,
	  activeDuration: sessionDetials.activeDuration,
	  httpOnly: sessionDetials.httpOnly,
	  secure: sessionDetials.secure,
	  ephemeral: sessionDetials.ephemeral
	}));

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

/************   configuring routes   ****************/
app.use("/node_modules",express.static(path.resolve(__dirname, '../../node_modules')));
app.use("/css",express.static(path.resolve(__dirname, '../../css')));
app.use("/js",express.static(path.resolve(__dirname, '../../js')));
app.use("/app",express.static(path.resolve(__dirname, '../client/app')));
app.use("/public",express.static(path.resolve(__dirname, '../client/public')));
app.use('/', mainRoute);
app.use('/registration', registrationRoute);
app.use('/login', loginRoute);
app.use('/profile', profileRoute);
app.use('/userManagement', userManagementRoute);
app.use('/categories', categoriesRoute);
app.use('/recalls', recallsRoute);
app.use('/forgotPassword', forgotPasswordRoute);
app.use('/**', mainRoute);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

var port=nconf.get('port');
var server = app.listen(port, function() {
    var port = server.address().port;
    console.log('App listening at port: '+ port);
});

module.exports = app;
