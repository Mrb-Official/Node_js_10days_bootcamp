const jwt = require("jsonwebtoken")
require('dotenv').config();

const jwtAuthMiddleware = (req, res, next) => {
    const jwt_token = req.headers.authorization.split(" ")[1];
    console.log(jwt_token);

    if(!jwt_token) return res.status(401).json({err: "invalid credentials"});

        try{
            const Authticated = jwt.verify(jwt_token, process.env.AUTH_KEY);
            req.user = Authticated;
            return next();
        }catch(err){
            res.status(500).json(err);
            console.log(err);
        }
}

const jwt_create = (userData) => {
    const token = jwt.sign(userData, process.env.AUTH_KEY);
    return token;
}

module.exports = {jwtAuthMiddleware, jwt_create};