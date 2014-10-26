var express = require('express');
var router = express.Router();
var crypto = require('crypto');

var BlueTooth = require('../models/Bluetooth')
var User = require('../models/User')
var PlayList = require('../models/playlist')
var SpotifyWebApi = require('spotify-web-api-node');
var PlayList = require('../models/playlist')

var spotifyApi = new SpotifyWebApi({
    clientId : '21a623aba4924c7aba89b3408a09a489',
    clientSecret : 'df3303f8073845909e00acb7723efcf1',
    redirectUri : 'https://ilancaster.herokuapp.com/callback/spotify'
});
/* GET home page. */
router.get('/', function(req, res) {
    if(req.param("token")) {
        User.findOne(
            {token: req.param("token")},
            function (err, obj) {
                console.log(obj)
                PlayList.find({username:obj.username},function(err,oooo){

                    return res.send(oooo)

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
                var p = new PlayList({username:obj.username, playlistName:req.param("name"), playlistID:"363636"})
                p.save( function( err ) {
                    if( !err ) {
                        console.log( 'created' );
                        return res.send( p );
                    } else {
                        console.log( err );
                        return res.send(err);
                    }
                });

            })
    }

});

router.get('/p', function(req, res) {
    if(req.param("token")) {
        User.findOne(
            {token: req.param("token")},
            function (err, obj) {
                spotifyApi.setAccessToken(obj.access_token_spotify);

                spotifyApi.getPlaylistTracks(obj.spotify_id, req.param("id"), { 'offset' : 1, 'limit' : 100, 'fields' : 'items' })
                    .then(function(data) {
                        return res.send(data)
                        console.log('The playlist contains these tracks', data);
                    }, function(err) {
                        console.log('Something went wrong!', err);
                    });

            })
    }

});

module.exports = router;
