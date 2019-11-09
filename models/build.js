const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    part:{type:String, required:true},
    price: {type:Number, required: true}.
    link: {type:String, required:true},
});

const Build = mongoose.model('Build', buildSchema);

module.exports  = Build;
