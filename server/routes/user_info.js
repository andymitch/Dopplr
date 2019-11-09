const router = require('express').Router();
const User = require('../models/User');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//Get user info by _id
router.get('/id', async (req,res) => {
    res.send(await User.findById(mongoose.Types.ObjectId(req.query.user_id)).select('name handle _id'))
});

//Get user info by handle
router.get('/handle', async (req, res) => {
    res.send(await User.findOne({handle: req.query.handle}).select('name handle _id'))
});

router.post('/', async (req, res) => {
    const type = req.body.type
    let user = await User.findById(mongoose.Types.ObjectId(req.body.user_id))
    console.log('user id: ' + req.body.user_id)
    if(type === 'name') user.name = req.body.state.name
    else if(type === 'password'){
        if(bcrypt.compare(req.body.state.current_password, user.password)){
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(req.body.state.new_password, salt)
            user.password = hashedPassword
        }else return res.send('current password incorrect')
    }else return res.send('unknown type')
    user.save()
    res.send('' + type + ' changed')
});

module.exports = router
