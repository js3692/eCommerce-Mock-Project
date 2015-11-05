'use strict';
var mongoose = require('mongoose');

var animalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        default: 'http://fillmurray.com/g/200/300'
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: [String], 
        required: true
    },
    countryCode: {
        type: [String]
    },
    conservationStatus: {
        type: String,
        enum: ['Near Threatened', 'Vulnerable', 'Endangered', 'Critically Endangered', 'Extinct in the Wild', 'Extinct']
    },
    rating: {
        type: Number,
        min: 1, 
        max: 5
    },
    inventoryQuantity: {
        type: Number,
        required: true
    }
});

animalSchema.statics.checkIfUnique = function(name) {
    return this
        .findOne({ name: name })
        .then(function(animal) {
            return !Boolean(animal);    
        });
}

animalSchema.statics.findByCat = function (categories) {
    var catArr = categories.split(/[\s,]+/);
    return this.find({category: {$in: catArr}});
};

animalSchema.methods.getSimilar = function () {
    var myCat = this.category;
    return this.constructor
    .find({
        _id: {$ne: this._id},
        category: {$in: myCat}
    });
};


mongoose.model('Animal', animalSchema);