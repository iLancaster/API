var mongoose = require ("mongoose"); // The reason for this demo.
var database = require('../config/server');


mongoose.connect(database.url);
