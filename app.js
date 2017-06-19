'use strict'
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
var passport = require('passport');
var path = require('path');
var fs = require('fs');

var app = express();
app.use(cookieParser('secret'));
app.use(session({cookie: { maxAge: 60000 }}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(bodyParser());
  


app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname, 'public')));


var port = 3000;


let models_path =  './models';
fs.readdirSync(models_path).forEach(function (file) {
  if (~file.indexOf('.js')) require(models_path + '/' + file)
});
require('./config/passport')(passport);
require('./routes.js')(app,passport);

app.listen(port,function(err){
	if(err)
		console.log('error in connecting');
	else{
		mongoose.connect('mongodb://127.0.0.1:27017/tesla')
		console.log("app is running on port number")
	}
})
