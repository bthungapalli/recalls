var counterModel = require("../models/counterModel");
var recallModel=require("../models/recallModel");
var recallsService =function(){

return{

	update:function(object,conditions,update,callbackForUpdate){
		 recallModel.update(conditions, update, callback);
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
		query.exec(function(err, recall){
				if(err)
					callbackForExecute(err);
					callbackForExecute(null,recall);
		});
	},
	save:function(recall,callbackForSave){
		recall.save(function(err){
			 if(err){
				 console.log(err)
				 callbackForSave(err);
			 }
			 callbackForSave(null,recall);
	 });
	},
	delete:function(recall,condition,callbackForDelete){
		recallModel.remove(condition,function(err){
			 if(err){
				 console.log(err)
				 callbackForDelete(err);
			 }
			 callbackForDelete(null,recall);
	 });
	},
		createOrUpdateRecall : function(recall,callbackForCreateOrUpdateRecall){
			 if(recall._id ==undefined){
				 var serviceObj=this;
				 counterModel.findByIdAndUpdate({_id : "recallId"}, {$inc: {seq: 1} }, function(error, counter)   {
				 	 if(error){
				 		 console.log("error:"+error);
				 		 callbackForCreateOrUpdateRecall(error);
				 	 }
				 	 var recallCreated = new recallModel({"_id":counter.seq,"title": recall.title,"categoryName":recall.categoryName,"manufacturer": recall.manufacturer,"product": recall.product,"summary": recall.summary,"description": recall.description,"hazard": recall.hazard});
				 	 serviceObj.save(recallCreated,callbackForCreateOrUpdateRecall);
				 });
			 }else{
				 var conditions = { "_id":recall._id };
				 var update = { $set: {"manufacturer": recall.manufacturer,"product": recall.product,"summary": recall.summary,"description": recall.description,"hazard": recall.hazard,"updated_at":new Date()}};
				 this.update(recall,conditions,update,callbackForCreateOrUpdateRecall);
			 }
   },
	 getAllRecalls:function(callbackForGetAllRecalls){
		 var query =recallModel.find({});
		 this.execute(query,callbackForGetAllRecalls);
	 }

}
}

module.exports=recallsService();
