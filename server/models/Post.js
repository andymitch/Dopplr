const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    message:{
        type: String,
        required: true,
        max: 280,
        min: 1
    },
    date:{
        type: Date,
        default: Date.now
    },
    likes: [mongoose.Schema.Types.ObjectId],
    replies: [{
        sender: mongoose.Schema.Types.ObjectId,
        message: String
    }]
});

module.exports = mongoose.model('Post', postSchema);