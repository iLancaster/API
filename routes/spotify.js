var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var SpotifyWebApi = require('spotify-web-api-node');

var User = require('../models/User')

var scopes = ['user-read-private', 'user-read-email']

var spotifyApi = new SpotifyWebApi({
    clientId : '21a623aba4924c7aba89b3408a09a489',
    clientSecret : 'a6338157c9bb5ac9c71924cb2940e1a7',
    redirectUri : 'https://ilancaster.herokuapp.com/callback/spotify'
});

/* GET home page. */
router.post('/login', function(req, res) {
try {
    User.findOne(
        {token: req.param("token")},
        function (err, obj) {
            var authorizeURL = spotifyApi.createAuthorizeURL(scopes, obj.username);
            res.send(authorizeURL)
        })
}
    catch (ex){
        res.send("ERROR")
    }
        //
});

router.post('/search', function(req, res) {

    var authorizeURL = spotifyApi.searchArtists(req.param("q")).then(function(data) {
        console.log('Search tracks by "Love" in the artist name', data["artists"]["items"]);
    }, function(err) {
        console.log('Something went wrong!', err);
    });
    res.send(authorizeURL)

});
module.exports = router;
