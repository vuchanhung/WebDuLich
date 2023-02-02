const Room=require('../models/room.js');
const{verifyToken,verifyTokenAdmin}=require('../verifyToken.js');
const room=require('express').Router();


//get all
room.get('/',verifyToken,async(req,res)=>{
    try{
        const type=req.query.type
        let rooms
        if(type){
            rooms=await Room.find({type:type}).limit(15);
        }else{
            rooms=await Room.find({}).limit(15)
        }

        return res.status(200).json(rooms)

    }catch(err){
        console.error(err.message);
    }
})

//get one room
room.get('/find/:id',verifyToken,async(req,res)=>{
    try{
       const id = req.params.id;
       const rooms = await Room.findById(id);

        return res.status(200).json(rooms)
        
    }catch(err){
        console.error(err.message);
    }
})

//create
room.post('/',verifyTokenAdmin,async(req,res)=>{
    try{
        const createdRoom = await Room.create(req.body);
        return res.status(200).json(createdRoom);
    }catch(err){
        console.error(err.message);
    }
})

//update
room.put('/:id',verifyTokenAdmin,async(req,res)=>{
    try{
        const updateRoom=await Room.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
        return res.status(200).json(updateRoom);
    }catch(err){
        console.error(err.message);
    }
})

//delete
room.delete('/:id',verifyTokenAdmin,async(req,res)=>{
    try{
        const deleteRoom=await Room.findByIdAndDelete(req.params.id);
        return res.status(200).json({msg:'Successfully deleted room'});
    }catch(err){
        console.error(err.message);
    }
})

//book
room.put('/bookRoom/:id',verifyTokenAdmin,async(req,res)=>{
    try{
        const {unavailableDates} =req.body;
        const rooms=await Room.findById(req.params.id)

        rooms.unavailableDates= rooms.unavailableDates.concat(unavailableDates);
        await room.save();
        return res.status(200).json(rooms);
    }catch(err){
        console.error(err.message);
    }
})

module.exports=room;