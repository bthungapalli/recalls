var express = require('express');
var router = express.Router();
var userService=require("../services/userService");
var checkSession=require("../services/checkSessionService");

router.put('/',checkSession.requireLogin,function (req,res,next){
		var userDetails = req.body;
		userService.createOrUpdateUser(userDetails,function(err,createdUser){
			if(err)
        		res.send("error");
			res.json(createdUser);
		});
});


module.exports = router;
