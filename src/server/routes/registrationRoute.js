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


module.exports = router;
