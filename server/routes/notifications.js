const router = require('express').Router();
const User = require('../models/User');
const mongoose = require('mongoose');


//Get notifications
router.get('/', async (req,res) => {
    const user = await User.findById(mongoose.Types.ObjectId(req.query.user_id))
    if(!user) return res.status(400).send('User not found')
    res.send(user.notifications)
});

//Clear notifications
router.post('/', async (req,res) => {
    const user = await User.findById(mongoose.Types.ObjectId(req.body.user_id))
    if(!user) return res.status(400).send('User not found')
    user.notifications = req.body.notes
    user.save()
    res.send('notifications set')
});

module.exports = router
