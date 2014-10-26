var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var geocoder = require('geocoder');
var SpotifyWebApi = require('spotify-web-api-node');


var BlueTooth = require('../models/Bluetooth')
var User = require('../models/User')

var spotifyApi = new SpotifyWebApi({
    clientId : '21a623aba4924c7aba89b3408a09a489',
    clientSecret : 'df3303f8073845909e00acb7723efcf1',
    redirectUri : 'https://ilancaster.herokuapp.com/callback/spotify'
});

/* GET home page. */
router.post('/add', function(req, res) {
    if(req.param("token")) {
        User.findOne(
            {token: req.param("token")},
            function (err, obj) {

                console.log("here")
                console.log(obj.SpotifyToken)

                var b = new BlueTooth({
                    username: obj.username,
                    SSID: req.param("SSID"),
                    Longitude: req.param("Longitude"),
                    Lattitude: req.param("Latitude"),
                    mac: req.param("mac")
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
                geocoder.reverseGeocode(req.param("Latitude"),req.param("Longitude"), function(err, rus) {
                    User.update({
                        username: obj.username},
                        {currentCity:rus.results[2]},
                        function (err, obj) {
                        })

                    // Set the access token
                    spotifyApi.setAccessToken(obj.access_token_spotify);
                    spotifyApi.getUserPlaylists(obj.spotify_id)
                        .then(function(data) {
                            var t = false
                            for(var j = 0; j < data.items.length; j++){
                                if(data.items[j].name == rus.results[2]){
                                    t = true
                                }
                                if(t == false){
                                    spotifyApi.createPlaylist(obj.spotify_id, rus.results[2], { 'public' : true })
                                        .then(function(data) {
                                            console.log('Created playlist!');
                                        }, function(err) {
                                            console.log('Something went wrong!', err);
                                        });
                                }
                            }
                        },function(err) {
                            console.log('Something went wrong!', err);
                        });



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
