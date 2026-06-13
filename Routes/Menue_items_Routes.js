const express = require("express");
const Route = express.Router();
const menue_Items = require("../models/Hotel.js");


//api for enter items in menue
Route.post("/", async (req, res) => {
  try{
  const data = req.body;
  const items = new menue_Items(data);
  
  const response = await items.save();
  res.status(200).json(response);
  }catch(err){
    console.log("internal error", err);
    res.status(500).json(err);
  }
});


//api for show items from menue
Route.get("/", async (req, res) => {
  try{
    const menue = await menue_Items.find();
    res.status(200).json(menue);
    console.log("menue items fetched");
  }catch(err){
    res.status(500).json(err);
    console.log("internal erro aquars", err);
  }
});

module.exports = Route;