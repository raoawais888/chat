const  nodemailer  = require("nodemailer");
const transporter = nodemailer.createTransport({

    host:"smtp.gmail.com",
    port:587,
    secure:false, 
    auth:{

        user:"leadtest77@gmail.com",
        pass:"tcbvpwjblnbymsfc"

    }


})

module.exports = nodemailer;