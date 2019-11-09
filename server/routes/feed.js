const router = require('express').Router();
const mongoose = require('mongoose');
const verify = require('../verifyToken');
const User = require('../models/User');
const Post = require('../models/Post');


router.get('/', async (req, res) => {
    const friend_temp = await User.findOne({_id: mongoose.Types.ObjectId(req.query.user_id)}).select('friends')
    const friend_ids = friend_temp.friends
    feed = []
    for(let friend_id of friend_ids){
        const post_temp = await User.findOne({_id: mongoose.Types.ObjectId(friend_id)}).select('posts')
        const post_ids = post_temp.posts
        const post = await Post.findOne({_id: mongoose.Types.ObjectId(post_ids[req.query.page])})
        if(post) feed.push(post)
    }
    console.log('feed sent')
    res.send({feed: feed})
});

module.exports = router
