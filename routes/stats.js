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


router.get('/p', function(req, res) {
    if(req.param("token")) {
        User.findOne(
            {token: req.param("token")},
            function (err, obj) {
                spotifyApi.setAccessToken(obj.access_token_spotify);

                spotifyApi.getPlaylistTracks(obj.spotify_id, req.param("id"), { 'offset' : 1, 'limit' : 100, 'fields' : 'items' })
                    .then(function(data) {
                        var ttmp = []
                        data.items.forEach(function(item){
                            spotifyApi.getArtist(item.track.artists[0].id)
                                .then(function(data) {
                                    ttmp = ttmp.concat(data.genres)
                                    console.log('Artist information', data.genres);
                                }, function(err) {
                                    console.error(err);
                                });
                        })


                        //return res.send(data)
                    }, function(err) {
                        console.log('Something went wrong!', err);
                    });

            })
    }

});

module.exports = router;
