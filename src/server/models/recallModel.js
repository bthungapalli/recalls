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
    title: {type: String, required: false},
    categoryName:{type: String, required: true},
    
    productName:{type: String, required: false},
    hazard:{type: String, required: false},
    remedy:{type: String, required: false},
    recallDate:{type: Date, required: false},
    recallNumber:{type: String, required: false},
    description:{type: String, required: false},
    incidentsOrInjuries:{type: String, required: false},
    soldAt:{type: String, required: false},
    importer:{type: String, required: false},
    manufacturer:{type: String, required: false},
    manufacturedIn:{type: String, required: false},
    units:{type: String, required: false},
    classRecall:{type: String, required: false},
    healthRisk:{type: String, required: false},
    nHTSACampaignNumber:{type: String, required: false},
    components:{type: String, required: false},
    summary:{type: String, required: false},
    notes:{type: String, required: false},
    number:{type: String, required: false},
    company:{type: String, required: false},
    model:{type: String, required: false},
    hIN:{type: String, required: false},
    disposition:{type: String, required: false},
    boatType:{type: String, required: false},
    severity:{type: String, required: false},
    comments:{type: String, required: false},
    mIC:{type: String, required: false},
    companyOfficial:{type: String, required: false},
    modelYear:{type: String, required: false},
    caseOpenDate:{type: Date, required: false},
    caseCloseDate:{type: Date, required: false},
    campaignOpenDate:{type: Date, required: false},
    campaignCloseDate:{type: Date, required: false},
    immediateRelease:{Date: String, required: false},
    consumers:{type: String, required: false},
    media:{type: String, required: false},
    
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
