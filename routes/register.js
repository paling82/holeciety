exports.findUsers = function(req, res){
	db.accounts.find(function (err, items){
		res.send(items);
	});

}