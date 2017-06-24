var express = require('express');
var router = express.Router();
var categoryService=require("../services/categoryService");


router.get('/allCategories',function (req,res,next){
		categoryService.getAllCategories(function(err,users){
			if(err)
        		res.send("error");
			res.json(users);
		});
});


router.post('/createCategory',function (req,res,next){
		var categoryDetails = req.body;
		categoryService.createOrUpdateCategory(categoryDetails,function(err,user){
			if(err)
        		res.send("error");
			res.json(user);
		});
});

router.delete('/deleteCategory',function (req,res,next){
		var categoryDetails = req.body;
		categoryService.deleteCategory(categoryDetails,function(err,user){
			if(err)
        		res.send("error");
			res.json(user);
		});
});


module.exports = router;
