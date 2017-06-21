const mongoose = require('mongoose')
const contestModel = mongoose.model('Contest')

exports.createContest = function(req,res,callback){
	let newContest = new contestModel({
		contestName : req.body.cname,
		contestType : req.body.ctype,
		startTime	: new Date(req.body.startTime),
		endTime		: new Date(req.body.endTime),
	}).save(function(err){
		if(err)
			throw err
		else
			console.log("created")
	})
}