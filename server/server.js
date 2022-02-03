// importing packages
const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: './config.env' });
const api = express();
const port = process.env.PORT || 5000;
api.use(cors());
api.use(express.json());
const dbo = require('./db/conn');


api.get('/', (req, res) => {
    res.json("Successful connection.");
    res.render("index", { text: "Hello World" })
});

api.listen(port, () => {
    dbo.connectToServer(function (err) {
        if(err) console.error(err);
    });
    console.log(`Server is running on port: ${port}`);
});