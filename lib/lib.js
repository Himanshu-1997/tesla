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

//auth = 0 implies for all users
//auth = 1 implies only for administrator

exports.menuItems = function(callback){
	var menu = [
		{'name':'Dashboard','valid':true,'url':'','auth':0},
		{'name':'Contests','valid':true,'url':'/contest','auth':0},
		{'name':'Account','valid':true,'url':'','auth':0},
		{'name':'About','valid':true,'url':'','auth':0},
		//{'name':'Admin Panel','valid':true,'url':'','auth':1}
	]
	callback({'menu':menu})
		
}
