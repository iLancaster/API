var mongoose = require ("mongoose"); // The reason for this demo.
var database = require('../config/server');
var Users = require('../models/User')

mongoose.connect(database.url);

while(true){
    Users.find();
}
