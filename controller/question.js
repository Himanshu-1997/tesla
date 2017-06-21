const mongoose = require('mongoose')
const questionModel = mongoose.model('Question')
const contestModel = mongoose.model('Contest')

exports.createQuestion = function(req,res,callback){
	let data = req["body"]
	for(var i=0;i<10;i++){
		q = data["q"+(i+1)]
		o1 = data["q"+(i+1)+"o1"]
		o2 = data["q"+(i+1)+"o2"]
		o3 = data["q"+(i+1)+"o3"]
		o4 = data["q"+(i+1)+"o4"]
		if(q==""||o1==""||o2==""||o3==""||o4=="")
			continue
		else{
			let newQuestion = new questionModel({
				question 	: q,
				option1		: o1,
				option2		: o2,
				option3		: o3,
				option4		: o4,
				marks		: 3
			}).save(function(err,data){
				if(err)
					throw err
				else
					console.log("Saved")
					
			})
		}
	}
}