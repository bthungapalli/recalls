var express = require('express');
var router = express.Router();
var subCategoryService=require("../services/subCategoryService");
var checkSession=require("../services/checkSessionService");
var nconf = require('nconf');
var mailUtil=require("../utils/MailUtil");




router.post('/createSubCategory',checkSession.requireLogin,function (req,res,next){
		var categoryDetails = req.body;
		subCategoryService.createOrUpdateSubCategory(categoryDetails,function(err,category){
			if(err)
        		res.send("error");
			res.json(category);
		});
});

router.post('/deleteSubCategory',checkSession.requireLogin,function (req,res,next){
		var subCategoryDetails = req.body;
		subCategoryService.createOrUpdateSubCategory(subCategoryDetails,function(err,user){
			if(err)
        		res.send("error");
			res.json(user);
		});
});




module.exports = router;
