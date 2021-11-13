require("dotenv").config();

//pull PORT form .env
const { PORT = 3000 } = process.env;
//import express
const express = require("express");
//create application object
const app = express();

//Routes
//////////

//Test Route
app.get("/", (req, res) => {
    res.send("Hello World");
});


//Listener
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));