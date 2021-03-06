'use strict';

var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		unique: true,
		sparse: true,
		ref: 'User'
	},
	items: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Item'
	}]
});

schema.methods.deleteItem = function (itemId) {
  this.items.pull(itemId);
  return this.save();
};

schema.methods.addItem = function (itemId) {
	this.items.push(itemId);
  return this.save();
};

mongoose.model('Cart', schema);