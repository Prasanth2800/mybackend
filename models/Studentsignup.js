const mongoose = require('mongoose');

const StudentsSchema = mongoose.Schema({
    Rollno:{
        type:String,
        required:true
    },
    Name:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('data',StudentsSchema);