var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var attemptSchema = new Schema({
	user 			: {type:mongoose.Schema.Types.ObjectId, ref: 'User'},
	contest			: {type:mongoose.Schema.Types.ObjectId, ref: 'Contest'},
	question    	: {type:mongoose.Schema.Types.ObjectId, ref: 'Question'},
	attemptedOption : {type:String,require:true},
	// if status is 0 i.e wrong else right
	//status			: {type:Number,require:true}
})

mongoose.model('Attempt',attemptSchema,'attempts');
