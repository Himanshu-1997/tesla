const batch = require('./lib/lib.js');
const contest = require('./controller/contest.js');
const question = require('./controller/question.js');
const score = require('./controller/score.js')
const formidable = require('formidable');
const fs = require('fs');
const async = require('async')
const log = require('./config/basicconf').log;
const accesslog = require('access-log');


function isLoggedIn(req,res,next){
	/*This function chek weather the user is logged in or not */
	if(req.isAuthenticated())
		return next();
	else{
		req.flash('errorMessages','You must be login to view the page')
		res.redirect('/auth');
	}
}

 function isAdmin(req,res,next){
 	/*This function cheks weather the user is admin or not */
	if(req.user.group==4){
		return next();
	}
	else{
		req.flash('errorMessages','You dont have sufficient privillage to view the previous page')
		res.redirect("/dashboard")
	}
}

function keepLog(req,res,next){
	var format = 'url=":url" method=":method" statusCode=":statusCode" delta=":delta" ip=":ip"';
	accesslog(req, res, format, function(s) {
		  var date = new Date();
		  s = date + " " + s + "\n\n";
		  fs.appendFileSync("access.log", s);
	});
	return next();
}



module.exports = function(app,passport){
    //all the routes to the application 
    /*list of all the get methods*/

	app.get('/',(req,res)=>{
		res.redirect("/auth")

	})

	app.get('/dashboard',isLoggedIn,function(req,res){

		var pageInfo = {};
		pageInfo.user = req.user;
		batch.menuItems((found)=>{
			pageInfo.title = "Dashboard"
			pageInfo.menu = found.menu
		})
		pageInfo.flash = req.flash("errorMessages")
		res.render("dashboard",pageInfo)
	})

	app.get('/auth',keepLog,function(req,res){
		
		//accesslog(req,res);
		if(req.isAuthenticated())
			res.redirect('/dashboard');
		else
			batch.studentDetail((found)=>{
				let pageInfo = {};
				pageInfo.title = "IEEE Online Test";
				pageInfo.batch = found.batch;
				pageInfo.course = found.course;
				pageInfo.branch = found.branch;
				pageInfo.messages = req.flash('errorMessages')
				res.render('authentication',pageInfo);
			})
	})

	app.get('/contest',keepLog,isLoggedIn,function(req,res){
		var pageInfo = {}
		pageInfo.title = "Contests"
		pageInfo.user = req.user;
		pageInfo.flash = req.flash("errorMessages");
		batch.menuItems((found)=>{
			pageInfo.menu = found.menu
		})

		items = [contest]
		async.each(items,function(item,callback){
			item.getContest((founds)=>{
				if(founds.res == true && founds.data.length>0){
					pageInfo.data = founds.data
					callback();
				}
				else if(founds.data.length==0){
					req.flash('errorMessages','Currently there is no contest')
					res.redirect('/dashboard');
				}
				else
					res.render("error");
			})
		},
		function(){
			res.render("contest",pageInfo)
		})
	})

	app.get("/viewSolution/:cid",keepLog,isLoggedIn,isAdmin,function(req,res){
		let pageInfo = {}
		batch.adminMenu((found)=>{
			pageInfo.menu = found.adminMenu
		})

		var searchParam = req.params.cid;
		question.getQuestion(searchParam,(found)=>{
			if(found.res==true && found.data.length>0){
				pageInfo.data = found.data
				res.render("viewSolution",pageInfo)
			}
			else if(found.data.length == 0){
				req.flash('errorMessages','There is no question in the requested contest')
				res.redirect('/dashboard');
			}
			else{
				res.render("error");
			}
		})
	})

	app.get("/questionPanel/:cid",keepLog,isLoggedIn,function(req,res){
		items = [score]
		async.each(items,function(item,callback){
			let userId = req.user._id
			var contestId = req.params.cid
			item.checkSubmission(userId,contestId,(found)=>{
				if(found["res"]==true){
					calc = found.total
					callback({"total":calc})
				}
				else{
					res.render("error")
				}
			})
		},
		function(founds){
			var searchParam = req.params.cid;
			question.getQuestion(searchParam,(found)=>{
				let pageInfo = {}
				if(found["res"]==true && found.data.length>0){
					pageInfo.cid = req.params.cid
					pageInfo.data = found.data
					endTime = (found.data)[0].contest.endTime
					startTime = (found.data)[0].contest.startTime
					if(founds.total != 0){
						req.flash('errorMessages','You have allready submitted the paper!!!')
						res.redirect('/contest');
					}
					else if(new Date() > endTime){
						req.flash('errorMessages','Contest is over!!!')
						res.redirect('/contest');
					}
					else if(new Date() < startTime){
						req.flash('errorMessages','Contest has not started yet!!!')
						res.redirect('/contest');
					}
					else
						res.render("questionPanel",pageInfo)
				}
				else if(found.data.length == 0){
					//redirect with no data found;
					req.flash('errorMessages','There is no question in the requested question panel')
					res.redirect('/contest');
				}
				else{
					res.render("error")
				}
			})
		})
	})

	

	app.get("/editContest",keepLog,isLoggedIn,isAdmin,function(req,res){
		let pageInfo = {}
		batch.adminMenu((found)=>{
			pageInfo.menu = found.adminMenu
		})
		items = [contest]
		async.each(items,function(item,callback){
			item.getContest((founds)=>{
				if(found["res"] == true && found.data.length>0){
					pageInfo.data = founds.data
					callback();
				}
				else if(found.data.length==0){
					req.flash('errorMessages','There is no contest to edit')
					res.redirect('/dashboard');
				}
				else
					res.render("error");
			})
		},
		function(){
			res.render("editContest",pageInfo)
		})
	})

	app.get('/contest/createContest',keepLog,isLoggedIn,isAdmin,function(req,res){
		let pageInfo = {}
		batch.adminMenu((found)=>{
			pageInfo.menu = found.adminMenu
		})
		res.render("createContest",pageInfo)
	})

	app.get('/contest/addQuestion/:cid',keepLog,isLoggedIn,isAdmin,function(req,res){
		var cid = req.params.cid
		var pageInfo = {}
		batch.adminMenu((found)=>{
			pageInfo.menu = found.adminMenu
		})
		pageInfo.cid = cid
		res.render("createQuestion",pageInfo)
	})

	app.get("/logout",keepLog,isLoggedIn,function(req,res){
		req.logout()
		res.redirect("/auth")
	})

	app.get("/viewResult/:cid",keepLog,isLoggedIn,function(req,res){
		var pageInfo = {}
		batch.menuItems((found)=>{
			pageInfo.menu = found.menu
		})
		var searchParam = req.params.cid;
		score.showScore(searchParam,(found)=>{
			if(found["res"] == true &&found.data>0){
				pageInfo.data = found.data
				pageInfo.currentUserId = req.user._id
				res.render("showResult",pageInfo)
			}
			else if(found.data==0){
				req.flash('errorMessages','Currently there is no result to show')
				res.redirect('/contest');
			}
			else
				res.render("error");
		})
	})

	app.post("/submit",keepLog,isLoggedIn,function(req,res){
		score.calculateScore(req,(found)=>{
			req.flash('errorMessages','You have successfully submitted the paper')
			res.redirect('/');
		})
	})

	app.post('/contest/addQuestion',keepLog,isLoggedIn,isAdmin,function(req,res){
 		question.createQuestion(req,(found)=>{
 			req.flash('errorMessages','Question addedd successfully')
			res.redirect('/');
 		})
	})

	app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/dashboard', // redirect to the secure profile section
        failureRedirect : '/auth', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

	app.post('/register',passport.authenticate('local-signup',{
		successRedirect :  '/dashboard',
		failureRedirect :  '/auth',
		failureFlash    :  true
	}))


	app.post('/contest/createContest',keepLog,isLoggedIn,isAdmin,function(req,res){
		contest.createContest(req,(found)=>{
			if(found.res == true){
				req.flash('errorMessages','Contest created successfully')
				res.redirect('/');
			}
			else{
				res.render("error");
			}
		})
	})

	app.get('/enterAttempt',isLoggedIn,function(req,res){
		var cid = req.query.cid;
		var qid = req.query.qid;
		var response = req.query.response;
		var uid = req.user._id;
		console.log(cid);
		console.log(qid);
		console.log(response);
		score.insertAttempt(uid,cid,qid,response,(found)=>{
			if(found["res"] == true){
				console.log("inserted");
			}
			else{
				
			}
		})
	})
}