var mongoose = require('mongoose')
var Schema = mongoose.Schema

var questionSchema = new Schema({
	question 	 	: {type:String,require:true},
	//imageQuestion	: {type:String,require:true},
	option1 	  	: {type:String,require:true},
	//imageOp1		: {type:String},
	option2 		: {type:String,require:true},
	//imageOp2		: {type:String},
	option3 		: {type:String,require:true},
	//imageOp3		: {type:String},
	option4			: {type:String,require:true},
	//imageOp4		: {type:String},
	marks			: {type:Number,require:true,default:3},
	answer			: {type:String,require:true},
	contest			: {type:mongoose.Schema.Types.ObjectId, ref: 'Contest'}
})

mongoose.model('Question',questionSchema,'questions');