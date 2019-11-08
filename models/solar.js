const mongoose = require('mongoose');

const solarSchema = new mongoose.Schema({
    applianceName:  { type: String, required:true },
    watts: { type: Number },
    voltage: { type: Number},
    amps: { type: Number},
    hourUsage: {type: Number, required: true},
    username: {type:String, required:true},
    _id: {type: String, required: true},
});

const Solar = mongoose.model('Solar', solarSchema);

module.exports = Solar;
