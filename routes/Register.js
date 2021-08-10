const {Router} = require('express');
const router = require('express').Router();
const User = require('../models/User');
const {registervalidation,loginvalidation} = require('./validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register',async(req,res)=>{
    //check validation
    const{error} = registervalidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    //check email
    const emailexist = await User.findOne({email:req.body.email})
    if(emailexist) return res.status(401).send('email already exist')
    //check hash password
    const salt = await bcrypt.genSalt(10)
    const hashpassword = await bcrypt.hash(req.body.password,salt)
    const users = new User({
        name:req.body.name,
        email:req.body.email,
        password:hashpassword
    });
    try{
       const saveduser = await users.save();
       res.json({saveduser});
    }catch{
        return res.json(console.error)
    }
});

router.get('/',async(req,res)=>{
    try{
        const users = await User.find()
        res.json({users})
    }catch(err){
        return res.json({message:err})
    }
});

router.delete('/:userId',async(req,res)=>{
    try{
        const removedUser = await User.deleteMany(
            {_id:req.params.userId})
            res.json({removedUser})
        }catch(err){
            return res.json({message:err})
    }
});

router.patch('/:userId',async(req,res)=>{
    try{
        const updateUser = await User.updateMany(
            {_id:req.params.userId},
            {$set:{name:req.body.name}}
        )
        res.json({updateUser})
    }catch(err){
        return res.json({message:err})
    }
});

router.post('/login',async(req,res)=>{
    //check validation
    const{error} = loginvalidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    //check user
    const user = await User.findOne({email:req.body.email})
    if(!user) return res.status(401).send('user not found')
    //check password
    const validPass = await bcrypt.compare(req.body.password,user.password)
    if(!validPass) return res.status(402).send('invalid password')
    //token
    const token = jwt.sign({_id:user._id},'${process.env.SECRET_CODE}')
    res.header('auth-token',token).send(token)
    res.send('Loged in')
});

module.exports=router;