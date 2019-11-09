const mongoose = require('mongoose');


const messageSchema = new mongoose.Schema({
    users:[mongoose.Schema.Types.ObjectId], //user_ids
    thread:[{
        sender: mongoose.Schema.Types.ObjectId,
        date:{
            type: Date,
            default: Date.now
        },
        message: String
    }]
});

module.exports = mongoose.model('Message', messageSchema);