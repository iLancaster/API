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
            var authUrl = lfm.getAuthenticationUrl({ 'cb' : 'https://ilancaster.herokuapp.com/callback/lastfm' });
            authUrl = authUrl.replace(/%2F/g,"/");
            authUrl = authUrl.replace(/%3A/g,":");

            res.send(authUrl)
        })
});


module.exports = router;
