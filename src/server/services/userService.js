var counterModel = require("../models/counterModel");
var userModel=require("../models/userModel");
var userService =function(){

return{

		createOrUpdateUser : function(user,callbackForCreateOrUpdateUser){

			 if(user._id !==undefined){
					var conditions = { "_id":user._id };
					var update = { $set: {"firstName": user.firstName,"lastName": user.lastName,"mobileNumber":user.mobileNumber,"street":user.street,"city":user.city,"state":user.state,"zipcode":user.zipcode,"alertsOn":user.alertsOn}};
					userModel.update(conditions, update, callback);

				 function callback (err, numAffected) {
					 if(err){
						 console.log("error:"+err);
						 callbackForCreateOrUpdateUser(err);
					 }
					 console.log(numAffected + "rows updates");
					 callbackForCreateOrUpdateUser(null,user);
				 };

			 }else{

				 counterModel.findByIdAndUpdate({_id : "userId"}, {$inc: {seq: 1} }, function(error, counter)   {
						if(error){
							console.log("error:"+error);
					    callbackForCreateOrUpdateUser(error);
						}
				    var userCreated = new userModel({"_id":counter.seq,"firstName": user.firstName,"lastName": user.lastName,"password":user.password,"email":user.email,"mobileNumber":user.mobileNumber,"street":user.street,"city":user.city,"state":user.state,"zipcode":user.zipcode,"alertsOn":user.alertsOn});
				    userCreated.save(function(err){
							 if(err){
								 console.log(err)
								 callbackForCreateOrUpdateUser(err);
							 }
							 callbackForCreateOrUpdateUser(null,userCreated);
					 });
				 });

			 }
   },
	 checkUser:function(user,callbackForCheckUser){
		 var query = userModel.findOne({"email":user.email,"password":user.password});
				 query.exec(function(err, user){
						 if(err)
							 callbackForCheckUser(err);
						   callbackForCheckUser(null,user);
				 });
	 }


}
}

module.exports=userService();
