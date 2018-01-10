var nconf = require('nconf');
var Client = require('node-rest-client').Client;
var recallsService = require("./recallsService");
var categoryService = require("./categoryService");
var subCategoryService = require("./subCategoryService");
var counterModel = require("../models/counterModel");
var recallModel=require("../models/recallModel");
var recallJobModel=require("../models/recallJobModel");
var userService=require("./userService");
var categoryModel=require("../models/categoryModel");

var schedulerService =function(){
	var noOfIterations=0;
	var offSet=0;
	var flagForFirstTime=true;
	var i=0;
	var motorVehicleSubCategories=[];
return{
 
	 getVehicleDetails:function(){

		 if(flagForFirstTime){
			recallsService.deleteJobRecalls({},function(err){
				if(err)
				console.log("err"+err);
				console.log("Deleted Job Recalls");
			});
		 }
		
		 if(noOfIterations>=i || flagForFirstTime){
			flagForFirstTime=false;
			
			var d = new Date();
			var month = '' + (d.getMonth() + 1);
			var day = '' + d.getDate();
			var year = d.getFullYear();
   
		   if (month.length < 2) month = '0' + month;
		   if (day.length < 2) day = '0' + day;
   
		   var date= year+'-'+month+'-'+day;
			var url="https://api.nhtsa.gov/vehicles/bySearch?productDetail=minimal&data=recalls&query="+year+"&dateStart="+date+"&dateEnd="+date+"&sort=recallsCount&order=desc&max=50&offset="+offSet;
			
			var client = new Client();
			var self=this;
			client.get(url, function (data, response) {
				
				 noOfIterations=data.meta.pagination.total/50;
				 i=i+1;
				 data.results.forEach(function(vehicle){
					 var vehicleArray=[ 
						 {
							 "year" : vehicle.modelYear,
							 "model" :vehicle.vehicleModel,
							 "name" : vehicle.make
						 }];
					var tempMotorVehicleCategories={
						"manufacturer":vehicle.make,
						"model":vehicle.vehicleModel,
						"year":vehicle.modelYear.toString()
					}
					var subCategoryExist=false;
					motorVehicleSubCategories.forEach(subCategory=>{
							if(JSON.stringify(subCategory)===JSON.stringify(tempMotorVehicleCategories)){
								subCategoryExist=true;
							}
					});
					if(!subCategoryExist){
						motorVehicleSubCategories.push(tempMotorVehicleCategories);
					}
			
					 vehicle.safetyIssues.recalls.forEach(function(recall1){
						 var recall=recall1;
						  counterModel.findByIdAndUpdate({_id : "recallId"}, {$inc: {seq: 1} }, function(error, counter)   {
							  var recallCreated = new recallModel(
										  {"_id":counter.seq,"title": recall.subject,"categoryName":"Motor Vehicles~"+vehicle.make+"~"+vehicle.vehicleModel+"~"+vehicle.modelYear, 
										  "subCategories" : [ "manufacturer", "model", "year"],"remedy":recall.correctiveAction,"description":recall.consequence,"manufacturer":recall.manufacturer,
										  "units":recall.potentialNumberOfUnitsAffected,"nHTSACampaignNumber":recall.nhtsaCampaignNumber,"components":recall.components[0].description,
										  "summary":recall.summary,"notes":recall.notes,"vehicles":vehicleArray,"created_by":"SYSTEM"
										  })
								 recallsService.save(recallCreated,function(error,recall){
									 
								 });
						  });
						  counterModel.findByIdAndUpdate({_id : "recallJobId"}, {$inc: {seq: 1} }, function(error, counter)   {
							var recallCreated = new recallJobModel(
										{"_id":counter.seq,"title": recall.subject,"categoryName":"Motor Vehicles~"+vehicle.make+"~"+vehicle.vehicleModel+"~"+vehicle.modelYear, 
										"subCategories" : [ "manufacturer", "model", "year"],"remedy":recall.correctiveAction,"description":recall.consequence,"manufacturer":recall.manufacturer,
										"units":recall.potentialNumberOfUnitsAffected,"nHTSACampaignNumber":recall.nhtsaCampaignNumber,"components":recall.components[0].description,
										"summary":recall.summary,"notes":recall.notes,"vehicles":vehicleArray,"created_by":"SYSTEM"
										})
									
							   recallsService.save(recallCreated,function(error,recall){
								   
							   });
						});
					 })
				 
				 });
				 offSet=offSet+50;		
				 self.getVehicleDetails();
			 });
		 }else{
			
			var motorVehicleSubCategoriesTemp=motorVehicleSubCategories;
			categoryService.getCategoryById("4",function(error,category){
				if(error)
				console.log(error);
				Array.prototype.push.apply(category[0].rows,motorVehicleSubCategoriesTemp);
				
				subCategoryService.createOrUpdateSubCategory(category[0],function(err){
					if(err)
					console.log(err);
					console.log("Updated Successfully");
				})
			});
		 }
	 },
	

}
}

module.exports=schedulerService();
