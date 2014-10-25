var express = require('express');
var router = express.Router();
var crypto = require('crypto');

var User = require('../models/User')

/* GET home page. */
router.post('/register', function(req, res) {

    var generatedtoken = crypto.randomBytes(64).toString('hex');

    var u = new User({
    username: req.param("username"),
    password: req.param("password"),
    spotifyID: req.param("spotifyID"),
    lastFMID: req.param("lastFMID"),
    token: generatedtoken
    });

    u.save( function( err ) {
        if( !err ) {
            console.log( 'created' );
            return res.send( u );
        } else {
            console.log( err );
            return res.send(err);
        }
    });

});

router.post('/login', function(req, res) {
    if(req.param("SSID")) {
        User.update({
                username: req.param("username"),
                password: req.param("password")},
            {SSID:req.param("SSID"), mac:req.param("mac")},
            function (err, obj) {
            console.log(obj)
            })

        User.findOne({
                username: req.param("username"),
                password: req.param("password")},
            function (err, obj) {
                res.send(obj);
            })
    }
    else if (req.param("username")){
        User.findOne({
                username: req.param("username"),
                password: req.param("password")},
            function (err, obj) {
                res.send(obj);
            })
    }
});

router.post('/update', function(req, res) {

    var u = new User({
        username: req.param("username"),
        password: req.param("password"),
        spotifyID: req.param("spotifyID"),
        lastFMID: req.param("lastFMID"),
        SSID: req.param("SSID")
    });

    User.update({
            username:req.param("username"),
            password:req.param("password")},
        u,
        function(err,obj) {
            if( !err ) {
                console.log( 'created' );
                return res.send( u );
            } else {
                console.log( err );
                return res.send(err);
            }
        })
});

module.exports = router;
