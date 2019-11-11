const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
    username: {type: String, unique: true, required: true},
    password:String,
    battery: {
        part: String,
        price: Number,
        link: String,
    },
    panels: {
        part: String,
        price: Number,
        link: String,
    },
    inverter: {
        part: String,
        price: Number,
        link: String,
    },
    chargecontrol: {
        part: String,
        price: Number,
        link: String,
    },
});


userSchema.plugin(uniqueValidator);
const User = mongoose.model('User', userSchema);

module.exports  = User;
