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
    listendAt: {
        type: Date,
        default: Date.now
    },
    Longitude:{
        type:String,
        required: true
    },
    Lattitude:{
        type:String,
        required: true
    }
}),

    musicTrack = mongoose.model('musicTrack', musicTrackSchema);

module.exports = musicTrack;