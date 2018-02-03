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
var excel = require("exceljs");
var path = require('path');
var nconf = require('nconf');
var xlsxtojson = require("xlsx-to-json-lc");
var Cryptr = require('cryptr'),
cryptr = new Cryptr('recallsSecretKeyToEncryptRecallId');

router.get('/allRecalls',checkSession.requireLogin,function (req,res,next){
	  var user=req.session.user;//
	  userService.getUser(user,function(err,response){
		if(err)
			res.send("error");
			recallsService.getAllRecalls(response,function(err,recalls){
				if(err)
					res.send("error");
				res.json(recalls);
			});
		});
	
	 
});

router.post('/createRecall',checkSession.requireLogin,function (req,res,next){
		var recall = req.body;
		var user=req.session.user;//
		
		userService.getUser(user,function(err,response){
			if(err)
				res.send("error");
				user=response;
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
											var tempUser=JSON.parse(JSON.stringify(user));
											tempUser["categories"]=null;
											req.session.user = tempUser;//	
											
											res.json({
												"response":recallResponse,
												"alreadyExist":alreadyExist,
												"categories":user.categories
											});
									});
									
								});
							}else{
								res.json({
									"response":recallResponse,
									"alreadyExist":alreadyExist
									
								});
							}
						});
				
						userService.getAllUsersBasedOnCategory(recall,function(err,users){
							if(err)
							console.log(err);
		
										if(recall.externalUsers!==undefined || users){
											var subject =  nconf.get("mail").subject+" New Recall ";
											var template = "newRecall.html";
											var content=[];
			
											for(let key in recall){
												
												if(( key!="files" &&  key!="vehicles" && key!="subCategories" && key!="externalUsers") && (recall[key]!=undefined || recall[key]!="")){
													content.push({
														"key":key[0].toUpperCase() + key.substr(1).replace(/([A-Z])/g, ' $1').trim(),
														"value": key==='description'? recall[key].replace(/<\/?[^>]+(>|$)/g, "") : recall[key]
														
													})
												}
											}
										var recallId = cryptr.encrypt(recallResponse._id);
											
											var context =  {
													title : nconf.get("mail").appName,
													url : nconf.get("context").path+nconf.get("recall").showRecallPath+recallId,
													// recallCategory : recall.categoryName,
													content:content,
													appURL : nconf.get("mail").appURL,
													appName : nconf.get("mail").appName
													
												};
											 
											 var emails=[];
											 users.forEach(function(user, index) {
												 if(user.alertsOn.includes("Email")){
													emails.push(user.email);
													}else if(user.alertsOn.includes("Mobile")){
													console.log("Mobile subcription");
													}
											});
											if(recall.externalUsers!==undefined){
												recall.externalUsers.forEach(function(user){
													emails.push(user.emailid);
													});
											}
											if(emails.length>0){
												mailUtil.sendMail(emails,nconf.get("smtpConfig").authUser,subject,template,context,function(err){
													console.log("Email sent to: "+user.email);
												});
											}
											
										}
										
										 
						});
					}else{
						res.json({
							"response":recallResponse,
							"alreadyExist":alreadyExist
						});
					}
								
								
				});
			 });

		
});

var storage =   multer.diskStorage({
	  destination: function (req, file, callback) {
	    callback(null, nconf.get("recall").filesPath);
	  },
	  filename: function (req, file, callback) {
		  var datetimestamp = Date.now();
		  var random=Math.floor(Math.random() * 1000) + 1 ;
	    callback(null, file.fieldname + '-' + file.originalname.split('.')[0] + '-' +  random + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
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
			var user=req.session.user;//
			
		 userService.getUser(user,function(err,response){
		 	if(err)
		 		res.send("error");
			
				recallsService.getRecallsByFilter(user,recallFilter,function(err,recall){
					if(err)
						res.send("error");
					res.json(recall);
				});
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

router.get('/template/userExcel',function(request,response,next){
	
	var file = path.resolve(__dirname+'/../templates/'+nconf.get("recall").userExcelTemplate)  ;
	response.download(file);
	
});


var storage1 =   multer.diskStorage({
	
	filename: function (req, file, callback) {
		
		callback(null,file.originalname);
	}
  });

  var upload1 = multer({ storage : storage1}).single('file');


router.post('/upload/userExcel',function (req,res,next){
	var exceltojson;
  upload1(req,res,function(err){
	  if(err){
		   res.json({error_code:1,err_desc:err});
		   return;
	  }
	  exceltojson = xlsxtojson;
	  try {
		exceltojson({
			input: req.file.path,
			output: null, //since we don't need output.json
			lowerCaseHeaders:true
		}, function(err,result){
			if(err) {
				return res.json({error_code:1,err_desc:err, data: null});
			} 
			res.json({error_code:0,err_desc:null, data: result});
		});
	} catch (e){
		res.json({error_code:1,err_desc:"Corupted excel file"});
	}
  });
});

router.get('/showRecall/:recallId',function(request,response,next){
	var recallId = request.params.recallId;
	var decryptedRecallId = cryptr.decrypt(recallId);
	console.log("decryptedRecallId"+decryptedRecallId);
	recallsService.getRecallsById(decryptedRecallId,function(err,recall){
		if(err)
		response.send("error");
		response.json(recall);
	});
});



module.exports = router;
