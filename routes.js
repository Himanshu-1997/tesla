const batch = require('./lib/lib.js');
const contest = require('./controller/contest.js');
const question = require('./controller/question.js');
const score = require('./controller/score.js')
var formidable = require('formidable');
var fs = require('fs');
var async = require('async')


/*var multer = require('multer');
var storage = multer.diskStorage({
	destination: function(req,file,cb){
		cb(null,__dirname+'/public/images/tesla/')
	},
	filename: function(req,file,cb){
		console.log(req.body)
		console.log("---------------------")
		console.log(file.originalname)
		cb(null,file.originalname);
	}
});

var upload = multer({ storage:storage });*/

var a = 5

function isLoggedIn(req,res,next){
	if(req.isAuthenticated())
		return next();
	else{
		req.flash('errorMessages','You must be login to view the page')
		res.redirect('/auth');
	}
}

 function isAdmin(req,res,next){
	if(req.user.group==4){
		return next();
	}
	else{
		req.flash('errorMessages','You dont have sufficient privillage to view the previous page')
		res.redirect("/dashboard")
	}
}



module.exports = function(app,passport){

	app.get('/dashboard',isLoggedIn,function(req,res){
		var pageInfo = {};
		batch.menuItems((found)=>{
			pageInfo.title = "Dashboard"
			pageInfo.menu = found.menu

		})
		if(req.user.group == 4)
			pageInfo.isAdmin = true
		else
			pageInfo.isAdmin = false
		//pageInfo.group = isAdmin(req,res)
		pageInfo.flash = req.flash("errorMessages")
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
				pageInfo.messages = req.flash('errorMessages')
				res.render('authentication',pageInfo);
			})
	})



	app.get('/contest',isLoggedIn,function(req,res){
		var pageInfo = {}
		batch.menuItems((found)=>{
			pageInfo.menu = found.menu
		})
		items = [contest]

		async.each(items,function(item,callback){
			item.getContest(req,res,(founds)=>{
				pageInfo.data = founds.data
				callback();
			})
		},
		function(){
			status = ""
			res.render("contest/contest",pageInfo)
		}
		)
		//pageInfo.datas = "helloworld"
		
		
	})

	app.get("/viewSolution/:cid",isLoggedIn,isAdmin,function(req,res){
		question.getQuestion(req,res,(found)=>{
			let pageInfo = {}
			//console.log(found)
			pageInfo.data = found.data
			console.log(pageInfo)
			res.render("viewSolution",pageInfo)
		})
	})

	app.get("/questionPanel/:cid",isLoggedIn,function(req,res){

		/*score.checkSubmission(req,res,(found)=>{

		})
		question.getQuestion(req,res,(found)=>{
			console.log("4")
			let pageInfo = {}
			//console.log(found)
			pageInfo.cid = req.query.cid
			pageInfo.data = found.data
			console.log(pageInfo)
			res.render("questionPanel",pageInfo)
		})*/
		items = [score]

		async.each(items,function(item,callback){
			item.checkSubmission(req,res,(found)=>{
				//console.log("1")
				calc = found.total
			//	console.log(calc)
				callback({"total":calc})
			})
		},
		function(founds){
			question.getQuestion(req,res,(found)=>{
				//console.log("2")
				let pageInfo = {}
				//console.log(found)
				pageInfo.cid = req.params.cid
				pageInfo.data = found.data
				endTime = (found.data)[0].contest.endTime
				startTime = (found.data)[0].contest.startTime
				console.log("endTime="+endTime)
				console.log("startTime="+startTime)
				//console.log(pageInfo)
				if(founds.total != 0)
					res.send("all ready submitted")
				else if(new Date() > endTime)
					res.send("contest has ended")
				else if(new Date() < startTime)
					res.send("contest not started yet")
				else
					res.render("questionPanel",pageInfo)
			})
		}
		)
		
	})

	app.get("/question/questionPanel/:cid",function(req,res){
		/*score.checkSubmission(req,res,(found)=>{

		})
		question.getQuestion(req,res,(found)=>{
			console.log("4")
			let pageInfo = {}
			//console.log(found)
			pageInfo.cid = req.query.cid
			pageInfo.data = found.data
			console.log(pageInfo)
			res.render("questionPanel",pageInfo)
		})*/
		items = [score]

		async.each(items,function(item,callback){
			item.checkSubmission(req,res,(found)=>{
				//console.log("1")
				calc = found.total
			//	console.log(calc)
				callback({"total":calc})
			})
		},
		function(founds){
			question.getQuestion(req,res,(found)=>{
				//console.log("2")
				let pageInfo = {}
				//console.log(found)
				pageInfo.cid = req.query.cid
				pageInfo.data = found.data
				endTime = (found.data)[0].contest.endTime
				startTime = (found.data)[0].contest.startTime
				console.log("endTime="+endTime)
				console.log("startTime="+startTime)
				//console.log(pageInfo)
				if(founds.total != 0)
					res.send("all ready submitted")
				else if(new Date() > endTime)
					res.send("contest has ended")
				else if(new Date() < startTime)
					res.send("contest not started yet")
				else
					res.render("/questionPanelDemo",pageInfo)
			})
		}
		)
	})

	app.get("/editContest",isLoggedIn,isAdmin,function(req,res){
		let pageInfo = {}
		batch.adminMenu((found)=>{
			pageInfo.menu = found.adminMenu
		})
		items = [contest]
		async.each(items,function(item,callback){
			item.getContest(req,res,(founds)=>{
				pageInfo.data = founds.data
				callback();
			})
		},
		function(){
			status = ""
			res.render("contest/editContest",pageInfo)
		}
		)
	})

	app.post("/submit",isLoggedIn,function(req,res){
		console.log(req.body)
		score.calculateScore(req,res,(found)=>{

		})
	})

	app.get('/contest/createContest',isLoggedIn,isAdmin,function(req,res){
		res.render("contest/createContest")
	})

	app.get('/contest/addQuestion/:cid',isLoggedIn,isAdmin,function(req,res){
		var cid = req.params.cid
		var pageInfo = {}
		pageInfo.cid = cid
		res.render("contest/createQuestion",pageInfo)
	})

	app.post('/contest/addQuestion',isLoggedIn,isAdmin,function(req,res){

	 	let sampleFile = req.files.iq1o1;
 		question.createQuestion(req,res,(found)=>{

 		})

 		/*question.insertImage(req,res,(found)=>{

 		})*/
	  // Use the mv() method to place the file somewhere on your server 
	  /*sampleFile.mv(__dirname+'/abc.jpg', function(err) {
	    if (err)
	      return res.status(500).send(err);
	 
	    res.send('File uploaded!');
	  });*/
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


	app.post('/contest/createContest',isLoggedIn,isAdmin,function(req,res){
		contest.createContest(req,res,(found)=>{

		})
		
	})

	app.get("/logout",isLoggedIn,function(req,res){
		req.logout()
		res.redirect("/auth")
	})



	
}