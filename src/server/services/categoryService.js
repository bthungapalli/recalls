var counterModel = require("../models/counterModel");
var categoryModel=require("../models/categoryModel");
var categoryService =function(){

return{

	update:function(object,conditions,update,callbackForUpdate){
		 categoryModel.update(conditions, update, callback);
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
		query.exec(function(err, category){
				if(err)
					callbackForExecute(err);
					callbackForExecute(null,category);
		});
	},
	save:function(category,callbackForSave){
		category.save(function(err){
			 if(err){
				 console.log(err)
				 callbackForSave(err);
			 }
			 callbackForSave(null,category);
	 });
	},
	delete:function(category,condition,callbackForDelete){
		categoryModel.remove(condition,function(err){
			 if(err){
				 console.log(err)
				 callbackForDelete(err);
			 }
			 callbackForDelete(null,category);
	 });
	},
		createOrUpdateCategory : function(category,callbackForCreateOrUpdateCategory){
			 if(category._id ==undefined){
				 var serviceObj=this;
				 counterModel.findByIdAndUpdate({_id : "categoryId"}, {$inc: {seq: 1} }, function(error, counter)   {
				 	 if(error){
				 		 console.log("error:"+error);
				 		 callbackForCreateOrUpdateCategory(error);
				 	 }
				 	 var categoryCreated = new categoryModel({"_id":counter.seq,"categoryName": category.categoryName});
				 	 serviceObj.save(categoryCreated,callbackForCreateOrUpdateCategory);
				 });
			 }else{
				 var conditions = { "_id":category._id };
				 var update = { $set: {"categoryName": category.categoryName,"updated_at":new Date()}};
				 this.update(category,conditions,update,callbackForCreateOrUpdateCategory);
			 }
   },
	 getAllCategories:function(callbackForGetAllCategories){
		 var query = categoryModel.find({});
		 this.execute(query,callbackForGetAllCategories);
	 },
	 deleteCategory:function(category,callbackForDeleteCategory){
		 var conditions = { "_id":category._id };
		 this.delete(category,conditions,callbackForDeleteCategory);
	 },
	 getCategoryById:function(id,callbackForGetCategoryById){
		 var query = categoryModel.find({"_id":id});
		 this.execute(query,callbackForGetCategoryById);
	 }

}
}

module.exports=categoryService();
