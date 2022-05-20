// import all external dependencies here
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');


/* ========================================= */

// import all local dependencies here
const routes = require('./routes');


/* ========================================= */


const app = express();

// configure server and its middleware
require('dotenv').config();

app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());
app.use(cors());

mongoose.connect(
    process.env.MONGO_URL, {
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    }, () => {
        console.log(" Mongoose is connected")
    } 
);

//configure a logger 
app.use(function(req, res, next) {
    // console.log(req);
    next();
});

app.use('/', routes);

const server = app.listen(process.env.PORT, () => {
    console.log(`App is listening at ${process.env.PORT}`);
});

/* ===================================================== */