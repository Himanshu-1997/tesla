function enterAttempt(contestId,questionId,response){
	var parameters = {};
	parameters.cid = contestId;
	parameters.qid = questionId;
	parameters.response = response;
	$.get('/enterAttempt',parameters,function(data){

	})
}

