const batch = require('./lib/lib.js');

function isLoggedIn(req,res,next){
	if(req.isAuthenticated())
		return next();
	else
		res.redirect('auth');
}

isAdmin = function(req,res){
	if(req.user.group==4){
		return true;
	}
	return false;
}



module.exports = function(app,passport){

	app.get('/dashboard',isLoggedIn,function(req,res){
		res.render("dashboard")
	})

	app.get('/auth',function(req,res){
		if(req.isAuthenticated())
			res.redirect('/dashboard');
		else
			batch.studentDetail((found)=>{
				let pageInfo = {};
				pageInfo.title = "IEEE Online Test";
				pageInfo.batch = found.batch;
				pageInfo.course = found.course;
				pageInfo.branch = found.branch;
				res.render('authentication',pageInfo);
			})
	})

	app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/dashboard', // redirect to the secure profile section
        failureRedirect : '/abc', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

	app.post('/register',passport.authenticate('local-signup',{
		successRedirect :  '/dashboard',
		failureRedirect :  '/error',
		failureFlash    :  true
	}))
}