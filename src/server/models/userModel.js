var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;
var counterModel     = require("./counterModel");



var counter = new counterModel({"_id":"userId","seq": 1});
counter.save(function(err){
    if(err)
    	return err;
});

var UserSchema = new Schema({
   	_id:{type: Number, required: true,default:0},
    firstName: {type: String, required: true},
    lastName:{type: String, required: true},
    email: {type: String, required: true},
    password:{type: String, required: true},
    mobileNumber: {type: String, required: true},
    street:{type: String, required: true},
    city:{type: String, required: true},
    state: {type: String, required: true},
    zipcode:{type: String, required: true},
    alertsOn:{type: Array, required: true},
    role:{type:String,required:true},
    isActive:{type: Boolean, required: true,default:true},
    categories:{type:Array,required:true},
    token:{type:Number,required:true},
    registrationConfirmed:{type:Boolean,required:false},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});


    UserSchema.pre('save', function(next){

    now = new Date();
    this.updated_at = now;
    if(!this.created_at) {
        this.created_at = now
    }
    next();
    });

module.exports = mongoose.model('recallUsers', UserSchema);
