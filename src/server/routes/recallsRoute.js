var express = require('express');
var router = express.Router();
var recallsService=require("../services/recallsService");


router.get('/allRecalls',function (req,res,next){
		recallsService.getAllRecalls(function(err,users){
			if(err)
        		res.send("error");
			res.json(users);
		});
});


router.post('/createRecall',function (req,res,next){
		var recall = req.body;
		recallsService.createOrUpdateRecall(recall,function(err,recall){
			if(err)
        		res.send("error");
			res.json(recall);
		});
});

router.post('/filterRecalls',function (req,res,next){
		var recallFilter = req.body;
		recallsService.getRecallsByFilter(recallFilter,function(err,recall){
			if(err)
        		res.send("error");
			res.json(recall);
		});
});



module.exports = router;
