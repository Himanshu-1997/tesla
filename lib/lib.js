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

exports.menuItems = function(callback){
	var menu = [
		{'name':'Dashboard','valid':'','url':'','auth':0},
		{'name':'Contests','valid':'','url':'','auth':0},
		{'name':'Account','valid':'','url':'','auth':0},
		{'name':'About','valid':'','url':'','auth':0}
		
	]
		
}
