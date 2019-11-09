const router = require('express').Router();
const User = require('../models/User');

//Get user profile by handle name
router.get('/', async (req,res) => {
    const user = await User.findOne({handle: req.query.handle})
    res.send(user)
});

module.exports = router
