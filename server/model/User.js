const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    email:{
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    password:{
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    messages: [mongoose.Schema.Types.ObjectId],
    posts: [mongoose.Schema.Types.ObjectId],
    friends: [mongoose.Schema.Types.ObjectId]
});

module.exports = mongoose.model('User', userSchema);