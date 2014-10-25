var mongoose = require ("mongoose"); // The reason for this demo.
var database = require('../config/server');
var Users = require('../models/User')

mongoose.connect(database.url);
var LastfmAPI = require('lastfmapi');


var lfm = new LastfmAPI({
    'api_key' : 'c73cf13a70773cbeec50be565e3036cc',
    'secret' : '732324ecd90ac58fa0c86016e5ce8539'
});

while(true){
    Users.find({},function(err, users){

    });
}
