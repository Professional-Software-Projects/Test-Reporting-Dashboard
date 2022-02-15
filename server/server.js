// importing packages
require('dotenv').config({ path: './config.env' });
const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');
const dbo = require('./db/conn');
const port = process.env.PORT || 5000;
const pathToIndex = path.join(__dirname, '/../client/public');

// add methods from the packages so they can be called
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json("Successful Connection.");
});

app.listen(port, () => {
    dbo.connectToServer(function (err) {
        if(err) console.error(err);
    });
    
    console.log(`Server is running on port: ${port}`);
});