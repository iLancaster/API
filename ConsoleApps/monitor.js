var mongoose = require('mongoose')
var database = require('../config/server');
var User = require('../models/User');
var LastfmAPI = require('lastfmapi');

var lfm = new LastfmAPI({
    'api_key' : 'c73cf13a70773cbeec50be565e3036cc',
    'secret' : '732324ecd90ac58fa0c86016e5ce8539'
});

mongoose.connection.once('connected', function() {
    console.log("Connected to database")
    console.log()
    User.find({"LastFMID":{"$exists":true}},function(err, users){
            if (err) return console.error(err);
            for (var i=0;i<users.length;i++){
                var t = findrecent(users[i]["LastFMID"])

            }
    });
});

var findrecent = function(username){
    lfm.user.getRecentTracks({"user":username}, function(error, sess){
        if(error){console.log(error)}
        parsetacks(sess)
    })
}

var parsetacks = function(t){
    for(var k = 0; k < t["track"].length; k++){
        console.log(t["track"][k]["name"])
    }
}
var t = mongoose.connect(database.url);

