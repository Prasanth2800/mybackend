const joi = require('@hapi/joi');

const studentregister = data=>{
    const Schema={
        Rollno:joi.string()
        .required(),
        Name:joi.string()
        .min(6)
        .max(100)
        .required(),
        Password:joi.string()
        .min(6)
        .max(100)
        .required()
    }
    return joi.validate(data,Schema)
}
const studentlogin = data=>{
    const Schema={
        Name:joi.string()
        .min(6)
        .max(100)
        .required(),
        Password:joi.string()
        .min(6)
        .max(100)
        .required()
    }
    return joi.validate(data,Schema)
}
module.exports.studentregister=studentregister;
module.exports.studentlogin=studentlogin;