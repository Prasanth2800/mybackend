// const mongoose = require('mongoose')

// const PostSchema = mongoose.Schema({
//     bookname:{
//         type:String,
//         required:true
//     },
//     author:{
//         type:String,
//         required:true
//     },
//     price:{
//         type:Number,
//         required:true
//     }
// })

// module.exports = mongoose.model('Post',PostSchema);

const mongoose = require('mongoose');

const postschema = mongoose.Schema ({
     bookname:{
         type:String,
         required:true,
     },
     author:{
         type:String,
         required:true,
     },
     year:{
         type:String,
         required:true
     },
     price:{
         type:String,
         required:true,
     }
})
module.exports = mongoose.model('posts',postschema);