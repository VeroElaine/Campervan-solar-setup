const express = require('express');
const Solar = require('../models/solar.js');
const router = express.Router();

router.get('/new', (req, res) => {
    res.render('solar/new.ejs')
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
    Solar.create(req.body, (error, createdSolar) => {
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
});

module.exports = router;
