
const mongoose =  require("mongoose");

    const CONNECT_DB = async (DB_URL)=>{

    const OPTION = {
        dbName:process.env.DB_NAME
    }              
    await mongoose.connect(DB_URL,OPTION);
    console.log("connect");

    }


module.exports = CONNECT_DB;