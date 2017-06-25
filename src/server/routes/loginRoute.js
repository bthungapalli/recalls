var express = require('express');
var router = express.Router();
var userService=require("../services/userService");

router.post('/',function (req,res,next){
		var userDetails = req.body;
		userService.checkUser(userDetails,function(err,user){
			if(err)
        		res.send("error");
			 req.session.user = userDetails;
			 res.json(user);
		});
});




module.exports = router;
