var mongoose = require('mongoose')
    ,Schema = mongoose.Schema

musicTrackSchema = new Schema( {
    username: {
        type:String,
        required: true
    },
    trackID: {
        type:String,
        required: true
    },
    trackName: {
        type:String,
        required: true
    },
    trackArtist: {
        type:String,
        required: true
    },
    listendAt: {
        type: Date,
        default: Date.now
    },
    Longitude:{
        type:String
    },
    Lattitude:{
        type:String
    },
    Tags:[{
        type: String
    }]
}),

musicTrack = mongoose.model('musicTrack', musicTrackSchema);

module.exports = musicTrack;