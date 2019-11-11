const express = require('express');
const User = require('../models/users.js');
const router = express.Router();

// router.get("/solar/build", (req, res) => {
//
// })

router.put('/solar/battery', (req, res) => {
    console.log(req.body);
    User.findOneAndUpdate(
        {username:req.session.username},
        {
            $set: {battery:req.body}
        },

        (error, foundUser) => {
            res.redirect('/solar/build');
        });
    })

router.put('/solar/panels', (req, res) => {
    console.log(req.body);
    User.findOneAndUpdate(
        {username:req.session.username},
        {
            $set: {panels:req.body}
        },
        (error, foundUser) => {
            res.redirect('/solar/build');
        });
    })


router.put('/solar/inverter', (req, res) => {
    console.log(req.body);
    User.findOneAndUpdate(
        {username:req.session.username},
        {
            $set: {inverter:req.body}
        },
        (error, foundUser) => {
                res.redirect('/solar/build');
            });
        })

router.put('/solar/chargecontrol', (req, res) => {
    console.log(req.body);
    User.findOneAndUpdate(
        {username:req.session.username},
        {
            $set: {chargecontrol:req.body}
        },
        (error, foundUser) => {

                res.redirect('/solar/build');
            });
        })


module.exports = router;
