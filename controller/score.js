const mongoose = require('mongoose')
var async = require('async')
const questionModel = mongoose.model('Question')
const contestModel = mongoose.model('Contest')
const scoreModel = mongoose.model('Score')
exports.calculateScore = function(req,res,callback){
	//console.log(req.body)
	var len = Object.keys(req.body).length
	var tostr = Object.keys(req.body)
	/*for(var i=0;i<len-1;i++){
		var qid = tostr[i]
		var attemptAnswer = req.body.qid
		console.log("1")
		items = []
		async.each(items,function(item,callback){
			item.findOne({"_id":qid},function(err,data){
				if(err)
					throw err
				else{
					console.log(2)
					//if(data.answer == req.body)
				}

				callback()
				
			})
		},
		function(){
			console.log("3")


		}

		)*/
		items = []

		for(var i=0;i<len-1;i++){
			items.push(tostr[i])
		}
		var score = 0
		async.each(items,function(item,callback){
			questionModel.findOne({"_id":item},function(err,data){
				if(err)
					throw err
				else{
					if(data.answer == req["body"][item])
						score = score + 3
					else
						score = score - 1

				}
				callback()
			})
		},
			function(){
				let newScore = new scoreModel({
					'user' 		    : req.user._id,
					'contest'	    : req.body.cid,
					'score'		    : score,
					'submitTime'    : new Date()
				}).save(function(err,data){
					if(err)
						throw err
					else
						console.log("inserted")
				})
			}
		)


	//}
}

exports.checkSubmission = function(req,res,callback){
	let searchParameter = {}
	searchParameter.user = "59137728681bea16f0f3bf81"
	searchParameter.contest = req.query.cid
	//console.log(searchParameter)
	scoreModel.find(searchParameter,function(err,found){
		if(err)
			throw err
		else{
			//console.log(found.length)
			callback({"total":found.length})
		}
	})
}