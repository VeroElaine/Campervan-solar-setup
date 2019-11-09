const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
    username: {type: String, unique: true, required: true},
    password:String,
    battery: {name:String , price:Number},
    solarPanel: {name:String , price:Number},
    inverter: {name:String , price:Number},
    chargecontrol: {name:String , price:Number},
});


userSchema.plugin(uniqueValidator);
const User = mongoose.model('User', userSchema);

module.exports  = User;
