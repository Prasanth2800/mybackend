const { Router } = require('express');
const router = require('express').Router();
const Data = require('../models/Studentsignup');
const { studentregister, studentlogin } = require('./studentvalidation');
const bcrypt = require('bcryptjs');
const jwebt = require('jsonwebtoken');

//post

router.post('/studentreg',async(req,res)=>{
    //check validation
    const{error} = studentregister(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    //check name
    const nameexist = await Data.findOne({Name:req.body.Name})
    if(nameexist) return res.status(401).send('Name already exist')
    //check hash password
    const salt = await bcrypt.genSalt(10)
    const hashpassword = await bcrypt.hash(req.body.Password,salt)
    const data = new Data({
        Rollno:req.body.Rollno,
        Name:req.body.Name,
        Password:hashpassword
    });
    try{
        const savedata = await data.save();
        res.json({savedata});
    }catch{
        return res.json(console.error)
    }
});

//get

router.get('/',async(req,res)=>{
    try{
        const data = await Data.find();
        res.json({data});
    }catch(err){
        return res.send({message:err})
    }
});

//delete

router.delete('/:dataId',async(req,res)=>{
    try{
        const deletedata = await Data.deleteMany(
            {_id:req.params.dataId});
            res.json({deletedata});
    }catch(err){
        return res.send({message:err})
    }
});

//update

router.patch('/:dataId',async(req,res)=>{
    try{
        const updatadata = await Data.updateMany(
            {_id:req.params.dataId},
            {$set:{Name:req.body.Name}}
        );
        res.json({updatadata});
    }catch(err){
        return res.send({message:err});
    }
});

//get a specific post

router.get('/:dataId',async(req,res)=>{
    try{
        const newdata = await Data.findById(
            {_id:req.params.dataId});
            res.json({newdata});
    }catch(err){
        return res.send({message:err});
    }
});

router.post('/studentlog',async(req,res)=>{
    //check validation
    const{error} = studentlogin(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    //check user
    const data = await Data.findOne({Name:req.body.Name})
    if(!data) return res.status(401).send('user not found')
    //check password
    const validPassword = await bcrypt.compare(req.body.Password,data.Password)
    if(!validPassword) return res.status(403).send('invalid password')
    //token
    const token = jwebt.sign({_id:data._id},'${process.env.SECRET_CODE}')
    res.header('auth-token',token).send(token)
    res.send('Loged in')
});


module.exports = router;