/*load the require module and schema*/
const mongoose = require('mongoose')
const contestModel = mongoose.model('Contest')

exports.createContest = function(req,callback){
	/*Function creates the new contest*/
	let newContest = new contestModel({
		contestName : req.body.cname,
		contestType : req.body.ctype,
		startTime	: new Date(req.body.startTime),
		endTime		: new Date(req.body.endTime),
	}).save(function(err){
		if(err){
			console.log(err)
			callback({"res":false})
		}
		else
			callback({"res":true})
	})
}

exports.getContest = function(callback){
	/*Function lists the all the contest*/
	let searchParameter = {}
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

exports.getContestById = function(key,callback){
	let searchParameter = {};
	searchParameter._id = key;
	contestModel.findOne(searchParameter,function(err,data){
		if(err){
			console.log(err);
			callback({"res":false})
		}
		else{
			callback({"data":data,"res":true})
		}
	})
}


