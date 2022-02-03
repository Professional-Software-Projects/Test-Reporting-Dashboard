const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const api = express();
const port = 5000;

mongoose.connect("mongodb://localhost:5000/App");

api.use(cors);
api.get('/', (req, res) =>{
    res.json("Successful connection.");
    res.render("index", { text: "Hello World" })
});

api.listen(port, ()=>console.log('API is listening on port ' + port));