var mongoose = require('mongoose')
var Schema = mongoose.Schema

var scoreSchema = new Schema({
	user 		: {type:mongoose.Schema.Types.ObjectId, ref: 'User'},
	contest		: {type:mongoose.Schema.Types.ObjectId, ref: 'Contest'},
	//answers		: [{type:Number,require:true}],
	score 		: {type:Number,require:true},
	submitTime	: {type:Date,require:true}

	
})
mongoose.model('Score',scoreSchema,'score');