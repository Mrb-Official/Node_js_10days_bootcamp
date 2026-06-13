const express = require('express')
const app = express();
const db = require("./db")
const bodyParser = require("body-parser");
app.use(bodyParser.json());


  app.get("/", (req, res) => {
    res.send("welcome user")
  });
 
 //person routes 
const PersonRoutes = require("./Routes/Person_routes");
app.use("/person", PersonRoutes);

//hotel menue route endpoint
const Menue_Items = require("./Routes/Menue_items_Routes");
app.use("/menue", Menue_Items);

app.listen(3000, () => console.log("server is live"))