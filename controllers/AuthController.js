
const passport = require("passport");
const bcrypt = require("bcrypt");
const  UserModel =  require("../model/User.js");
class AuthController {

   static register = async (req,res)=>{

    try {
  
         const string_token = Math.random().toString(36).substring(2);

               const  token = string_token + string_token;

               const {name , email , password} = req.body;

               const passwordHash = await bcrypt.hash(password,10);
           
           const userDoc = UserModel({
            name:name,
            email:email,
            password:passwordHash,
            image:req.file.filename,
            status:false,
            token:token

           })

           await userDoc.save();
           req.flash("success", "User Register");
           res.redirect("/");
      
        
    } catch (error) {
        
        console.log(error);
    }
        
   }



   
  




}

module.exports = AuthController;