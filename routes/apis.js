var express = require('express');
var router = express.Router();
var crypto = require('crypto');

var User = require('../models/User')

/* GET home page. */
router.post('/auth', function(req, res) {

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

module.exports = router;
