const mongoose=require('mongoose');

const UserSchema=new mongoose.Schema(
{
    Name:{
        type:String
    },
    Email:{
        type:String
    },
    Password:{
        type:String
    }
}
);
const Admin= mongoose.model('Admin',UserSchema);
module.exports=Admin;