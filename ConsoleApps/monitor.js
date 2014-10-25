var mongoose = require('mongoose')
var database = require('../config/server');
var User = require('../models/User');
var Track = require('../models/MusicTrack');
var LastfmAPI = require('lastfmapi');

var lfm = new LastfmAPI({
    'api_key' : 'c73cf13a70773cbeec50be565e3036cc',
    'secret' : '732324ecd90ac58fa0c86016e5ce8539'
});

mongoose.connection.once('connected', function() {
    console.log("Connected to database")
    User.find({"LastFMID":{"$exists":true}},function(err, users){
            if (err) return console.error(err);
            users.forEach(function(item){
                lfm.user.getRecentTracks({"user":item["LastFMID"]}, function(error, sess){
                    if(error){console.log(error)}
                    if(sess){
                        sess["track"].forEach(function(iii){
                            if(iii['mbid'] != "" && '@attr' in iii) {
                                lfm.track.getTopTags({"mbid": iii["mbid"],'user':'danjamker'}, function (err, code) {
                                    if (err) {
                                        console.log(err)
                                    }
                                    var tttt = []
                                    if('tag' in code) {
                                        tttt.push(code['tag'][0]['name'])
                                        tttt.push(code['tag'][1]['name'])
                                        tttt.push(code['tag'][2]['name'])
                                    }
                                    var m = new Track({
                                        username:item['username'],
                                        trackID: iii["mbid"],
                                        Tags:tttt
                                    })
                                        m.save(function (err) {
                                            if (!err) {
                                                console.log('created');
                                            } else {
                                                console.log(err);
                                            }
                                        })
                                })
                            }
                        })
                    }
                })
            })
    });
});

var t = mongoose.connect(database.url);

