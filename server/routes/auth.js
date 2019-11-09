const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const {registerValidation, loginValidation} = require('../validation');


//REGISTER NEW USER
router.post('/register', async (req, res) => {
    console.log('/register');

    //validate first
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //then check if email exists
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email already exists');

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //then create new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        messages: [],
        posts: []
    });

    //try saving user in DB
    try{
        user.save();
        res.send({user: user._id});
    }catch(err){
        res.status(400).send(err);
    }
});

//LOGIN
router.post('/login', async (req, res) => {
    console.log('/login');

    //validate
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //check if email exists
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Email or password is incorrect');

    //check if password is correct
    const validPass = bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Email or password is incorrect');

    //create and assign a token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send({'token': token, 'user': user._id});

    //if it got to this point, user successfully logged in
    console.log('User logged in!');
});

module.exports = router;
