const express = require('express')
const Route = express.Router()
const person = require('../models/person');
const {jwtAuthMiddleware, jwt_create} = require("../jwt");



//import passpor midlleware with bcrypt
const passport = require("../auth");
Route.use(passport.initialize());
const auth_passport = passport.authenticate("local", {session: false});


//create a new user api
Route.post("/signup", async (req, res) => {
    try{
      const data = req.body;
      const NewPerson = new person(data);
      
      const response = await NewPerson.save();
      //extract userdata from response 
      const preload = {
        id: response.id,
        username: response.username
      }
      //crate jwt token using user data
      const token = jwt_create(preload);

      //send token with responser to user
      res.status(200).json({response, token});

    }catch(err){
      console.log("intrrnal error", err);
      res.status(500).json(err);
    }
  });

  //login api and create jwt token on login
  Route.post("/login", (req, res) => {
    try{
      //extract user data from form fields
      const {username, password} = req.body;
      //find usr by username
      const user = person.findOne({username: username});

      //check usr foud or not ans password match or not
      if(!user || !(user.password==password)){
        return res.status(401).json("invalid usernas or password");
      }

      //create a payload using founded user data
      const payload = {
        id: user.id,
        username: user.username
      }

      //create a jwt token usig paylaod
      const token = jwt_create(payload);

      //return jwt token to user
      res.status(200).json({token});

    }catch(err){
      console.log("intrrnal error", err);
      res.status(500).json(err);
    }
  });



  //view profile data using jwt token api
  Route.get("/profile", jwtAuthMiddleware, async (req, res) => {
    
    try{
      const userData = req.user;
      console.log("user data : ", userData);
      const user_id = userData.id;
      
      const user = await person.findById(user_id);

      //userfound or not 
      if(!user) return res.status(401).json("user not found");
      //show user data when fetch
      //console.log(user);
      res.status(200).json({user});
      

    }catch(err){
      console.log(err);
      res.status(500).json(err);
    }

  });
  
  //get methid to get all usrr data
  Route.get("/", jwtAuthMiddleware, async (req, res) => {
    try{
    const users = await person.find();
    res.json(users);
    console.log("users found");
    }catch(err){
      console.log(err);
    }
  });
    //fetch person according hus work
    Route.get("/:work_type", async (req, res) => {
      try{
        const work_type = req.params.work_type;
        
        const response = await person.find({work: work_type});
        res.status(200).json(response);
      }catch(err){    
        res.status(500).json(err);
        console.log(err);
      }
    });
    
//update persion data
    Route.put("/:id", async (req, res) => {
      try{
      const update_data = req.body;
      const user_id = req.params.id;
      const response = await person.findByIdAndUpdate(user_id, update_data, {
        returnDocument: 'after',
        runValidators: true
      });
      if(!response){
        res.status(404).json("user not found");
      }  

      res.status(200).json(response)
      }catch(err){
        res.status(500).json({error: "internal server error"});
        console.log("internal server error");
      }
    });
    
    //delete person
    Route.delete("/:id", async (req, res) => {
      try{
      const user_id = req.params.id;
      const response = await person.findByIdAndDelete(user_id);
      
      if(!response){
        res.status(404).json({error: "user not found !"})
      }
      
      res.status(200).json({massage: "user dleted successfully!"});
      }catch(err){
        res.status(500).json({error: "internal server error"});
        console.log(err);
      }
    });

module.exports = Route;