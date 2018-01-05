var express = require('express');
var router = express.Router();
var recallsService=require("../services/recallsService");
var checkSession=require("../services/checkSessionService");
var userService=require("../services/userService");
var categoryService=require("../services/categoryService");
var subCategoryService=require("../services/subCategoryService");
var nconf = require('nconf');
var mailUtil=require("../utils/MailUtil");
var multer = require('multer');

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
		var alreadyExist=false;
		recallsService.createOrUpdateRecall(user,recall,function(err,recallResponse){
			if(err)
        		res.send("error");

			if(recall._id==undefined){

				categoryService.getCategoryByName(recall.categoryName.split("~")[0],function(err,category){
 
					var temp={};
					category.subCategories.forEach((subCategory,index)=>{
						temp[subCategory]=recall.categoryName.split("~")[index+1];
					});
					 alreadyExist=false;
					category.rows.forEach(row=>{
						var i=0;
						for (var prop in row) {
							if(row[prop].toUpperCase()===temp[prop].toUpperCase()){
							i++;
							}
						}
						if(i===category.subCategories.length){
							alreadyExist=true;
						}
					});
					if(!alreadyExist){
						category.rows.push(temp);
						subCategoryService.createOrUpdateSubCategory(category,function(err,category){
							
							user.categories.forEach((userCategory,index)=>{
								console.log(userCategory.categoryName +":"+ category.categoryName);
								if(userCategory.categoryName===category.categoryName){
									console.log("Inside");
									userCategory.rows.push(temp);
								}
							});
							userService.createOrUpdateUser(user,function(err,createdUser){
								if(err)
									res.send("error");
									req.session.user = user;
									res.json({
										"response":recallResponse,
										"alreadyExist":alreadyExist,
										"categories":user.categories
									});
							});
							
						});
					}
				});

				userService.getAllUsersBasedOnCategory(recall,function(err,users){
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
								 console.log("*********"+JSON.stringify(users));
								 
								 users.forEach(function(user, index) {
									 if(user.alertsOn.includes("Email")){
											mailUtil.sendMail(user.email,nconf.get("smtpConfig").authUser,subject,template,context,function(err){
			                console.log("Email sent to: "+user.email);
											});
										}else if(user.alertsOn.includes("Mobile")){
									console.log("Mobile subcription");
										}
									})
								 
				});
			}else{
				res.json({
					"response":recallResponse,
					"alreadyExist":alreadyExist
				});
			}
						
						
		});
});

var storage =   multer.diskStorage({
	  destination: function (req, file, callback) {
	    callback(null, nconf.get("recall").filesPath);
	  },
	  filename: function (req, file, callback) {
		  var datetimestamp = Date.now();
	    callback(null, file.fieldname + '-' + file.originalname.split('.')[0] + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
	  }
	});

	var upload = multer({ storage : storage}).single('file');


router.post('/fileUpload',checkSession.requireLogin,function (req,res,next){
	upload(req,res,function(err){
        if(err){
             res.json({error_code:1,err_desc:err});
             return;
        }
         res.json(req.file);
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

router.get('/download/:fileName',function(request,response,next){
	var fileName = request.params.fileName;
	console.log(fileName);
	var file = nconf.get("recall").filesPath + fileName ;
	  response.download(file,fileName,function(err){
		  if(err)
			  response.json("Error Occured while downloading");
	  })
	
});


module.exports = router;
