const {Router} = require('express');
const router = require('express').Router();
const Info = require('../models/Userform');
const {signupvalidation,signinvalidation} = require('./Formvalidation');
const bcrypt = require('bcryptjs');

router.post('/signup',async(req,res)=>{
    //check validation
    const {error} = signupvalidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    //check email
    const emailexist = await Info.findOne({email:req.body.email})
    if(emailexist) return res.status(401).send('Email already exist')
    //check password
    const salt = await bcrypt.genSalt(10)
    const hashpassword = await bcrypt.hash(req.body.password,salt)
    const info = new Info({
        name:req.body.name,
        phonenumber:req.body.phonenumber,
        email:req.body.email,
        password:hashpassword
    });
    try{
        const savedinfo = await info.save();
        res.json({savedinfo});
    }catch{
        return res.json(console.error)
    }
});

router.get('/',async(req,res)=>{
    try{
    const info = await Info.find();
    res.json({info});
    }catch(err){
        return res.json({message:err})
    }
});

router.delete('/:infoId',async(req,res)=>{
    try{
    const deleteinfo = await Info.deleteMany(
        {_id:req.params.infoId});
        res.json({deleteinfo});
    }catch(err){
        return res.json({message:err})
    }
});

router.patch('/:infoId',async(req,res)=>{
    try{
        const updateinfo = await Info.updateMany(
            {_id:req.params.infoId},
            {$set:{name:req.body.name}}
        )
        res.json({updateinfo})
    }catch(err){
        return res.json({message:err});
    }
});

router.post('/signin',async(req,res)=>{
    //check validation
    const{error}=signinvalidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    //check user
    const info = await Info.findOne({email:req.body.email})
    if(!info) return res.status(401).send('User not found')
    //check password
    const validpass = await bcrypt.compare(req.body.password,info.password)
    if(!validpass) return res.status(402).send('Invalid password')
    res.send('Loged in')
})

module.exports=router;