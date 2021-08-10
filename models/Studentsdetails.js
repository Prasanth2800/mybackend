const mongoose = require('mongoose');

const studentSchema = mongoose.Schema ({
     fullname:{
         type:String,
         required:true,
     },
     standard:{
         type:String,
         required:true,
     },
     rollno:{
         type:String,
         required:true
     }
    //  result:{
    //      type:String,
    //      required:true,
    //  }
})
module.exports = mongoose.model('details',studentSchema);