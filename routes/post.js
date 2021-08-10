const { Router } = require('express');
const router = require('express').Router();
const Post = require('../models/Post')

// //post

// router.post('/',async(req,res)=>{
//     const post = new Post({
//         bookname:req.body.bookname,
//         author:req.body.author,
//         price:req.body.price
//     });
//     try{
//         const savepost = await post.save();
//         res.json({savepost});
//     }catch{
//         res.status(400).send(err)
//     }
// });

// //get

// router.get('/',async(req,res)=>{
//     try{
//         const findpost = await Post.find();
//         res.json({findpost});
//     }catch{
//         res.json({message:err});
//     }
// });

// //delete

// router.delete('/:postId',async(req,res)=>{
//     try{
//         const deletepost = await Post.deleteMany(
//             {_id:req.params.postId});
//             res.json({deletepost});
//     }catch{
//         res.json({message:err});
//     }
// });

// //update

// router.patch('/:postId',async(req,res)=>{
//     try{
//         const updatepost = await Post.updateMany(
//             {_id:req.params.postId},
//             {$set:{bookname:req.body.bookname}},
//             {$set:{author:req.body.author}}
//         );
//         res.json({updatepost});
//     }catch{
//         res.json({message:err});
//     }
// });

// //get a specific post

// router.get('/:postId',async(req,res)=>{
//     try{
//         const newpost = await Post.findById(
//             {_id:req.params.postId});
//             res.json({newpost});
//     }catch{
//         res.json({message:err});
//     }
// });
// module.exports = router; 

router.post('/',async(req,res) =>{
    const posts = new Post({
        bookname: req.body.bookname,
        author: req.body.author,
        year:req.body.year,
        price: req.body.price
    })
    try{
        const savedPost = await posts.save()
        res.json({savedPost})
    }catch(err){
        return res.json(console.error)
    }
})
router.get('/', async(req,res) =>{
     try{
       const posts = await Post.find()
       res.json(posts)
     }catch(err){
        return res.json({message:err})
     }
})

router.delete('/:postId',async (req,res) =>{
    try{
       const removedPost = await Post.deleteMany(
           {_id:req.params.postId}
       );
       res.json({removedPost});
    }catch(err){
        return res.json({message:err})

    }
})

router.patch('/:postId', async (req,res) => {
    try{
         const updatedPost = await Post.updateMany(
             {_id:  req.params.postId},
             {$set : {bookname:req.body.bookname}}
         );
         res.json(updatedPost);
    }catch(err){
   return res.json({message:err})
    }
})

module.exports=router;