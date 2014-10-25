var express = require('express');
var router = express.Router();
var crypto = require('crypto');

var BlueTooth = require('../models/Bluetooth')
var User = require('../models/User')

/* GET home page. */
router.post('/add', function(req, res) {
    if(req.param("token")) {
        User.findOne(
            {token: req.param("token")},
            function (err, obj) {
                var b = new BlueTooth({
                    username: obj.username,
                    SSID: req.param("SSID"),
                    Longitude: req.param("Longitude"),
                    Lattitude: req.param("Lattitude")
                });

                b.save(function (err) {
                    if (!err) {
                        console.log('created');
                        return res.send(b);
                    } else {
                        console.log(err);
                        return res.send(err);
                    }
                });
            })
    }

});

router.post('/login', function(req, res) {

    User.findOne({
            username:req.param("username"),
            password:req.param("password")},
        function(err,obj) {
            res.send(obj);
        })
});

module.exports = router;
