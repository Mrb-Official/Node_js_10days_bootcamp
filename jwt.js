const jwt = require("jsonwebtoken")

const jwtAuthMiddleware = (red, res, next) => {
    const jwt_token = req.headers.Authorization.slice(" ")[1];

    if(!jwt_token) res.status(401).json({err: "invalid credentials"});

        try{
            const Authticated = jwt.verify(jwt_token, prosess.env.AUTH_KEY);
            req.user = Authticated;
            next();
        }catch(err){
            res.status(500).json(err);
            console.log(err);
            next();
        }
}

const jwt_create = (userData) => {
    const token = jwt.sign(user, prosess.env.AUTH_KEY);
    return token;
}

module.exports = {jwtAuthMiddleware, jwt_create};