var express = require('express');
var router = express.Router();
var recallsService=require("../services/recallsService");
var checkSession=require("../services/checkSessionService");

router.get('/allRecalls',checkSession.requireLogin,function (req,res,next){
	  var user=req.session.user;
		recallsService.getAllRecalls(user,function(err,users){
			if(err)
        		res.send("error");
			res.json(users);
		});
});


router.post('/createRecall',checkSession.requireLogin,function (req,res,next){
		var recall = req.body;
		var user=req.session.user;
		recallsService.createOrUpdateRecall(user,recall,function(err,recall){
			if(err)
        		res.send("error");
			res.json(recall);
		});
});

router.post('/filterRecalls',checkSession.requireLogin,function (req,res,next){
		var recallFilter = req.body;
			var user=req.session.user;
		recallsService.getRecallsByFilter(user,recallFilter,function(err,recall){
			if(err)
        		res.send("error");
			res.json(recall);
		});
});



module.exports = router;
