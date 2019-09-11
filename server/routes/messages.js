const router = require('express').Router();
const verify = require('../verifyToken');
const {readMessageValidation, writeMessageValidation} = require('../validation');
const User = require('../model/User');
const Message = require('../model/Message');
const mongoose = require('mongoose');

//Read message feed
router.get('/', verify, async (req,res) => {
    console.log('user_id: ' + req.query.user_id);
    console.log('number: ' + req.query.number);
    //const {error} = readMessageValidation(req.body);
    //if(error) return res.status(400).send('UH OH: ' + error.details[0].message);

    const user = await User.findOne({_id: mongoose.Types.ObjectId(req.query.user_id)});
    const message = await Message.findOne({_id: mongoose.Types.ObjectId(user.messages[req.query.number])});
    if(!message) return res.status(400).send('Message not found');
    res.send(message);
});

//New or append message
router.post('/', verify, async (req,res) => {

    const {error} = writeMessageValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let msg = {sender: mongoose.Types.ObjectId(req.body.user_id), message: req.body.message};

    let Thread, users;
    if(req.body.message_id){
        Thread = await Message.findOne({_id: mongoose.Types.ObjectId(req.body.message_id)});
        if(!Thread) return res.status(400).send('Message doesn\'t exist');
    }else if(req.body.users){
        users = req.body.users.map(user => mongoose.Types.ObjectId(user));
        Thread = new Message({users: users, thread: []});
    }else{
        return res.status(400).send("insufficient lookup information");
    }

    Thread.thread.push(msg);
    Thread.save();
    if(users){
        users.map(_user => {
            User.findOne({_id: _user}, (err, user) => {
                if(Array.isArray(user.messages)) user.messages.push(Thread._id);
                else user.messages = [Thread._id];
                user.save();
            });
        });
    }
    res.send(Thread);
});

module.exports = router;