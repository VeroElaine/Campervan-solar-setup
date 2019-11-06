const mongoose = require('mongoose');

const solarSchema = new mongoose.Schema({
    applianceName:  { type: String, required:true },
    watts: { type: Number },
    voltage: { type: Number},
    amps: { type: Number},
    hourUsage: {type: Number},
});

const Solar = mongoose.model('Solar', solarSchema);

module.exports = Solar;
