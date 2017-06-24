const mongoose = require('mongoose')
var path = require('path')
var multer = require('multer')
var async = require('async')
const questionModel = mongoose.model('Question')
const contestModel = mongoose.model('Contest')

exports.createQuestion = function(req,res,callback){
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
		//console.log("hiii=>"+i)
		if(q==""||o1==""||o2==""||o3==""||o4==""){
			//console.log("okkk=>"+i)
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

exports.getQuestion = function(req,res,callback){
	cid = req.query.cid
	searchParameter = {}
	searchParameter.contest = cid
	questionModel.find(searchParameter,(err,data)=>{
		if(err)
			throw err
		else{
			//console.log(data)
			callback({data:data})
		}

	})
	

}

