var fs = require("fs");

exports.log = function(message,req){
	var date = new Date();
	var ip = req.connection.remoteAddress;
	var host = req.headers.host;
	var message = date + " " + ip + " " + host  + " " + message + "\n\n";
    fs.appendFileSync("access.log", message); 
}