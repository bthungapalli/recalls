var express = require('express');
var router = express.Router();
var userService=require("../services/userService");


router.get('/allUsers',function (req,res,next){
		userService.getAllUsers(function(err,users){
			if(err)
        		res.send("error");
			res.json(users);
		});
});


router.put('/activeOrInActivateUser',function (req,res,next){
		var userDetails = req.body;
		userService.activeOrInActivateUser(userDetails,function(err,user){
			if(err)
        		res.send("error");
			res.json(user);
		});
});


module.exports = router;
