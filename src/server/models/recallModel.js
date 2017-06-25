var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;
var counterModel     = require("./counterModel");



var counter = new counterModel({"_id":"recallId","seq": 1});
counter.save(function(err){
    if(err)
    	return err;
});

var RecallSchema = new Schema({
   	_id:{type: Number, required: true,default:0},
    title: {type: String, required: true},
    categoryName:{type: String, required: true},
    manufacturer:{type: String, required: false},
    product: {type: String, required: false},
    summary:{type: String, required: true},
    description: {type: String, required: true},
    hazard:{type: String, required: false},
    created_by:{type: String, required: true},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});


    RecallSchema.pre('save', function(next){

    now = new Date();
    this.updated_at = now;
    if(!this.created_at) {
        this.created_at = now
    }
    next();
    });

module.exports = mongoose.model('recalls', RecallSchema);
