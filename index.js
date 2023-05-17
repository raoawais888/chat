
const  env = require("dotenv") ;
env.config();
const  cluster = require("cluster") 
const  os = require("os") 
const  express  = require("express") ;
const app = express();
const PORT = process.env.PORT || 3000;
const  web = require("./routes/web.js") ;
const  session = require("express-session") ;
const  mongoStore = require("connect-mongo") ;
const  CONNECT_DB = require("./db/Connection.js") ;
const  path = require("path") ;
const  passport = require("passport") ;
const  localPassport = require("./config/passportConfig.js") ;
const  flash = require("connect-flash"); 
const { disconnect } = require("process");
   CONNECT_DB(process.env.DB_URL);

   const store = mongoStore.create({
    mongoUrl:process.env.DB_URL,
    dbName:process.env.DB_NAME
    })


app.use(session({
    secret:process.env.SECRET,
    saveUninitialized:false,
    resave:false,
    store:store,
    cookie:{maxAge:100*60*60*24}
}))


app.use(passport.initialize());
app.use(passport.session());
localPassport(passport);

app.use(flash());

 app.use((req,res , next)=>{
     res.locals.message = req.flash();
     res.locals.user = req.user;
     next();
 })

app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(process.cwd(), "public")))
app.use("/", web);
app.set('view engine', 'ejs')
const cpu =  os.cpus().length;
 if(cluster.isPrimary){

  for(let i = 0 ; i < cpu ; i++){
      
    cluster.fork();

  }

     cluster.on("exit", ()=>{
        cluster.fork();

     })

 }else{
   var server =   app.listen(PORT,()=>{
 
        console.log(`http://localhost:${PORT}`);
    
    })
 }


//  socket io 

const io = require("socket.io")(server);

const UserModel = require("./model/User.js");

  const ups = io.of("/userchat");

  ups.on("connection", async (socket)=>{

         
     var  sender_id =   socket.handshake.auth.token;

      await UserModel.findByIdAndUpdate({_id:sender_id} , {status:1})
      socket.broadcast.emit("user_online",{sender_id});



      socket.on("msg", (data)=>{

        console.log(data);
      })
      

      
     
    socket.on("disconnect", async ()=>{
      await UserModel.findByIdAndUpdate({_id:sender_id} , {status:0})
      socket.broadcast.emit("user_offline",{sender_id});
     
    })
 


 })














