const express = require('express')
const app = express();
const db = require("./db")
const bodyParser = require("body-parser");
app.use(bodyParser.json());
require('dotenv').config();


  app.get("/", (req, res) => {
    res.send("welcome user")
  });

  //passort module
  const auth = require("./auth");
  app.use(auth.initialize());
  const authPassport = auth.authenticate("local", {session: false});
 
 //person routes 
const PersonRoutes = require("./Routes/Person_routes");
app.use("/person", PersonRoutes);

//hotel menue route endpoint
const Menue_Items = require("./Routes/Menue_items_Routes");
app.use("/menue", Menue_Items);

const Port = process.env.PORT || 3000 ;

app.listen(Port, () => console.log("server is live"))