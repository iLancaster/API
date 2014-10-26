var mongoose = require('mongoose')
    ,Schema = mongoose.Schema

playlistSchema = new Schema( {
    username: {
        type:String,
        required: true
    },
    playlistID: {
        type:String,
        required: true
    },
    playlistName: {
        type:String,
        required: true
    },
    playistURL:{
        type:String
    },
    image:{
        type:String,
        default: "http://startupphenomenon.com/2013/wp-content/uploads/2013/09/city_by_the_bay_1232.jpg"
    },
    tracks:[{
        type:Object
    }]
}),

    playlist = mongoose.model('playlist', playlistSchema);

module.exports = playlist;