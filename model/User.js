const mongoose = require ("mongoose");

const USerSchema = mongoose.Schema({
    
    name:{type:String , required:true , trim :true},
    email:{type:String , required:true , trim :true},
    password:{type:String , required:true , trim :true},
    image:{type:String , required:true , trim :true},
    status:{type:Boolean , required:true , trim :true},
    token:{type:String , required:true , trim :true},
} , { timestamps:true})


const UserModel = mongoose.model('user', USerSchema);

module.exports = UserModel;