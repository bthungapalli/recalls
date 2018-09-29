var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var counterModel = require("./counterModel");



var counter = new counterModel({ "_id": "drugId", "seq": 1 });
counter.save(function (err) {
    if (err)
        return err;
});

var DrugsSchema = new Schema({
    _id: { type: Number, required: true, default: 0 },
    title: String,
    description: String,
    company: String,
    brand: String,
    reason: String,
    categoryName: {type: String, default: 'Drugs' },
    releaseDate: { type: Date, default: Date.now },
    contact: {
      consumers: {
        person: String,
        email: String,
        phone: Number
      },
      media: {
        person: String,
        email: String,
        phone: Number
      }
    },
    file: String,
    releaseText: String,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});


DrugsSchema.pre('save', function (next) {

    now = new Date();
    this.updated_at = now;
    if (!this.created_at) {
        this.created_at = now
    }
    next();
});

module.exports = mongoose.model('drugsRecall', DrugsSchema);
