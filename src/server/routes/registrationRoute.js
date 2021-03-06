var express = require('express');
var router = express.Router();
var userService=require("../services/userService");
var nconf = require('nconf');
var mailUtil=require("../utils/MailUtil");
var Cryptr = require('cryptr'),
cryptr = new Cryptr('recallsSecretKeyToEncryptPassword');


router.post('/',function (req,res,next){
		var userDetails = req.body;
		userDetails.password = cryptr.encrypt(userDetails.password);
		userService.createOrUpdateUser(userDetails,function(err,createdUser){
			if(err)
				res.send("error");
				
				// var tempUser=JSON.parse(JSON.stringify(createdUser));
				// tempUser["categories"]=null;
				// req.session.user = tempUser;
					
						
						var subject =  nconf.get("mail").subject+" Register Confirmation for Recall";
						var template = "registerConfirmation.html";

						var context =  {
								title : nconf.get("mail").appName,
								username : createdUser.firstName,
								appURL : nconf.get("mail").appURL,
								appName : nconf.get("mail").appName,
								activationURL:nconf.get("context").path+"registrationConfirmation?token="+createdUser.token
							};
						mailUtil.sendMail(createdUser.email,nconf.get("smtpConfig").authUser,subject,template,context,function(err){
						
					});
								
						
			res.json(createdUser);
		});
});

router.post('/checkEmail',function (req,res,next){
		var userDetails = req.body;
		userService.getUser(userDetails,function(err,user){
			if(err)
        		res.send("error");
						if(user!=null){
								res.json({"alreadyExist":true});
						}else{
								res.json({"alreadyExist":false});
						}

		});
});


router.get('/registrationConfirmation',function (req,res,next){
	var token = req.query.token;
	
	userService.getUserForToken(token,function(err,user){
		if(err)
    		res.send("error");
					if(user==null){
							res.json({"token":false});
					}else{
						userService.activateUserByToken(token,function(err,user){
							if(err)
					    		res.send("error");
							res.json({"token":true});
						});
					}

	});
	
});


module.exports = router;
