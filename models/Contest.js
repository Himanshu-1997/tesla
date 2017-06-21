var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var contestSchema = new Schema({
	contestName 	: {type:String,require:true,unique:true},
	contestType  	: {type:String,require:true},
	startTime		: {type:Date,require:true},
	endTime			: {type:Date,require:true},
	album			: {type: [mongoose.Schema.Types.ObjectId], ref: 'Question',default:[]},
	isDisabled		: {type:Boolean,default:false}
})

mongoose.model('Contest',contestSchema,'contests');