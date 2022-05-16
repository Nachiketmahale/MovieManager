const mongoose =require('mongoose');

const UserSchema=new mongoose.Schema({
    Name:{
        type:String
    },
    Email:{
        type:String
    },
    Password:{
        type:String
    }
})
const User= mongoose.model('User',UserSchema);
module.exports=User;