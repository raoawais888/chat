


const LocalStrategy = require('passport-local').Strategy;
const  UserModel =  require ("../model/User.js");
const bcrypt = require ("bcrypt");

        const init = (passport)=>{
     
     

            passport.use(new LocalStrategy({usernameField:"email" , passwordField:"password"},
                async(email, password, done) =>{

                  // Find the user with the given username
                 const user =  await UserModel.findOne({ email: email });
                  
                
                    if (!user) {
                      return done(null, false, { message: 'Incorrect username.' });
                    }
                    // Verify the password for the user
                      if (! await bcrypt.compare(password , user.password)) {
                        return done(null, false, { message: 'Incorrect password.' });
                      }
                      // Authentication successful
                      return done(null, user);
                
                }
              ));


              passport.serializeUser(function(user, done) {
                done(null, user.id);
              });
              
              passport.deserializeUser(async (id, done) =>{
              const user = await  UserModel.findById(id);
                  done(null, user);
              
              });

     }

module.exports = init ;
  