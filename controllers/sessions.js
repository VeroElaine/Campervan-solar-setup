const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const bcrypt = require('bcrypt');

wrongInput = false;
router.get('/new', (req, res) => {
    res.render('sessions/new.ejs');
});

router.post('/', (req, res) => {
    // console.log(req.body);
    User.findOne({username:req.body.username}, (error,foundUser) => {
        if(foundUser === null){
            wrongInput = true;
            res.redirect('/sessions/new');
        } else {
            const doesPasswordMatch = bcrypt.compareSync(req.body.password, foundUser.password);
            if(doesPasswordMatch){
                req.session.username = foundUser.username;
                // console.log(req.session);
                req.session.userid = foundUser._id;
                res.redirect('/solar');
            } else {
                wrongInput = true;
                res.redirect('/sessions/new');
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
