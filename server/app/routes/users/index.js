'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
require('../../../db/models');
var Animal = mongoose.model('Animal');
var User = mongoose.model('User');


// middleware to check if user is admin.
function ensureAdmin(req, res, next) {
    if(req.user && req.user.isAdmin) next();
    else res.status(401).end();
}

var ensureAuthenticated = function (req, res, next) {
    if (req.user) next();
    else res.status(401).end();
};

// Current URL: '/api/users'

router.get('/', function(req, res, next) {
    User.find({})
        .then(function(users) {
            res.status(200).json(users); 
        }).catch(next);
});

router.param('id', function(req, res, next, id) {
    User.findById(id)
        .then(function(user) {
            req.userToUpdate = user;     
            next();
        });
})

//Promote user to admin
router.post('/:id/admin', ensureAdmin, function (req, res, next) {
    req.userToUpdate.isAdmin = true;
    req.userToUpdate
        .save()
        .then(function(user) {
            res.status(200).send(user);
        }).catch(next);
});

//Delete a user

router.delete('/:id', ensureAdmin, function(req, res, next) {
    req.userToUpdate.remove()
        .then(function() {
            res.status(200).end();
        }).catch(next);
});

//Trigger password reset

router.post('/:id/triggerReset', ensureAdmin, function(req, res, next){
    req.userToUpdate.reset = true;
    req.userToUpdate
        .save()
        .then(function(user){
            res.status(204).end();
        }).catch(next);
});

//update password
router.post('/:id/reset', ensureAuthenticated, function(req, res, next){
    var password = req.body.password;
    var salt = User.generateSalt(password);
    var encryptedPassword = User.encryptPassword(password, salt);
    req.userToUpdate.update({
        password: encryptedPassword,
        salt: salt,
        reset: false
    }).then(function(){
        res.status(204).end();
    }).catch(next);
});













