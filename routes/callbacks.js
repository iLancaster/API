var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var LastfmAPI = require('lastfmapi');
var SpotifyWebApi = require('spotify-web-api-node');

var User = require('../models/User')
var lfm = new LastfmAPI({
    'api_key' : 'c73cf13a70773cbeec50be565e3036cc',
    'secret' : '732324ecd90ac58fa0c86016e5ce8539'
});

var scopes = ['user-read-private', 'user-read-email','playlist-read-private','playlist-modify-public','playlist-modify-private','streaming','user-library-read','user-library-modify']

var spotifyApi = new SpotifyWebApi({
    clientId : '21a623aba4924c7aba89b3408a09a489',
    clientSecret : 'df3303f8073845909e00acb7723efcf1',
    redirectUri : 'https://ilancaster.herokuapp.com/callback/spotify'
});



/* GET home page. */
router.get('/spotify', function(req, res) {
    User.update({
            username: req.param("state")},
        {SpotifyToken: req.param("code")},
        function (err, obj) {
            if (!err) {
                console.log('created');
                res.writeHeader(200, {"Content-Type": "text/html"});
                res.write("<button href='javascript:auth.close()'>Done</button>");
                return res.end();

            } else {
                console.log(err);
                return res.send(err);
            }
        })

    User.findOne(
        {username: req.param("state")},
        function (err, obj) {

            console.log("here")
            console.log(obj.SpotifyToken)
            spotifyApi.clientCredentialsGrant()
                .then(function (data) {
                    console.log('The access token expires in ' + data['expires_in']);
                    console.log('The access token is ' + data['access_token']);

                    // Save the access token so that it's used in future calls
                    spotifyApi.setAccessToken(data['access_token']);
                    spotifyApi.authorizationCodeGrant(obj.SpotifyToken)
                        .then(function (data) {
                            console.log('Retrieved access token', data['access_token']);

                            // Set the access token
                            spotifyApi.setAccessToken(data['access_token']);
                            console.log('The access token expires in ' + data['expires_in']);
                            console.log('The access token is ' + data['access_token']);
                            ///THIS TOKEN NEEDS TO BE STORED!!!!!
                            User.update({username: obj.username}, {access_token_spotify: data['access_token']}, function (obj, err) {
                                console.log(obj)
                            })
                            // Use the access token to retrieve information about the user connected to it
                            return spotifyApi.getMe();
                        })
                        .then(function (data) {
                            User.update({username: obj.username}, {spotify_id:data['id']}, function (obj, err) {
                                console.log(obj)
                            })
                                // "Retrieved data for Faruk Sahin"
                            console.log('Retrieved data for ' + data['display_name']);
                            console.log(data);
                            // "Email is farukemresahin@gmail.com"
                            console.log('Email is ' + data.email);

                            // "Image URL is http://media.giphy.com/media/Aab07O5PYOmQ/giphy.gif"
                            console.log('Image URL is ' + data.images[0].url);

                            // "This user has a premium account"
                            console.log('This user has a ' + data.product + ' account');
                        })
                        .catch(function (err) {
                            console.log('Something went wrong', err);
                        });


                })
        });

})
router.get('/lastfm', function(req, res) {

    lfm.authenticate(req.param("token"), function (err, session) {
        console.log(session)
        User.update({
            username:req.param("username")},
            {LastFMToken:req.param("token"),LastFMID:session["username"]},
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

});
module.exports = router;
