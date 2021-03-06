const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{type:String, required:true},
    image: {type: String},
    description: {type:String, required:true},
    username: {type: String, required:true},
    userid: {type:String, required:true}

});

const Community = mongoose.model('Community', userSchema);

module.exports  = Community;
