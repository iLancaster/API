var mongoose = require('mongoose')
    ,Schema = mongoose.Schema

bluetoothSchema = new Schema( {
    username: {
        type:String,
        required: true
    },
    SSID: {
        type:String,
        required: true
    },
    CreatedAt: String,
    Longitude:{
        type:String,
        required: true
    },
    Lattitude:{
        type:String,
        required: true
    }
}),

    BlueTooth = mongoose.model('BlueTooth', bluetoothSchema);

module.exports = BlueTooth;