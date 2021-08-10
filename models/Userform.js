const mongoose = require('mongoose');

const newuserSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phonenumber:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

module.exports=mongoose.model('info',newuserSchema);