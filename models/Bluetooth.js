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
    CreatedAt: {
        type: Date,
        default: Date.now
    },
    Longitude:{
        type:String
    },
    Lattitude:{
        type:String
    }
}),

BlueTooth = mongoose.model('BlueTooth', bluetoothSchema);

module.exports = BlueTooth;