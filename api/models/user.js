const mongoose=require('mongoose')

const userSchema=new mongoose.Schema(
    {
        username:{
            type:String, 
            requires:true,
            unique:true
        },
        email:{
            type:String, 
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true
        },
        profilePic:{
            type:String,
            defaut:''
        },
        isAdmin:{
            type:Boolean,
            default: false
        },
    },{timestamps:true}
    
);

module.exports=mongoose.model('User',userSchema);