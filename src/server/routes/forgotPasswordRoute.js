var express = require('express');
var router = express.Router();
var nconf = require('nconf');

var userService=require("../services/userService");
var mailUtil=require("../utils/MailUtil");
var Cryptr = require('cryptr'),
cryptr = new Cryptr('recallsSecretKeyToEncryptPassword');



router.post('/:email',function (req,res,next){
		var email = req.params.email;
		userService.getUser({"email":email},function(err,user){
			if(err)
        		res.send("error");

			if(user==null){
				res.json({"emailSent":false});
			}else{

				var subject =  nconf.get("mail").subject+"Password for Recalls";
				var template = "forgotPassword.html";

				var context =  {
						title : nconf.get("mail").appName,
						username : user.firstName,
						password : cryptr.decrypt(user.password),
						appURL : nconf.get("mail").appURL,
						appName : nconf.get("mail").appName
						// contextPath : nconf.get("context").path
					};
				mailUtil.sendMail(email,nconf.get("smtpConfig").authUser,subject,template,context,function(err){
				res.json({"emailSent":true});
			});

		};
});
});



module.exports = router;
