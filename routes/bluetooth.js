var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var geocoder = require('geocoder');
var SpotifyWebApi = require('spotify-web-api-node');
var PlayList = require('../models/playlist')
var Track = require('../models/MusicTrack');


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
                        {currentCity:"Manchester"},
                        function (err, obj) {
                        })
                    // Set the access token
                    spotifyApi.setAccessToken(obj.access_token_spotify);
                    spotifyApi.getUserPlaylists(obj.spotify_id)
                        .then(function(data) {
                            console.log(data)
                            var t = false
                            for(var j = 0; j < data.items.length; j++){
                                spotifyApi.getPlaylistTracks(obj.spotify_id, data.items[j].id, { 'offset' : 1, 'limit' : 5, 'fields' : 'items' })
                                    .then(function(data) {
                                        for(var jj = 0; jj < data.items.length; jj++) {
                                            console.log(data.items[jj])
                                        }
                                        console.log('The playlist contains these tracks', data);
                                    }, function(err) {
                                        console.log('Something went wrong!', err);
                                    });
                                if(data.items[j].name == "Manchester"){
                                    t = true
                                }
                            }
                            if(t == false){

                                spotifyApi.setAccessToken(obj.access_token_spotify);
                                spotifyApi.createPlaylist(obj.spotify_id, "Manchester", { 'public' : false })
                                    .then(function(data) {
                                        console.log('Created playlist!');
                                        var p = new PlayList({username:obj.username, playlistName:"Manchester", playlistID:data.id, playistURL:data.href})
                                        p.save( function( err ) {
                                            if( !err ) {
                                                console.log( 'created' );
                                            } else {
                                                console.log( err );
                                            }
                                        });
                                    }, function(err) {
                                        console.log('Something went wrong!', err);
                                    });
                            }
                        },function(err) {
                            console.log('Something went wrong!', err);
                        });
//TODO Test
//                    User.findOne({SSID:req.param("SSID")},function(err, data){
//                        PlayList.findOne({username:data.username,playlistName:rus.results[0]},function(errre,hghg){
//                            Track.findOne({username:data.username}, function(errr, daata){
//                                spotifyApi.addTracksToPlaylist(obj.spotify_id, hghg.playlistID, ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh", "spotify:track:1301WleyT98MSxVHPZCA6M"])
//                                    .then(function(data) {
//                                        console.log('Added tracks to playlist!');
//                                    }, function(err) {
//                                        console.log('Something went wrong!', err);
//                                    });
//                            })
//
//                        })
//
//                    })
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
