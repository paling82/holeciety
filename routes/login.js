exports.autoLogin = function (user, pass, callback){
	db.accounts.findOne({ _id: ObjectId(user._id)}, function (err, output){
		if(output){
			output.password == pass ? callback(output) : callback(null);
		} else {
			callback(null);
		}
	});
}

exports.manualLogin = function (user, pass, callback){
	db.accounts.findOne({ username : user}, function (err, output){
		if(output == null){
			callback("user-not-found");
		} else {
			console.log('Looking in db for user '+ user);
			validatePassword(pass, output.password, function (err, res){
				if(res){
					callback(null, output);
				} else  {
					callback('invalid-password');
				}
			});
		}
	});
}

var validatePassword = function( insertedPassword, storedPassword, callback){
	callback(null, insertedPassword === storedPassword);
}