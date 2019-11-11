const express = require('express');
const User = require('../models/users.js');
const router = express.Router();

// router.get("/solar/build", (req, res) => {
//
// })

router.put('/solar/battery', (req, res) => {
    User.findOne({
        username:req.session.username},
        (error, foundUser) => {
            console.log(error);
            console.log(foundUser);
            foundUser.battery.push(req.body);
            foundUser.save(
                (error, data) => {
                res.redirect('/solar/build');
            });
        })
    })



module.exports = router;
