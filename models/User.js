var mongoose = require('mongoose')
const bcrypt   = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	firstName  : {type:String,require:true},
	lastName   : {type:String,require:true},
	email	   : {type:String,require:true},
	mobile     : {type:String,require:true},
	course     : {type:String,require:true},
	roll	   : {type:String,require:true},
	batch 	   : {type:String,require:true},
	branch     : {type:String,require:true},
	password   : {type:String,require:true},
	group	   : {type:Number,require:false,default:1},
	isDisabled : {type:Boolean,require:false,default:false}
})

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

mongoose.model('User',userSchema,'users');