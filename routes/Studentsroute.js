const { Router } = require('express');
const router = require('express').Router();
const Detail = require('../models/Studentsdetails')

router.post('/',async(req,res) =>{
    const details = new Detail({
        fullname:req.body.fullname,
        standard:req.body.standard,
        rollno:req.body.rollno
        //result:req.body.result
    })
    try{
        const savedDetail = await details.save()
        res.json({savedDetail})
    }catch(err){
        return res.json(console.error)
    }
});
router.get('/', async(req,res) =>{
     try{
       const details = await Detail.find()
       res.json(details)
     }catch(err){
        return res.json({message:err})
     }
});

router.delete('/:studentId',async (req,res) =>{
    try{
       const removedDetail = await Detail.deleteMany(
           {_id:req.params.studentId}
       );
       res.json({removedDetail});
    }catch(err){
        return res.json({message:err})

    }
});

router.patch('/:studentId', async (req,res) => {
    try{
         const updateDetail = await Detail.updateMany(
             {_id:req.params.studentId},
             {$set:{fullname:req.body.fullname}}
         );
         res.json(updateDetail);
    }catch(err){
   return res.json({message:err})
    }
});

module.exports=router;