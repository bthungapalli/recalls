var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var counterModel = require("./counterModel");



var counter = new counterModel({ "_id": "foodId", "seq": 1 });
counter.save(function (err) {
    if (err)
        return err;
});

var FoodSchema = new Schema({
    _id: { type: Number, required: true, default: 0 },
    title: String,
    description: String,
    categoryName: {type: String, default: 'Food' },
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


FoodSchema.pre('save', function (next) {

    now = new Date();
    this.updated_at = now;
    if (!this.created_at) {
        this.created_at = now
    }
    next();
});

module.exports = mongoose.model('foodRecall', FoodSchema);
