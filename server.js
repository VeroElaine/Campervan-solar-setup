//------------------------
// Dependencies
//-----------------------
const express = require("express");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const app = express();
const db = mongoose.connection
const session = require('express-session');
require("dotenv").config();



//------------------------
// Port
//-----------------------
const PORT = process.env.PORT
//console.log(PORT);

//------------------------
// Database
//-----------------------
const MONGODB_URI = process.env.MONGODB_URI
console.log(MONGODB_URI);
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

//------------------------
// Middleware
//-----------------------
// use public folder for static assets
app.use(express.static("public"))
// populate req.body with parsed info from forms
app.use(express.urlencoded({ extended: false}))
//be able to use delete and put routes
app.use(methodOverride("_method"))
//
app.use(session({
    secret:'randomString',
    resave:false,
    saveUninitialized:false
}));

const solarController = require('./controllers/solar.js');
app.use('/solar', solarController);

const usersController = require('./controllers/users.js');
app.use('/users', usersController);

const sessionsController = require('./controllers/sessions.js');
app.use('/sessions', sessionsController);

const communityController = require("./controllers/communitybuilds.js");
app.use("/community", communityController);


//------------------------
// Routes
//-----------------------
app.get("/", (req, res) => {
    res.render("home.ejs")
})

//------------------------
// Listener
//-----------------------

app.listen(PORT, () => {
    console.log("listening on port:", PORT);
});
