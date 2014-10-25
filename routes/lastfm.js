var express = require('express');
var router = express.Router();
var LastfmAPI = require('lastfmapi');

var User = require('../models/User')

var lfm = new LastfmAPI({
    'api_key' : 'c73cf13a70773cbeec50be565e3036cc',
    'secret' : '732324ecd90ac58fa0c86016e5ce8539'
});

/* GET home page. */
router.post('/login', function(req, res) {
    User.findOne(
        {token:req.param("token")},
        function(err,obj) {

            User.findOne(
                {token:req.param("token")},
                function(err,obj) {
                    var authUrl = lfm.getAuthenticationUrl({ 'cb' : 'https://ilancaster.herokuapp.com/callback/lastfm?username='+obj.username });
                    authUrl = authUrl.replace(/%2F/g,"/");
                    authUrl = authUrl.replace(/%3A/g,":");
                    authUrl = authUrl.replace(/%3F/g,"?");
                    authUrl = authUrl.replace(/%3D/g,"=");
                    res.send(authUrl)
                })

        })
});

router.get('/getHistory', function(req, res) {
    User.findOne(
        {token:req.param("token")},
        function(err,obj) {
            User.findOne(
                {token:req.param("token")},
                function(err,obj) {
                    lfm.authenticate(obj.LastFMToken, function (err, session) {
                        lfm.user.getRecentTracks({"user":session["username"]}, function(error, sess){
                            if(error){console.log(error)}
                            return res.send(sess)
                        })
                    });
                })
        })
});

router.get('/getGetArtiest', function(req, res) {

    lfm.artist.getInfo({"artist":req.param("q")}, function(err, artist){
        if(err){console.log(err)}
        return res.send(artist)
    });


});

module.exports = router;
