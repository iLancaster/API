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
                spotifyApi.clientCredentialsGrant()
                    .then(function(data) {
                        console.log('The access token expires in ' + data['expires_in']);
                        console.log('The access token is ' + data['access_token']);

                        // Save the access token so that it's used in future calls
                        spotifyApi.setAccessToken(data['access_token']);




                        spotifyApi.authorizationCodeGrant(obj.SpotifyToken)
                            .then(function(data) {
                                console.log('Retrieved access token', data['access_token']);

                                // Set the access token
                                spotifyApi.setAccessToken(data['access_token']);
                                console.log('The access token expires in ' + data['expires_in']);
                                console.log('The access token is ' + data['access_token']);
                                ///THIS TOKEN NEEDS TO BE STORED!!!!!

                                // Use the access token to retrieve information about the user connected to it
                                return spotifyApi.getMe();
                            })
                            .then(function(data) {
                                // "Retrieved data for Faruk Sahin"
                                console.log('Retrieved data for ' + data['display_name']);

                                // "Email is farukemresahin@gmail.com"
                                console.log('Email is ' + data.email);

                                // "Image URL is http://media.giphy.com/media/Aab07O5PYOmQ/giphy.gif"
                                console.log('Image URL is ' + data.images[0].url);

                                // "This user has a premium account"
                                console.log('This user has a ' + data.product + ' account');
                            })
                            .catch(function(err) {
                                console.log('Something went wrong', err);
                            });

                    }, function(err) {
                        console.log('Something went wrong when retrieving an access token', err);
                    });;

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
