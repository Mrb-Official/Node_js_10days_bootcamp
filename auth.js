const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const person = require("./models/person");


    passport.use(new LocalStrategy(async(username, password, done) => {
        try{
        const user = await person.findOne({username: username});
        console.log(user);
        if(!user) return done(null, false, ({massage: "invalid username"}))
        
        //const isPass = user.comparePassword("password");
        const isPass = await user.comparePassword(password);
        if(!isPass){
            return done(null, null, ({massage: "invalid password"}));
        }else{
            return done(null, user);
        }

        }catch(err){
        return done(err);
        }
    }));

module.exports = passport;