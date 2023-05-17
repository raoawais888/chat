const mongoose = require ("mongoose");

const ChatSchema = mongoose.Schema({
    
    sender_id:{type:mongoose.Schema.Types.ObjectId , ref:"user"},
    reciever_id:{type:mongoose.Schema.Types.ObjectId , ref:"user"},
    message:{type:String , required:true , trim :true},
} , { timestamps:true})


const ChatModel = mongoose.model('user', ChatSchema);

module.exports = ChatModel;