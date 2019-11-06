const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const bcrypt = require('bcrypt');

router.get('/new', (req, res) => {
    res.render('sessions/new.ejs');
});

router.post('/', (req, res) => {
    // console.log(req.body);
    User.findOne({username:req.body.username}, (error,foundUser) => {
        console.log(error);
        console.log(foundUser);
        if(foundUser === null){
            res.redirect('/sessions/new');
        } else {
            const doesPasswordMatch = bcrypt.compareSync(req.body.password, foundUser.password);
            console.log(req.body);
            console.log(foundUser);
            if(doesPasswordMatch){
                req.session.username = foundUser.username;
                res.redirect('/solar');
            } else {
                res.redirect('/sessions/new');
            }
        }
    });
});

module.exports = router;
