const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const bcrypt = require('bcrypt');

// wrongInput = false;
router.get('/new', (req, res) => {
    res.render('sessions/new.ejs', {
        wrongInput:false
    });
});
//wrongInput
router.get("/new/wronginput", (req, res) => {
    res.render("sessions/new.ejs", {
        wrongInput:true
    });
});
router.post('/', (req, res) => {
    User.findOne({username:req.body.username}, (error,foundUser) => {
        if(foundUser === null){
            // wrongInput = true;
            res.redirect('/sessions/new/wronginput');
        } else {
            const doesPasswordMatch = bcrypt.compareSync(req.body.password, foundUser.password);
            if(doesPasswordMatch){
                req.session.username = foundUser.username;
                req.session.userid = foundUser._id;
                res.redirect('/solar');
            } else {
                // wrongInput = true;
                res.redirect('/sessions/new/wronginput');
            }
        }
    });
});

//destory session
router.post("/destroy", (req, res) => {
    req.session.destroy((error) => {
        if(error){
            console.log(error);
        }else {
            res.redirect("/")
        }
    });
});

module.exports = router;
