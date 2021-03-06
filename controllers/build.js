const express = require('express');
const User = require('../models/users.js');
const router = express.Router();



router.put('/solar/battery', (req, res) => {
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
    User.findOneAndUpdate(
        {username:req.session.username},
        {
            $set: {chargecontrol:req.body}
        },
        (error, foundUser) => {

                res.redirect('/solar/build');
            });
        })

        // creating route to add quantity and update price
// router.patch("/solar/build", (req, res) => {
//     User.findByIdAndUpdate(
//         {username:req.session.username},
//         { $set: {price: req.body}},
//         { new: true}, (error, updateQuantity) => {
//             res.redirect("/solar");
//         }
//     )
// })

module.exports = router;
