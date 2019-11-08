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
    Solar.create(req.body, (error, createdSolar) => {
        console.log(error);
        res.redirect('/solar');
    });
});


router.get('/', (req, res) => {
    if(req.session.username){
        Solar.find({}, (error, allSolar) => {
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
