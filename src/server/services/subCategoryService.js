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

		createOrUpdateSubCategory : function(category,callbackForCreateOrUpdateSubCategory){
			 
				 var conditions = { "_id":category._id };
				 var update = { $set: {"rows":category.rows,"updated_at":new Date()}};
				 this.update(category,conditions,update,callbackForCreateOrUpdateSubCategory);

   }

}
}

module.exports=categoryService();
