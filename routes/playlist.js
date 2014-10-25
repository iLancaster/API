var express = require('express');
var router = express.Router();
var crypto = require('crypto');

var BlueTooth = require('../models/Bluetooth')
var User = require('../models/User')
var PlayList = require('../models/playlist')

/* GET home page. */
router.get('/', function(req, res) {
    if(req.param("token")) {
        User.findOne(
            {token: req.param("token")},
            function (err, obj) {

                PlayList.findOne({username:obj.username},function(err,obj){
                    res.send(obj);
                })

            })
    }

});

/* GET home page. */
router.post('/', function(req, res) {
    if(req.param("token")) {
        User.findOne(
            {token: req.param("token")},
            function (err, obj) {
                var p = new PlayList({username:obj.username, playlistName:req.param("name")})
                p.save( function( err ) {
                    if( !err ) {
                        console.log( 'created' );
                        return res.send( u );
                    } else {
                        console.log( err );
                        return res.send(err);
                    }
                });

            })
    }

});


module.exports = router;
