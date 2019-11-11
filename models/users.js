const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
    username: {type: String, unique: true, required: true},
    password:String,
    battery: [],
    solarPanel: [],
    inverter: [],
    chargecontrol: [],
});


userSchema.plugin(uniqueValidator);
const User = mongoose.model('User', userSchema);

module.exports  = User;
