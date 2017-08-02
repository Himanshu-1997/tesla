exports.isLoggedIn = function(req,res,next){
	if(req.isAuthenticated())
		return next();
	else{
		req.flash('errorMessages','You must be login to view the page')
		res.redirect('/auth');
	}
}

exports.isAdmin = function(req,res,next){
	/*This function cheks weather the user is admin or not */
	if(req.user.group==4){
		return next();
	}
	else{
		req.flash('errorMessages','You dont have sufficient privillage to view the previous page')
		res.redirect("/dashboard")
	}
}

exports.keepLog = function(req,res,next){
	var format = 'url=":url" method=":method" statusCode=":statusCode" delta=":delta" ip=":ip"';
	accesslog(req, res, format, function(s) {
		  var date = new Date();
		  s = date + " " + s + "\n\n";
		  fs.appendFileSync("access.log", s);
	});
	return next();
}