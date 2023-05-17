

const  express  = require("express");
const passport = require('passport');
const router = express.Router();
const HomeController = require( "../controllers/HomeController.js");
const AuthController = require("../controllers/AuthController.js") ;
const upload = require("../config/multer.js");
const userCheck = require("../middleware/auth.js");

router.get("/",HomeController.index);
router.get("/chat",userCheck, HomeController.chatShow);
router.post("/chat",userCheck, HomeController.chat_store);


router.post('/',passport.authenticate('local', 
{   successRedirect: '/chat',
    successFlash:true,
    failureFlash:true,
    failureRedirect: '/',
}));

router.get("/logout",HomeController.logout);





router.get("/register",HomeController.register);
router.post("/register",upload.single("image") ,AuthController.register);




module.exports = router;