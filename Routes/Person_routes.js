const express = require('express')
const Route = express.Router()
const person = require('../models/person')



Route.post("/", async (req, res) => {
    try{
      const data = req.body;
      const NewPerson = new person(data);
      
      response = await NewPerson.save();
      res.status(200).json(response);
    }catch(err){
      console.log("intrrnal error", err);
      res.status(500).json(err);
    }
  });
  
  //get methid to get all usrr data
  Route.get("/", async (req, res) => {
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