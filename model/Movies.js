const mongoose=require('mongoose');

const UserSchema=new mongoose.Schema({
    MovieName:{
        type:String
    },
    LeadActor:{
        type:String
    },
    LeadActress:{
        type:String
    },
    URL:{
        type:String
    },
})

const Movie=mongoose.model('Movie',UserSchema);
module.exports=Movie;