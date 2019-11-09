const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{type:String, required:true},
    image: String,
    text: {type:String, required:true},
});

const Community = mongoose.model('Community', userSchema);

module.exports  = Community;
