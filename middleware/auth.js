
const userCheck = async (req,res,next)=>{
try {

    if(req.isAuthenticated()){
        next();
    }else{
        res.redirect("/");
    }
    
} catch (error) {
    console.log(error);
}

}


module.exports = userCheck;
