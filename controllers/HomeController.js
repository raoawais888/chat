const UserModel = require("../model/User.js");

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
     
      const user = await UserModel.find({_id:{$nin : [req.user._id] }}); 
       res.render("chat",{user});

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

}


module.exports = HomeController