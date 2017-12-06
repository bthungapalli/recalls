var scheduler = require('node-schedule');
var schedulerService=require("../services/schedulerService");
var nconf = require('nconf');


var vehicleScheduler =function(){
	
	var rule = new scheduler.RecurrenceRule();
	rule.hour = nconf.get("scheduler").vehicle_job_hour;
	rule.minute=nconf.get("scheduler").vehicle_job_minute;
	rule.dayOfWeek = new scheduler.Range(0,6);
	
	var j = scheduler.scheduleJob(rule, function(){
		schedulerService.getVehicleDetails();
		});
	
	
	
return{
}
}

module.exports=vehicleScheduler();
