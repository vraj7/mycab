const express = require('express');
const mongoose = require('mongoose');
var logger = require('morgan');
const session = require('express-session');
const passport = require('passport');
const connectDB = require("./config/db");
var expressLayouts = require('express-ejs-layouts');
const rateLimit = require("express-rate-limit");


const app = express();
require('dotenv').config()
// Connect to MongoDB
connectDB();

// Passport Config
require('./config/passport')(passport);

// Express body parser
app.use(express.urlencoded({ extended: true }));

app.use(expressLayouts);

app.set('view engine', 'ejs');


// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//logger middleware
app.use(logger('dev'));

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000
});

// only apply to requests that begin with /
app.use("/", apiLimiter);

//routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));
app.use('/driver', require('./routes/driver.js'));
app.use('/booking', require('./routes/booking.js'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running on  ${PORT}`));