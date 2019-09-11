const router = require('express').Router();
const mongoose = require('mongoose');
const verify = require('../verifyToken');
const User = require('../model/User');
const Post = require('../model/Post');
const {readPostValidation, writePostValidation} = require('../validation');

router.get('/', verify, async (req, res) => {

    const {error} = readPostValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({_id: mongoose.Types.ObjectId(req.body.user_id)});
    if(!user) return res.status(400).send('User not found');

    if(req.body.number){
        res.send(Post.findOne({_id: user.posts[req.body.number]}));
    }else{
        const posts = user.posts.map(post => {Post.findOne({_id: post})});
        res.send(posts);
    }
});

router.post('/', verify, async (req, res) => {
    
    const {error} = writePostValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    const user = await User.findOne({_id: mongoose.Types.ObjectId(req.body.user_id)});
    if(!user) return res.status(400).send('User not found');
    
    const newPost = new Post({user_id: mongoose.Types.ObjectId(req.body.user_id), message: req.body.message});
    newPost.save();

    user.posts.push(newPost._id);
    user.save();
    
    res.send('posted');
})

module.exports = router;