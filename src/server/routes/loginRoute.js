var express = require('express');
var router = express.Router();
var userService=require("../services/userService");
var Cryptr = require('cryptr'),
cryptr = new Cryptr('recallsSecretKeyToEncryptPassword');

router.post('/',function (req,res,next){
		var userDetails = req.body;
		userService.checkUser(userDetails,function(err,user){
			if(err)
        		res.send("error");
			
			decryptedPassword = cryptr.decrypt(user.password);
			if(decryptedPassword==userDetails.password){
				req.session.user = userDetails;
				 res.json(user);
			}else{
				res.json(null);
			}
		});
});




module.exports = router;
