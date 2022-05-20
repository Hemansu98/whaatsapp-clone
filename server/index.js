// import all external dependencies here
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const passport = require('passport');

// import all local dependencies here
const routes = require('./routes');

/* ========================================= */

require('dotenv').config();
const app = express();

// connecting to the database
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log(" Mongoose is connected")
    })
    .catch(err => console.log(err));
    
/* ========================================= */

// Middlewares configuration
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());
app.use(cors());

const passportJwtStrategy = require('./strategy/passportJWT');
app.use(passport.initialize());
passportJwtStrategy(passport);

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