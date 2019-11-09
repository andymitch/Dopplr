const router = require('express').Router();
const mongoose = require('mongoose');
const verify = require('../verifyToken');
const User = require('../models/User');
const {getFriendsValidation, editFriendsValidation} = require('../validation');


router.post('/request', async (req, res) => {
    let friend = await User.findById(mongoose.Types.ObjectId(req.body.friend_id))
    friend.notifications.push(req.body.user.handle + ' (' + req.body.user.name + ') would like to be your friend.')
    friend.save()
    res.send('friend request submitted')
})

router.post('/add', async (req, res) => {
    /*
    const {error} = editFriendsValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    */
    //if user exists
    const user = await User.findOne({_id: mongoose.Types.ObjectId(req.body.user_id)});
    if(!user) return res.status(400).send('User not found');

    //if already friends
    for(_friend of user.friends){
        if(_friend == req.body.friend_id) return res.status(400).send('Users already friends');
    }

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

router.post('/remove', async (req, res) => {
    /*
    const {error} = editFriendsValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    */
    //if user exists
    const user = await User.findById(mongoose.Types.ObjectId(req.body.user_id))
    if(!user) return res.status(400).send('User not found')

    //if friend exists
    const friend = await User.findById(mongoose.Types.ObjectId(req.body.friend_id))
    if(!friend) return res.status(400).send('Friend not found')

    //remove friend from user friends
    user.friends = user.friends.filter(_friend => String(_friend) !== String(friend._id))
    user.save()

    //remove user from friend friends
    friend.friends = friend.friends.filter(_user => String(_user) !== String(user._id))
    friend.save()

    res.send('removed friend')
})

router.get('/is', async (req, res) => {
    const user = await User.findById(mongoose.Types.ObjectId(req.query.user_id)).select('friends handle')
    if(!user) return res.status(400).send('User not found');
    let friends = user.friends
    friends.map(friend => friend = String(friend))

    const _notis = await User.findById(mongoose.Types.ObjectId(req.query.friend_id)).select('notifications')
    if(!_notis) return res.status(400).send('Friend not found');
    const notis = _notis.notifications
    let bull = false
    notis.map(note => {if(note.includes(user.handle)) bull = true})

    res.send([friends.includes(String(req.query.friend_id)), bull])
})

router.get('/', async (req, res) => {

    const {error} = getFriendsValidation(req.query);
    if(error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({_id: mongoose.Types.ObjectId(req.query.user_id)});
    if(!user) return res.status(400).send('User not found');

    let friends = [];
    for(let i in user.friends){
        const friend = await User.findOne({_id: user.friends[i]});
        friends.push({name: friend.name, handle: friend.handle});
    }

    res.send(friends);
})

module.exports = router;
