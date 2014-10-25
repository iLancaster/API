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
                res.writeHeader(200, {"Content-Type": "text/html"});
                res.write("<button href='javascript:auth.close()'>Done</button>" );
                res.end();
                return;
            } else {
                console.log( err );
                return res.send(err);
            }
        })
});
router.get('/lastfm', function(req, res) {
    User.update({
            username:req.param("username")},
        {LastFMToken:req.param("token")},
        function(err,obj) {
            if( !err ) {
                console.log( 'created' );
                response.writeHeader(200, {"Content-Type": "text/html"});
                response.write("<button href='javascript:auth.close()'>Done</button>" );
                response.end();
                return;
            } else {
                console.log( err );
                return res.send(err);
            }
        })
});
module.exports = router;
