/* This page contains all the necessary modules and connection to mongo db on 
collection tesla.You must run this file to begin the project*/


//use strict is used for strict data type like const and let supported by javascript
'use strict'

//list of all the modules loaded for this application
/* always use const as data type to load the modules */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const passport = require('passport');
const path = require('path');
const fs = require('fs');
const fileUpload = require('express-fileupload');
const log = require('./config/basicconf').log;


/* Configuring the sessions cookie and passport authentication */
var app = express();
app.use(cookieParser());
app.use(session({ 
  secret: 'lololppapadhoclabadhoclab',
  name: 'sessionId',
  resave: false,
  saveUninitialized: true,
  cookie: { 
    //secure:   true,
    maxAge:   24*60*60*1000 } 
}));

/*We have used passport.js for giving the user authentication which is loaded 
from the file config/passport.js*/

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(bodyParser())
app.use(fileUpload());
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname, 'public')));

//change the port number if it is allready in use
var port = 3000;

//model path is the path to all the schema used for this application
let models_path =  './models';
fs.readdirSync(models_path).forEach(function (file) {
  if (~file.indexOf('.js')) require(models_path + '/' + file)
});

require('./config/passport')(passport);

/* route.js contains all the url route to the application*/
require('./routes.js')(app,passport);

//start the port on the given ip and port
app.listen(port,function(err){
	if(err)
		console.log('Sorry something went wrong.May be your port may be busy or chek your ip and port configuration again');
	else{
		mongoose.connect('mongodb://127.0.0.1:27017/tesla')
		console.log("app is running on port number " + port )
	}
})
