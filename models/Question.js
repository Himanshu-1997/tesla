var mongoose = require('mongoose')
var Schema = mongoose.Schema

var questionSchema = new Schema({
	question 	 	: {type:String,require:true,unique:true},
	option1 	  	: {type:String,require:true},
	option2 		: {type:String,require:true},
	option3 		: {type:String,require:true},
	option4			: {type:String,require:true},
	marks			: {type:Number,require:true,default:3}
})

mongoose.model('Question',questionSchema,'questions');