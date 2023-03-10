const auth= require('express').Router();
const User = require('../models/user');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

//register
auth.post('/register',async(req,res)=>{
    try{
        const isExisting=await User.findOne({email:req.body.email})
        if(isExisting){
            return res.status(404).json({msg:'Email has been already registered'});
        }
        const hashedPassword=await bcrypt.hash(req.body.password,10);

        const user = await User.create({...req.body, password:hashedPassword});
        await user.save();

        const {password , ...others}=user._doc;
        const token=createToken(user);

        return res.status(201).json({others,token});

    }catch(err){
        return res.status(500).json(err.message);
    }
})

//login
auth.post('/login',async(req,res)=>{
    try{
        const user=await User.findOne({email:req.body.email});

        if(!user){
            return res.status(404).json({msg:'Invalid credentials'});
        }

        const comparePass=await bcrypt.compare(req.body.password,user.password);

        if(!comparePass){
            return res.status(404).json({msg:'Invalid credentials'});
        }

        const {password , ...others}=user._doc;
        const token=createToken(user);
        return res.status(200).json({others,token});
    }catch(err)
    {
        return res.status(500).json(err.message);
    }
})
//create token function
const createToken= (user)=>{
    const payload={
        id:user._id.toString(),
        isAdmin:user.isAdmin
    }
    const token =jwt.sign(payload,process.env.JWT_SECRET)
    return token
}

module.exports=auth;