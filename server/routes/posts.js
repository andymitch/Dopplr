const router = require('express').Router();
const mongoose = require('mongoose');
const verify = require('../verifyToken');
const User = require('../models/User');
const Post = require('../models/Post');
const {readPostValidation, writePostValidation} = require('../validation');

router.get('/', /*verify,*/ async (req, res) => {

    const {error} = readPostValidation(req.query)
    if(error) return res.status(400).send(error.details[0].message)

    const user = await User.findOne({_id: mongoose.Types.ObjectId(req.query.user_id)})
    if(!user) return res.status(400).send('User not found')

    const posts = user.posts.map(post => {Post.findOne({_id: post})})
    res.send(posts)
});

router.post('/', /*verify,*/ async (req, res) => {

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

router.post('/like', /*verify,*/ async (req, res) => {
    let post = await Post.findById(mongoose.Types.ObjectId(req.body.post_id))
    post.likes.push(mongoose.Types.ObjectId(req.body.user_id))
    post.save()
    res.send('liked')
})

router.post('/comment', /*verify,*/ async (req, res) => {
    let post = await Post.findById(mongoose.Types.ObjectId(req.body.post_id))
    post.comments.push({commenter_id: mongoose.Types.ObjectId(req.body.user_id), comment: req.body.message})
    post.save()
    res.send('commented')
})

module.exports = router;
