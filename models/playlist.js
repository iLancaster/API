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
        type:String
    },
    tracks:[{
        type:Object
    }]
}),

    playlist = mongoose.model('playlist', playlistSchema);

module.exports = playlist;