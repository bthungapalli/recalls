var scheduler = require('node-schedule');
var schedulerService=require("../services/schedulerService");
var nconf = require('nconf');
var recallsService=require("../services/recallsService");
var userService=require("../services/userService");

var emailScheduler =function(){
	
	var rule = new scheduler.RecurrenceRule();
	rule.hour = nconf.get("scheduler").email_job_hour;
	rule.minute=nconf.get("scheduler").email_job_minute;
	rule.dayOfWeek = new scheduler.Range(0,6);
	
	var j = scheduler.scheduleJob(rule, function(){
		console.log("Email Job Started");
		recallsService.getJobRecalls(function(err,recalls){

			recalls.forEach(recall=>{
				userService.getAllUsersBasedOnCategory(recall,function(err,users){
					if(err)
					res.send("error");

					if(users.length>0){
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
					}
			 
				});
			})

			

		});

		});
	
	
	
return{
}
}

module.exports=emailScheduler();
