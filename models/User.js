var mongoose = require('mongoose')
    ,Schema = mongoose.Schema

userSchema = new Schema( {
    username: {
        type:String,
        required: true,
        unique: true
    },
    password: {
        type:String,
        required: true
    },
    token: {
        type:String
    },
    CreatedAt: {
        type: Date,
        default: Date.now
    },
    SpotifyID: {
        type:String,
        required: false,
    },
    LastFMID: {
        type:String,
        required: false
    },
    SSID: {
        type:String,
        required: false
    }
}),

User = mongoose.model('User', userSchema);

module.exports = User;