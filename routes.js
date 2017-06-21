const batch = require('./lib/lib.js');
const contest = require('./controller/contest.js');
const question = require('./controller/question.js');

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
		var pageInfo = {};
		batch.menuItems((found)=>{
			pageInfo.title = "Dashboard"
			pageInfo.menu = found.menu

		})
		pageInfo.group = isAdmin(req,res)
		res.render("dashboard",pageInfo)
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

	app.get('/contest',function(req,res){

	})

	app.get('/contest/createContest',function(req,res){
		res.render("contest/createContest")
	})

	app.get('/contest/addQuestion',function(req,res){
		//var id = req.params.cid
		res.render("contest/createQuestion")
	})

	app.post('/contest/addQuestion',function(req,res){
		question.createQuestion(req,res,(found)=>{
			
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


	app.post('/contest/createContest',function(req,res){
		contest.createContest(req,res,(found)=>{

		})
		
	})




	
}