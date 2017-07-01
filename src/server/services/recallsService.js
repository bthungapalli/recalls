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
	delete:function(condition,callbackForDelete){
		recallModel.remove(condition,function(err){
			 if(err){
				 console.log(err)
				 callbackForDelete(err);
			 }
			 callbackForDelete(null,{});
	 });
	},
		createOrUpdateRecall : function(user,recall,callbackForCreateOrUpdateRecall){
			 if(recall._id ==undefined){
				 var serviceObj=this;
				 counterModel.findByIdAndUpdate({_id : "recallId"}, {$inc: {seq: 1} }, function(error, counter)   {
				 	 if(error){
				 		 console.log("error:"+error);
				 		 callbackForCreateOrUpdateRecall(error);
				 	 }
				 	 var recallCreated = new recallModel({"_id":counter.seq,"title": recall.title,"categoryName":recall.categoryName,"manufacturer": recall.manufacturer,"product": recall.product,"summary": recall.summary,"description": recall.description,"hazard": recall.hazard,"created_by":user.email});
				 	 serviceObj.save(recallCreated,callbackForCreateOrUpdateRecall);
				 });
			 }else{
				 var conditions = { "_id":recall._id };
				 var update = { $set: {"categoryName":recall.categoryName,"manufacturer": recall.manufacturer,"product": recall.product,"summary": recall.summary,"description": recall.description,"hazard": recall.hazard,"updated_at":new Date()}};
				 this.update(recall,conditions,update,callbackForCreateOrUpdateRecall);
			 }
   },
	 getAllRecalls:function(user,callbackForGetAllRecalls){
		 var condition;
		 if(user.role==="Vendor"){
			 condition={"created_by":user.email};
		 }else{
			 condition={};
		 }
		 var query =recallModel.find(condition);
		 this.execute(query,callbackForGetAllRecalls);
	 },
	 getRecallsByFilter:function(user,recallFilter,callbackForGetAllRecallsByFilter){
			var condition;
			var startDate = new Date(recallFilter.fromDate);
			startDate.setDate(startDate.getDate());
			var endDate = new Date(recallFilter.toDate);
			endDate.setDate(endDate.getDate());
			startDate.setHours(0,0,0,0);
			endDate.setHours(23,59,59,999);
			if(user.role==="Vendor"){
				if(recallFilter.category=="All"){
					condition={$and : [{"created_at": {$gte: startDate}},{"created_at": {$lte: endDate}},{"created_by":user.email}]};
				}else{
					condition={$and : [{"created_at": {$gte: startDate}},{"created_at": {$lte: endDate}},{"categoryName":recallFilter.category},{"created_by":user.email}]};
				}
			}else{
				if(recallFilter.category=="All"){
					condition={$and : [{"created_at": {$gte: startDate}},{"created_at": {$lte: endDate}}]};
				}else{
					condition={$and : [{"created_at": {$gte: startDate}},{"created_at": {$lte: endDate}},{"categoryName":recallFilter.category}]};
				}
			}
		 var query =recallModel.find(condition);
		 this.execute(query,callbackForGetAllRecallsByFilter);
	 },
	 getRecallsById:function(id,callbackForGetRecallsById){
		 var query =recallModel.findOne({"_id":id});
		 this.execute(query,callbackForGetRecallsById);
	 },
	 deleteRecall:function(id,callbackForDeleteRecall){
		 this.delete({"_id":id},callbackForDeleteRecall);
	 }

}
}

module.exports=recallsService();
