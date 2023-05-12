const  multer =  require("multer");
const  path =  require("path");



const storage = multer.diskStorage({

    destination:(req,file,cb)=>{
         
        cb(null,"public/uploads");

    },

    filename:async (req , file , cb) =>{
         
        const u_file =  Date.now() + '_' + Math.random();
            cb(null ,file.fieldname + u_file + path.extname(file.originalname));
              
    }


})


const upload = multer({storage:storage});

module.exports = upload;


   