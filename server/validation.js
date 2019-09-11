//Validation
const Joi = require('@hapi/joi');


//Register validation
const registerValidation = data => {
    const schema = {
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    };
    return Joi.validate(data, schema);
};

//Login validation
const loginValidation = data => {
    const schema = {
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    };
    return Joi.validate(data, schema);
};

//Write message validation
const writeMessageValidation = data => {
    const schema = {
        user_id: Joi.string().length(24).required(),
        users: Joi.array().items(Joi.string().length(24)),
        message_id: Joi.string().length(24),
        message: Joi.string().required()
    };
    return Joi.validate(data, schema);
}

//Read message validation
const readMessageValidation = data => {
    const schema = {
        user_id: Joi.string().length(24).required(),
        number: Joi.number()
    };
    return Joi.validate(data, schema);
}

//Write post validation
const writePostValidation = data => {
    const schema = {
        user_id: Joi.string().length(24).required(),
        message: Joi.string()
    };
    return Joi.validate(data, schema);
}

//Read single or all post/s validation
const readPostValidation = data => {
    const schema = {
        user_id: Joi.string().length(24).required(),
        number: Joi.number()
    };
    return Joi.validate(data, schema);
}

//Read single or all post/s validation
const editFriendsValidation = data => {
    const schema = {
        user_id: Joi.string().length(24).required(),
        friend_id: Joi.string().length(24).required()
    };
    return Joi.validate(data, schema);
}

//Read single or all post/s validation
const getFriendsValidation = data => {
    const schema = {
        user_id: Joi.string().length(24).required()
    };
    return Joi.validate(data, schema);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.writeMessageValidation = writeMessageValidation;
module.exports.readMessageValidation = readMessageValidation;
module.exports.writePostValidation = writePostValidation;
module.exports.readPostValidation = readPostValidation;
module.exports.editFriendsValidation = editFriendsValidation;
module.exports.getFriendsValidation = getFriendsValidation;