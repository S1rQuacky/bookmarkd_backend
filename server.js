require("dotenv").config();
//pull PORT form .env
const { PORT = 3000, DATABASE_URL } = process.env;
//import express
const express = require("express");
//create application object
const app = express();
const mongoose = require("mongoose");
//middleware
const cors = require("cors");
const morgan = require("morgan");

//Database connection
mongoose.connect(DATABASE_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

//connection events
mongoose.connection
    .on("open", () => console.log("Connected to MongoDB"))
    .on("close", () => console.log("Disconnected from MongoDB"))
    .on("error", (error) => console.log(error));

//Models
const bookmarkSchema = new mongoose.Schema({
    title: String,
    url: String
});

const Bookmark = mongoose.model("Bookmark", bookmarkSchema);

//Middleware
app.use(cors())
app.use(morgan("dev"))
app.use(express.json())

//Routes
//////////

//Test Route
app.get("/", (req, res) => {
    res.send("Hello World");
});

//Index Route
app.get("/bookmarks", async (req, res) => {
    try {
        res.json(await Bookmark.find({}));
    } catch (error) {
        res.status(400).json((error))
    }
});

//Create Route
app.post("/bookmarks", async (req, res) => {
    try {
        res.json(await Bookmark.create(req.body));
    } catch (error) {
        res.status(400).json({error});
    }
});

//update route 
app.put("/bookmarks/:id", async (req, res) => {
    try {
        res.json(
            await Bookmark.findByIdAndUpdate(req.params.id, req.body,
                {new: true})
        )
    } catch (error){
        res.status(400).json({error})
    }
});

app.delete("/bookmarks/:id", async (req, res) => {
    try {
        res.json(await Bookmark.findByIdAndRemove(req.params.id))
    } catch (error) {
        res.status(400).json({error})
    }
})

//Listener
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));