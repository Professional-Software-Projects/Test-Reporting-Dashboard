// importing packages
require('dotenv').config({ path: './config.env' });
const fs = require('fs');
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

// set up view engine
app.set('views', pathToIndex);
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

// allow express to render static files like html
app.use(express.static(pathToIndex));

app.get('/', (req, res) => {
    res.json({ message: "Successful Connection." });
});

app.listen(port, () => {
    dbo.connectToServer(function (err) {
        if(err) console.error(err);
    });
    console.log(`Server is running on port: ${port}`);
});