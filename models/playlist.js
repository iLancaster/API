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
        default: "http://scontent-b.cdninstagram.com/hphotos-xfa1/l/t51.2885-15/10727828_1953212671485150_1542259476_n.jpg"
    },
    tracks:[{
        type:Object
    }]
}),

    playlist = mongoose.model('playlist', playlistSchema);

module.exports = playlist;