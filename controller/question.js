const mongoose = require('mongoose')
var path = require('path')
var multer = require('multer')
var async = require('async')
const questionModel = mongoose.model('Question')
const contestModel = mongoose.model('Contest')

exports.createQuestion = function(req,callback){
	let cid = req.body.cid
	
	let data = req["body"]
	let contest = data["cid"]
	for(var i=0;i<10;i++){
		q = data["q"+(i+1)]
		o1 = data["q"+(i+1)+"o1"]
		o2 = data["q"+(i+1)+"o2"]
		o3 = data["q"+(i+1)+"o3"]
		o4 = data["q"+(i+1)+"o4"]
		m = data["m"+(i+1)]
		a = data["a"+(i+1)]
		if(q==""||o1==""||o2==""||o3==""||o4==""){
			
			continue
		}
		else{
			let newQuestion = new questionModel({
				question 	: q,
				option1		: o1,
				option2		: o2,
				option3		: o3,
				option4		: o4,
				marks		: m,
				answer		: a,
				contest     : cid
			}).save(function(err,data){
				if(err)
					throw err
				else{
					id = data._id
				}
			})
			
			

		}
	}
}

exports.getQuestion = function(key,callback){
	cid = key
	searchParameter = {}
	searchParameter.contest = cid
	questionModel.find(searchParameter,(err,data)=>{
		if(err){
			console.log(err)
		}
		else{
			//console.log(data)
			console.log("found")
		}

	}).populate("contest").exec(function(err,story){
		if(err){
			console.log(err);
			callback({"res":false})
		}
		else{
			console.log("-----------------------------------------------")
			console.log(story)
			console.log("----------------------------------------------------")
			callback({"data":story,"res":true})
		}
	})
	

}

