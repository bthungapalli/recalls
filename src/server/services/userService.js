var counterModel = require("../models/counterModel");
var userModel=require("../models/userModel");
var userService =function(){

return{

	update:function(object,conditions,update,callbackForUpdate){
		 userModel.update(conditions, update, callback);
		 function callback (err, numAffected) {
			 if(err){
				 console.log("error:"+err);
				 callbackForUpdate(err);
			 }
			 console.log(numAffected + "rows updates");
			 callbackForUpdate(null,object);
		 };
	},
	execute:function(query,callbackForExecute){
		query.exec(function(err, user){
				if(err)
					callbackForExecute(err);
					callbackForExecute(null,user);
		});
	},
	save:function(user,callbackForSave){
		user.save(function(err){
			 if(err){
				 console.log(err)
				 callbackForSave(err);
			 }
			 callbackForSave(null,user);
	 });
	},
		createOrUpdateUser : function(user,callbackForCreateOrUpdateUser){
			 if(user._id ==undefined){
				 var serviceObj=this;
				 counterModel.findByIdAndUpdate({_id : "userId"}, {$inc: {seq: 1} }, function(error, counter)   {
				 	 if(error){
				 		 console.log("error:"+error);
				 		 callbackForCreateOrUpdateUser(error);
				 	 }
				 	 var userCreated = new userModel({"_id":counter.seq,"firstName": user.firstName,"lastName": user.lastName,"password":user.password,"email":user.email,"mobileNumber":user.mobileNumber,"street":user.street,"city":user.city,"state":user.state,"zipcode":user.zipcode,"alertsOn":user.alertsOn,"role":user.role,"categories":user.categories});
				 	 serviceObj.save(userCreated,callbackForCreateOrUpdateUser);
				 });
			 }else{
				 var conditions = { "_id":user._id };
				 var update = { $set: {"firstName": user.firstName,"lastName": user.lastName,"mobileNumber":user.mobileNumber,"street":user.street,"city":user.city,"state":user.state,"zipcode":user.zipcode,"alertsOn":user.alertsOn,"updated_at":new Date(),"categories":user.categories}};
				 this.update(user,conditions,update,callbackForCreateOrUpdateUser);
			 }
   },
	 checkUser:function(user,callbackForCheckUser){
		 var query = userModel.findOne({"email":user.email});
		 this.execute(query,callbackForCheckUser);
	 },
	 getAllUsers:function(callbackForGetAllUsers){
		 var query = userModel.find({});
		 this.execute(query,callbackForGetAllUsers);
	 },
	 activeOrInActivateUser:function(user,callbackForActiveOrInActivateUser){
		 var conditions = { "_id":user._id };
		 var update = { $set: {"isActive": user.isActive}};
		 this.update(user,conditions,update,callbackForActiveOrInActivateUser);
	 },
	 getUser:function(user,callbackForGetUser){
		 var query = userModel.findOne({"email":user.email});
		 this.execute(query,callbackForGetUser);
	 },
	 getAllUsersBasedOnCategory:function(category,callbackForGetAllUsersBasedOnCategory){
		 var query = userModel.find({ "categories": { $in: [categoryName] } }); 
		 this.execute(query,callbackForGetAllUsersBasedOnCategory);
	 }

}
}

module.exports=userService();
