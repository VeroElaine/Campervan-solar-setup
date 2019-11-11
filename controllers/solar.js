const express = require('express');
const Solar = require('../models/solar.js');
const router = express.Router();

router.get('/new', (req, res) => {
    res.render('solar/new.ejs')
});

router.get('/build', (req, res) => {
        res.render('solar/build.ejs');
    });

router.get('/battery', (req, res) => {
    res.render('solar/battery.ejs');
});

router.get('/panels', (req, res) => {
    res.render('solar/panels.ejs');
});

router.get('/inverter', (req, res) => {
    res.render('solar/inverter.ejs');
});

router.get('/chargecontrol', (req, res) => {
    res.render('solar/chargecontrol.ejs');
});

router.get('/buildguide', (req, res) => {
    res.render('solar/buildguide.ejs');
});

router.get('/communitybuilds', (req, res) => {
    res.render('solar/communitybuilds.ejs');
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

router.put('/solar/battery', (req, res) => {
    User.findOne(
        req.session.username,
        (error, foundUser) => {
            foundUser.battery.push(req.body);
            foundUser.save(
                (error, data) => {
                res.redirect('/solar/build');
            });
        })
    })

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




//
// router.patch("/build/:id/:quantity", (req, res) => {
//     Product.findByIdAndUpdate(
//         req.params.id,
//         { $set: {quantity: req.params.quantity}},
//         { new: true}, (error, updateModel) => {
//             res.redirect("/build");
//         }
//     )
// })
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
        res.redirect('/');
    }
    // res.render("solar/index.ejs")
});

module.exports = router;
