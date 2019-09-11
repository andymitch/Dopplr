const router = require('express').Router();
const mongoose = require('mongoose');
const verify = require('../verifyToken');
const User = require('../model/User');
const {getFriendsValidation, editFriendsValidation} = require('../validation');


router.post('/add', verify, async (req, res) => {
    
    const {error} = editFriendsValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    //if user exists
    const user = await User.findOne({_id: mongoose.Types.ObjectId(req.body.user_id)});
    if(!user) return res.status(400).send('User not found');

    //if friend exists
    const friend = await User.findOne({_id: mongoose.Types.ObjectId(req.body.friend_id)});
    if(!friend) return res.status(400).send('Friend not found');

    //add friend to user friends
    user.friends.push(req.body.friend_id);
    user.save();

    //add user to friend friends
    friend.friends.push(req.body.user_id);
    friend.save();
    
    res.send('added friend');
})

router.post('/remove', verify, async (req, res) => {
    
    const {error} = editFriendsValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    //if user exists
    const user = await User.findOne({_id: mongoose.Types.ObjectId(req.body.user_id)});
    if(!user) return res.status(400).send('User not found');

    //if friend exists
    const friend = await User.findOne({_id: mongoose.Types.ObjectId(req.body.friend_id)});
    if(!friend) return res.status(400).send('Friend not found');

    //remove friend from user friends
    user.friends = user.friends.filter(_friend => _friend !== friend);
    user.save();

    //remove user from friends friends
    friend.friends = friend.friends.filter(_user => _user !== user);
    friend.save();
    
    res.send('removed friend');
})

router.get('/', verify, async (req, res) => {
    
    const {error} = getFriendsValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({_id: mongoose.Types.ObjectId(req.body.user_id)});
    if(!user) return res.status(400).send('User not found');
    
    let friends = [];
    for(let i in user.friends){
        const friend = await User.findOne({_id: user.friends[i]});
        console.log(friend.name + ' ' + friend.email);
        friends.push({name: friend.name, email: friend.email});
    }

    res.send(friends);
})

module.exports = router;