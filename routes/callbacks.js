var express = require('express');
var router = express.Router();
var crypto = require('crypto');

var User = require('../models/User')

/* GET home page. */
router.get('/spotify', function(req, res) {
    User.update({
    username:req.param("state")},
    {SpotifyToken:req.param("code")},
        function(err,obj) {
            if( !err ) {
                console.log( 'created' );
                return res.send( "Done" );
            } else {
                console.log( err );
                return res.send(err);
            }
        })
});
router.get('/lastfm', function(req, res) {
    User.update({
            username:"apple"},
        {LastFMToken:req.param("token")},
        function(err,obj) {
            if( !err ) {
                console.log( 'created' );
                return res.send( "Done" );
            } else {
                console.log( err );
                return res.send(err);
            }
        })
});
module.exports = router;
