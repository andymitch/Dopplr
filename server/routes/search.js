const router = require('express').Router();
const mongoose = require('mongoose');
const verify = require('../verifyToken');
const User = require('../models/User');
const Message = require('../models/Message');


const has = (users, otherUser) => {
    let bul = false
    users.map(user => {if(String(user._id) == String(otherUser._id)) bul = true})
    return bul
}

router.get('/users', async(req, res) => {
    if(req.query.phrase === '') res.send([])
    else{
        console.log('searching for phrase: ' + req.query.phrase)

        let users = await User.find({'name': {'$regex': '(?i)' + req.query.phrase}}).select('name handle')
        const _users = await User.find({'handle': {'$regex': '(?i)' + req.query.phrase}}).select('name handle')
        _users.map(user => {if(!has(users, user)) users.push(user)})

        console.log('found: ' + users.length)
        users.sort((a,b) => a.name > b.name)
        res.send(users.slice(0,15))
    }
});

const filter_user = (user, phrase) => {
    return user.name.startsWith(phrase) || user.handle.startsWith(phrase)
}

router.get('/friends', verify, async(req, res) => {
    console.log('searching..')
    const friend_ids = await User.findById({_id: mongoose.Types.ObjectId(req.query.user_id)}).select('friends')
    let friends = []
    for(let i in friend_ids){
        friends.push(await User.findById({_id: mongoose.Types.ObjectId(friend_ids[i])}).select('name handle'))
    }
    console.log('searching: ' + users)
    friends.filter(filter_user(req.query.phrase))
    users.sort(a,b => a.name < b.name)
    res.send(friends.slice(0,15))
});

/*
const filter_message = (message, phrase) => {
    return message.users.startsWith(phrase) || user.handle.startsWith(phrase)
}

router.get('/messages', verify, async(req, res) => {
    const phrase = req.body.phrase
    const messages = await User.findById({_id: mongoose.Types.ObjectId(req.body.user_id)}).select('messages')
    messages.filter(filter_message(req.body.phrase))
    res.send(messages)
});
*/

module.exports = router
