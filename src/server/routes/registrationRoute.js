var express = require('express');
var router = express.Router();
var userService=require("../services/userService");



router.post('/',function (req,res,next){
		var userDetails = req.body;
		userService.createOrUpdateUser(userDetails,function(err,createdUser){
			if(err)
        		res.send("error");
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


module.exports = router;
