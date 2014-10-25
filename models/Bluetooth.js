var mongoose = require('mongoose')
    ,Schema = mongoose.Schema

bluetoothSchema = new Schema( {
    username: String,
    SSID: String,
    CreatedAt: String,
    Longitude:String,
    Lattitude:String
}),

    BlueTooth = mongoose.model('BlueTooth', bluetoothSchema);

module.exports = BlueTooth;