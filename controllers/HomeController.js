const UserModel = require("../model/User.js");
const ChatModel = require("../model/Chat.js");

class HomeController {

  static index = async (req,res) =>{
    try {

            
        res.render("index");


    } catch (error) {     
        console.log(error);
    }
  }



  static register = async (req,res) =>{
    try {
        
        res.render("register");


    } catch (error) {     
        console.log(error);
    }
  }


  static chatShow = async (req,res)=>{
    try {
     
      const user_data = await UserModel.find({_id:{$nin : [req.user._id] }}); 
       res.render("chat",{user_data});

    } catch (error) {
      
      console.log(error);
    }
  }


   static logout = async (req,res)=>{
    try {
      
      req.logout((err)=>{
          
        console.log(err);
        res.redirect("/");
      });
     

    } catch (error) {
      
      console.log(error);
    }
   }



  //  static chat_store = async (req,res)=>{
  //   try {

           
  //     const {message , reciever_id, sender_id} = req.body;

  //       const chatDoc = ChatModel({
                 
  //         message:message,
  //         reciever_id:reciever_id,
  //         sender_id:sender_id
  //       })
  
  //         await chatDoc.save();

  //         res.status(200).send("success");
       



  //   } catch (error) {
  //     console.log(error);
  //   }
  //  }


}


module.exports = HomeController