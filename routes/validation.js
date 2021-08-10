const joi = require('@hapi/joi');

const registervalidation = data=>{
    const Schema={
        name:joi.string()
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
const loginvalidation = data=>{
    const Schema={
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
module.exports.registervalidation=registervalidation;
module.exports.loginvalidation=loginvalidation;