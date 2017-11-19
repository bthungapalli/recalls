var counterModel = require("../models/counterModel");
var recallModel=require("../models/recallModel");
var recallJobModel=require("../models/recallJobModel");
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
	deleteJobRecalls:function(condition,callbackForDelete){
		recallJobModel.remove(condition,function(err){
			 if(err){
				 console.log(err)
				 callbackForDelete(err);
			 }
			 callbackForDelete(null,{});
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
				 	 var recallCreated = new recallModel(
				 	{"_id":counter.seq,"title": recall.title,"categoryName":recall.categoryName,"subCategories":recall.subCategories,"productName": recall.productName,
					"hazard": recall.hazard,"remedy": recall.remedy,"recallDate": recall.recallDate,"recallNumber": recall.recallNumber,
					"description": recall.description,"incidentsOrInjuries": recall.incidentsOrInjuries,"soldAt": recall.soldAt,"importer": recall.importer,
					"manufacturer":recall.manufacturer,"manufacturedIn": recall.manufacturedIn,"units": recall.units,"classRecall": recall.classRecall,"healthRisk": recall.healthRisk,
					"nHTSACampaignNumber": recall.nHTSACampaignNumber,"components": recall.components,"summary": recall.summary,"notes": recall.notes,
					"number": recall.number,"company": recall.company,"modelName": recall.modelName,"hIN": recall.hIN,"files":recall.files,
					"immediateRelease": recall.immediateRelease,"consumers": recall.consumers,"media": recall.media,"vehicles": recall.vehicles,
					"disposition": recall.disposition,"boatType": recall.boatType,"severity": recall.severity,"comments": recall.comments,
					"mIC": recall.mIC,"companyOfficial": recall.companyOfficial,"modelYear": recall.modelYear,"caseOpenDate": recall.caseOpenDate,
					"caseCloseDate": recall.caseCloseDate,"campaignOpenDate": recall.campaignOpenDate,"campaignCloseDate": recall.campaignCloseDate,
					"created_by":user.email});
				 	 serviceObj.save(recallCreated,callbackForCreateOrUpdateRecall);
				 });
			 }else{
				 var conditions = { "_id":recall._id };
				 var update = { $set: {"title": recall.title,"categoryName":recall.categoryName,"productName": recall.productName,
					 "hazard": recall.hazard,"remedy": recall.remedy,"recallDate": recall.recallDate,"recallNumber": recall.recallNumber,
					 "description": recall.description,"incidentsOrInjuries": recall.incidentsOrInjuries,"soldAt": recall.soldAt,"importer": recall.importer,
					 "manufacturer":recall.manufacturer,"manufacturedIn": recall.manufacturedIn,"units": recall.units,"classRecall": recall.classRecall,"healthRisk": recall.healthRisk,
					 "nHTSACampaignNumber": recall.nHTSACampaignNumber,"components": recall.components,"summary": recall.summary,"notes": recall.notes,
					 "number": recall.number,"company": recall.company,"modelName": recall.modelName,"hIN": recall.hIN,"files":recall.files,
					 "immediateRelease": recall.immediateRelease,"consumers": recall.consumers,"media": recall.media,"vehicles": recall.vehicles,
					 "disposition": recall.disposition,"boatType": recall.boatType,"severity": recall.severity,"comments": recall.comments,
					 "mIC": recall.mIC,"companyOfficial": recall.companyOfficial,"modelYear": recall.modelYear,"caseOpenDate": recall.caseOpenDate,
					 "caseCloseDate": recall.caseCloseDate,"campaignOpenDate": recall.campaignOpenDate,"campaignCloseDate": recall.campaignCloseDate,
					 "updated_at":new Date()}};
				 this.update(recall,conditions,update,callbackForCreateOrUpdateRecall);
			 }
   },
	 getAllRecalls:function(user,callbackForGetAllRecalls){
		 var condition;
		 if(user.role==="Retailer"){
			 condition={"created_by":user.email,"categoryName":{$in:user.categories}};
		 }else{
			 condition={};//{"categoryName":{$in:user.categories}};
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
			
			var startDate;
			var endDate;
			if(recallFilter.fromDate !==undefined && recallFilter.toDate!==undefined){
				startDate= new Date(recallFilter.fromDate);
					startDate.setDate(startDate.getDate());
					 endDate = new Date(recallFilter.toDate);
					endDate.setDate(endDate.getDate());
					startDate.setHours(0,0,0,0);
					endDate.setHours(23,59,59,999);
			}else if(recallFilter.fromDate !==undefined){
				startDate= new Date(recallFilter.fromDate);
				startDate.setDate(startDate.getDate());
				 endDate = new Date(recallFilter.fromDate);
				endDate.setDate(endDate.getDate());
				startDate.setHours(0,0,0,0);
				endDate.setHours(23,59,59,999);
			}else if(recallFilter.toDate !==undefined){
				startDate= new Date(recallFilter.toDate);
				startDate.setDate(startDate.getDate());
				 endDate = new Date(recallFilter.toDate);
				endDate.setDate(endDate.getDate());
				startDate.setHours(0,0,0,0);
				endDate.setHours(23,59,59,999);
			}
			
			if(user.role==="Retailer"){
				
				if(recallFilter.fromDate !==undefined || recallFilter.toDate!==undefined){
					if(recallFilter.category=="All"){
						condition={$and : [{"created_at": {$gte: startDate}},{"created_at": {$lte: endDate}},{"categoryName":user.categories},{"created_by":user.email}]};
					}else{
						condition={$and : [{"created_at": {$gte: startDate}},{"created_at": {$lte: endDate}},{"categoryName":recallFilter.category},{"created_by":user.email}]};
					}
				}else{
					if(recallFilter.category=="All"){
						condition={$and : [{"categoryName":user.categories},{"created_by":user.email}]};
					}else{
						condition={$and : [{"categoryName":recallFilter.category},{"created_by":user.email}]};
					}
				}
				
			}else{
				
				if(recallFilter.fromDate !==undefined || recallFilter.toDate!==undefined){
					if(recallFilter.category=="All"){
						condition={$and : [{"created_at": {$gte: startDate}},{"created_at": {$lte: endDate}},{"categoryName":user.categories}]};
					}else{
						condition={$and : [{"created_at": {$gte: startDate}},{"created_at": {$lte: endDate}},{"categoryName":recallFilter.category}]};
					}
				}else{
					if(recallFilter.category=="All"){
						condition={$and : [{"categoryName":user.categories}]};
					}else{
						condition={$and : [{"categoryName":recallFilter.category}]};
					}
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
	 },
	 getJobRecalls:function(callbackForGetJobRecalls){
		 var query =recallJobModel.find({});
		 this.execute(query,callbackForGetJobRecalls);
	 }

}
}

module.exports=recallsService();
