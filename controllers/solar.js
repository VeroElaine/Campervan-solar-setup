const express = require('express');
const Solar = require('../models/solar.js');
const User = require("../models/users.js");
const router = express.Router();

router.get('/new', (req, res) => {
    res.render('solar/new.ejs')
});

router.get('/build', (req, res) => {
    if(req.session.username){
        User.findOne({
            username:req.session.username}, (error, foundUser) => {
                Solar.find({userid:req.session.userid}, (error, allSolar) => {
                    res.render('solar/build.ejs',{
                        username:req.session.username,
                        foundUser:foundUser
                    })
                })
            })

        }else {
               res.redirect('../users/new');
           }
    });


router.get('/battery', (req, res) => {
    Solar.find({userid:req.session.userid}, (error, foundUser) => {
        res.render('solar/battery.ejs',{
            username:req.session.username,
            foundUser:foundUser
        })
    })
});

router.get('/panels', (req, res) => {
    Solar.find({userid:req.session.userid}, (error, foundUser) => {
        res.render('solar/panels.ejs',{
            username:req.session.username,
            foundUser:foundUser
        })
    })
});

router.get('/inverter', (req, res) => {
    Solar.find({userid:req.session.userid}, (error, foundUser) => {
        res.render('solar/inverter.ejs',{
            username:req.session.username,
            foundUser:foundUser
        })
    })
});

router.get('/chargecontrol', (req, res) => {
    Solar.find({userid:req.session.userid}, (error, foundUser) => {
        res.render('solar/chargecontrol.ejs',{
            username:req.session.username,
            foundUser:foundUser
        })
    })
});

router.get('/buildguide', (req, res) => {
    Solar.find({userid:req.session.userid}, (error, foundUser) => {
        res.render('solar/buildguide.ejs',{
            username:req.session.username,
            foundUser:foundUser
        })
    })
}); 

router.get('/communitybuilds', (req, res) => { 
    Solar.find({userid:req.session.userid}, (error, foundUser) => {
        res.render('solar/communitybuilds.ejs',{
            username:req.session.username,
            foundUser:foundUser
        })
    })
});

router.get('/:id/edit', (req, res) => {
    Solar.findById(req.params.id, (error, foundSolar) => {
        res.render('solar/edit.ejs',{
            solar:foundSolar
        });
    })
});

router.delete('/:id', (req, res) => {
    Solar.findByIdAndRemove(req.params.id, (err, deletedSolar) => {
        res.redirect('/solar');
    })
});

router.get('/:id', (req, res) => {
    Solar.findById(req.params.id, (error, foundSolar) => {
        res.render(
            'solar/show.ejs',
            {
                solar:foundSolar
            }
        );
    });
});

router.put('/:id', (req, res) => {
    Solar.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
        (error, updatedModel) => {
            res.redirect('/solar');
        }
    )
});


router.post('/', (req, res) => {
    let newSolar = {applianceName:req.body.applianceName, watts:req.body.watts, voltage:req.body.voltage, amps:req.body.amps, hourUsage:req.body.hourUsage, username:req.session.username, userid:req.session.userid}
    Solar.create(newSolar, (error, createdSolar) => {
        res.redirect('/solar');
        console.log(createdSolar);
    });
});

router.get('/', (req, res) => {
    if(req.session.username){
        Solar.find({userid:req.session.userid}, (error, allSolar) => {
            res.render(
                'solar/index.ejs',
                {
                    solar:allSolar,
                    username:req.session.username
                }
            );
        })
    } else {
        res.redirect('../users/new');
    }
});

module.exports = router;
