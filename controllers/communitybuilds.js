const express = require('express');
const Community = require('../models/communitybuilds.js');
const router = express.Router();

router.get('/new', (req, res) => {
    res.render('community/new.ejs')
});

router.post('/', (req, res) => {
    Community.create(req.body, (error, createdCommunity) => {
        res.redirect('/community')
    });
});


router.get('/', (req, res) => {
    // if(req.session.username){
        Community.find({}, (error, allCommunity) => {
            res.render(
                'community/index.ejs',
                {
                    community:allCommunity,
                    // username:req.session.username
                }
            );
        })
    // } else {
    //     res.redirect('/');
    // }
});


router.get('/:id/edit', (req, res) => {
    Community.findById(req.params.id, (error, foundCommunity) => {
        res.render('community/edit.ejs',{
            community:foundCommunity
        });
    })
});

router.delete('/:id', (req, res) => {
    Community.findByIdAndRemove(req.params.id, (err, deletedCommunity) => {
        res.redirect('/community');
    })
});

router.get('/:id', (req, res) => {
    Community.findById(req.params.id, (error, foundCommunity) => {
        res.render(
            'community/show.ejs',
            {
                community:foundCommunity
            }
        );
    });
});

router.put('/:id', (req, res) => {
    Community.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
        (error, updatedModel) => {
            res.redirect('/community');
        }
    )
});


module.exports = router;
