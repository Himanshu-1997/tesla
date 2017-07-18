exports.studentDetail = function(callback){
	var batchName = [
			"2017",
			"2016",
			"2015",
			"2014"
		]

	var courseName = [
			"BE",
			"MCA",
			"IPH",
			"IMH",
			"ICH"
	]

	var branchName = [
			"ECE",
			"CSE",
			"IT",
			"EEE",
			"Other"
	]
	callback({'batch':batchName,'course':courseName,'branch':branchName});
}

exports.adminMenu = function(callback){
	var admin = [
		{'name':'Go to Dashboard',},
		{'name':'Edit Contest'}
	]
	callback({'adminMenu':admin})
}

//admin = 0 implies for all users
//admin = 1 implies only for administrator

exports.menuItems = function(callback){
	var menu = [
		{'name':'Dashboard','valid':true,'url':'/dashboard','admin':0,'icon':'bank'},
		{'name':'Contests','valid':true,'url':'/contest','admin':0,'icon':'bar-chart'},
		{'name':'Account','valid':true,'url':'/account','admin':0,'icon':'tasks'},
		{'name':'About','valid':true,'url':'/about','admin':0,'icon':'none'},
		//{'name':'Go to Admin Panel','valid':true,'url':'','admin':0,'icon':none}
		
		//{'name':'Admin Panel','valid':true,'url':'','admin':1}
	]
	callback({'menu':menu})
		
}
