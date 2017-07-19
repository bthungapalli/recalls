var express = require('express');
var router = express.Router();
var recallsService=require("../services/recallsService");
var checkSession=require("../services/checkSessionService");
var userService=require("../services/userService");
var nconf = require('nconf');
var mailUtil=require("../utils/MailUtil");


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

						userService.getAllUsersBasedOnCategory(recall.categoryName,function(err,users){
							if(err)
										res.send("error");
										var subject =  nconf.get("mail").subject+" New Recall ";
										var template = "newRecall.html";

										var context =  {
												title : nconf.get("mail").appName,
												recallTitle : recall.title,
												recallCategory : recall.categoryName,
												appURL : nconf.get("mail").appURL,
												appName : nconf.get("mail").appName
												// contextPath : nconf.get("context").path
											};

										for( var user in users){
												if(user.alertsOn.includes("Email")){
													mailUtil.sendMail(user.email,nconf.get("smtpConfig").authUser,subject,template,context,function(err){
					                console.log("Email sent to: "+user.email);
													});
												}else if(user.alertsOn.includes("Mobile")){
        									console.log("Mobile subcription");
												}
										}
						});

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


router.get('/:id',checkSession.requireLogin,function (req,res,next){
		var recallId=req.params.id;
		recallsService.getRecallsById(recallId,function(err,recall){
			if(err)
        		res.send("error");
			res.json(recall);
		});
});

router.delete('/:id',checkSession.requireLogin,function (req,res,next){
		var recallId=req.params.id;
		recallsService.deleteRecall(recallId,function(err,recall){
			if(err)
        		res.send("error");
			res.json(recall);
		});
});



module.exports = router;
