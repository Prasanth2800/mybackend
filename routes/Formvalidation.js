const joi = require('@hapi/joi');
const { schema } = require('../models/Post');

const signupvalidation = data=>{
    const Schema={
        name:joi.string()
        .required(),
        phonenumber:joi.string()
        .min(6)
        .max(100)
        .required(),
        email:joi.string()
        .min(6)
        .max(100)
        .required(),
        password:joi.string()
        .min(6)
        .max(100)
        .required()
    }
    return joi.validate(data,Schema)
}
const signinvalidation = data=>{
    const Schema ={
        email:joi.string()
        .min(6)
        .max(100)
        .required(),
        password:joi.string()
        .min(6)
        .max(100)
        .required()
    }
    return joi.validate(data,schema)
}

module.exports.signupvalidation=signupvalidation;
module.exports.signinvalidation=signupvalidation;