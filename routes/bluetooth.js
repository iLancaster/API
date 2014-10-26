var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var geocoder = require('geocoder');
var SpotifyWebApi = require('spotify-web-api-node');
var PlayList = require('../models/playlist')
var Track = require('../models/MusicTrack');
var Pusher = require('pusher');


var BlueTooth = require('../models/Bluetooth')
var User = require('../models/User')

var pusher = new Pusher({
    appId: '94244',
    key: '3d38642e0aafbfda1f2c',
    secret: '31cbd5bf0e3517e3324d'
});

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
                            var t = false
                            for(var j = 0; j < data.items.length; j++){

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
                                            pusher.trigger("test", 'my_event', {
                                                "message": "Manchester Playlist has been added to Spotify"
                                            });
                                        });
                                    }, function(err) {

                                        console.log('Something went wrong2!', err);
                                    });
                            }
                            console.log(req.param("mac"))
                            if(req.param("mac") == "D3:49:79:E1:98:21"){
                                spotifyApi.setAccessToken(obj.access_token_spotify);
                                spotifyApi.createPlaylist(obj.spotify_id, "Manchester Picadiliy", { 'public' : false })
                                    .then(function(data) {
                                        console.log('Created playlist!');
                                        var p = new PlayList({username:obj.username, playlistName:"Manchester Picadiliy", playlistID:data.id, playistURL:data.href})
                                        p.save( function( err ) {
                                            if( !err ) {
                                                console.log( 'created' );
                                            } else {
                                                console.log( err );
                                            }
                                            spotifyApi.addTracksToPlaylist(obj.spotify_id, data.id, ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh", "spotify:track:1301WleyT98MSxVHPZCA6M"])
                                                .then(function(data) {
                                                    console.log('Track Added to Manchester Picadily Playlist');
                                                }, function(err) {
                                                    console.log('Something went wrdddddong!', err);
                                                });
                                            pusher.trigger("test", 'my_event', {
                                                "message": "New Play List Created"
                                            });
                                        });
                                    }, function(err) {
                                        console.log('Something went wrong3!', err);
                                    });
                            }

                            if(req.param("mac") == "F8:EE:D9:F9:85:F7"){
                                spotifyApi.setAccessToken(obj.access_token_spotify);
                                spotifyApi.createPlaylist(obj.spotify_id, "London Euston", { 'public' : false })
                                    .then(function(data) {
                                        console.log('Created playlist!');
                                        var p = new PlayList({username:obj.username, playlistName:"London Euston", playlistID:data.id, playistURL:data.href})
                                        p.save( function( err ) {
                                            if( !err ) {
                                                console.log( 'created' );
                                            } else {
                                                console.log( err );
                                            }
                                            pusher.trigger("test", 'my_event', {
                                                "message": "London Euston Playlist Added"
                                            });
                                            spotifyApi.addTracksToPlaylist(obj.spotify_id, data.id, ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh", "spotify:track:1301WleyT98MSxVHPZCA6M"])
                                                .then(function(data) {
                                                    console.log('Added tracks to playlist!');
                                                }, function(err) {
                                                    console.log('Something went wrdddddong!', err);
                                                });
                                        });
                                    }, function(err) {
                                        console.log('Something went wrong4!', err);
                                    });
                            }
                        },function(err) {
                            console.log('Something went wrong!', err);
                        });

                    User.findOne({SSID:req.param("SSID")},null, {sort: {listendAt: 1 }},function(err, data){
                        PlayList.findOne({username:obj.username,playlistName:"Manchester"},function(errre,hghg) {
                            Track.findOne({username:obj.username}, function(errr, daata){
                            console.log(daata)
                                var t = "love"
                                if(daata != null){
                                    t = daata.trackArtist
                                }
                            spotifyApi.setAccessToken(obj.access_token_spotify);
                            spotifyApi.searchTracks('artist:'+t)
                                .then(function (data) {
                                    spotifyApi.addTracksToPlaylist(obj.spotify_id, hghg.playlistID, ["spotify:track:" + data.tracks.items[1].id, "spotify:track:4iV5W9uYEdYUVa79Axb7Rh", "spotify:track:1301WleyT98MSxVHPZCA6M"])
                                        .then(function (data) {
                                            console.log('Added tracks to playlist!');
                                        }, function (err) {
                                            console.log('Something went wrdddddong!', err);
                                        });
                                    pusher.trigger("test", 'my_event', {
                                        "message": "New Song Added to Manchester Playlist"
                                    });
                                    console.log('Search tracks by "Love" in the artist name', data.tracks.items[1].id);
                                }, function (err) {
                                    console.log('Something went wrong5!', err);

                                });
                        });
                        })

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
