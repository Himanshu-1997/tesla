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

exports.getContest = function(callback){
	searchParameter = {}
	searchParameter.isDisabled = false
	contestModel.find(searchParameter,function(err,data){
		if(err){
			console.log(err)
			callback({'res':false})
		}
		else{
			callback({'data':data,'res':true})
		}
	}).sort([['startTime', 'ascending']])
}