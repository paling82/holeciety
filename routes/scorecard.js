exports.findAll = function(userId, callback){
	console.log('Finding scorecards for ' + userId);
	db.scorecard.find({userid: userId}, function (err, output){
		console.log(output);
		if(!output){
			callback('Error');
		} else {
			callback(output);
		}

	});
}